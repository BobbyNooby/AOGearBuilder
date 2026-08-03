<script lang="ts">
	import { apiClient } from '$lib/api/client';
	import SchemaForm from '$lib/components/admin/SchemaForm.svelte';
	import StatOverridesEditor from '$lib/components/admin/StatOverridesEditor.svelte';
	import ModifierEffectsEditor from '$lib/components/admin/ModifierEffectsEditor.svelte';
	import FullscreenModal from '$lib/components/ui/FullscreenModal.svelte';
	import ConfigSection from '$lib/components/ui/ConfigSection.svelte';
	import Toast, { type Toast as ToastType } from '$lib/components/ui/Toast.svelte';
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import ConfigSubSection from '$lib/components/ui/ConfigSubSection.svelte';
	import FilterBar from '$lib/components/ui/FilterBar.svelte';
	import type { ActiveFilter, FilterCategory, SortOption } from '$lib/components/ui/FilterBar.svelte';
	import {
		itemSchema,
		defaultItem,
		modifierSchema,
		defaultModifier,
		gameConfigSchema,
		formulaItemSchema,
		defaultFormula
	} from '$lib/adminSchemas';
	import { RARITY_ORDER, equipTypeLabel, statsStyles } from '$lib/utils';
	import Item from '$lib/components/Item.svelte';
	import { Package, FileJson, Cog, List, Search, Plus, Trash2, Save } from 'lucide-svelte';
	import { hasPermission, PERMISSIONS } from '@aotools/shared';
	import { fade } from 'svelte/transition';

	let { data }: { data: any } = $props();

	// svelte-ignore state_referenced_locally
	let items = $state(data.items ?? []);
	// svelte-ignore state_referenced_locally
	let modifiers = $state(data.modifiers ?? []);
	// svelte-ignore state_referenced_locally
	let gameConfig = $state(data.gameConfig ?? {});
	// svelte-ignore state_referenced_locally
	let formulas = $state(data.formulas ?? {});

	let itemQuery = $state('');
	let itemFilters: ActiveFilter[] = $state([]);
	let itemSort = $state('ep_desc');
	let itemModalOpen = $state(false);
	let selectedItemId = $state<string | null>(null);
	let itemDraft: any = $state(null);

	let modifierQuery = $state('');
	let modifierModalOpen = $state(false);
	let selectedModifierId = $state<string | null>(null);
	let modifierDraft: any = $state(null);

	let formulaQuery = $state('');
	let selectedFormulaKey = $state<string | null>(null);
	let newFormulaKey = $state('');

	let toasts: ToastType[] = $state([]);
	let error = $state('');
	let deleteItemConfirm = $state(false);
	let deleteModifierConfirm = $state(false);

	let itemFormSchema = $derived(itemDraft?.id ? itemSchema : itemSchema.filter((f) => f.key !== 'id'));
	let modifierFormSchema = $derived(modifierDraft?.id ? modifierSchema : modifierSchema.filter((f) => f.key !== 'id'));
	let isNewItem = $derived(!itemDraft?.id);
	let isNewModifier = $derived(!modifierDraft?.id);

	let permissions = $derived(data.permissions ?? []);
	let canWriteItems = $derived(hasPermission(permissions, PERMISSIONS.ITEMS_WRITE));
	let canWriteModifiers = $derived(hasPermission(permissions, PERMISSIONS.MODIFIERS_WRITE));
	let canWriteConfig = $derived(hasPermission(permissions, PERMISSIONS.CONFIG_WRITE));
	let canWriteFormulas = $derived(hasPermission(permissions, PERMISSIONS.FORMULAS_WRITE));
	let stats = $derived(data.stats ?? {});

	const gameConfigGroups = [
		{ title: 'Core', color: '#58a6ff', keys: ['maxLevel', 'pointsPerLevel', 'statPointMaxFormula', 'scalings'], defaultOpen: true },
		{ title: 'Stat Registry', color: '#7ee787', keys: ['statRegistry'] },
		{ title: 'Build Types', color: '#f0883e', keys: ['buildTypes'] },
		{ title: 'Player Mechanics', color: '#a371f7', keys: ['playerTransforms', 'playerConstraints'] },
		{ title: 'Arcane & Amulets', color: '#58d3d8', keys: ['arcaniumAttunements', 'amuletVariants'] }
	];

	function cap(s: string): string {
		return s ? s[0].toUpperCase() + s.slice(1) : '';
	}

	const itemSortOptions = $derived.by((): SortOption[] => {
		const statKeys = [
			...new Set(items.flatMap((i: any) => Object.keys(i.scaling ?? {})))
		].sort() as string[];
		return [
			{ value: 'ep_desc', label: 'EP ↓' },
			{ value: 'ep_asc', label: 'EP ↑' },
			{ value: 'rarity_desc', label: 'Rarity ↓' },
			{ value: 'rarity_asc', label: 'Rarity ↑' },
			...statKeys.flatMap((k) => {
				const name = statsStyles[k]?.name || cap(k);
				return [
					{ value: `${k}_desc`, label: `${name} ↓` },
					{ value: `${k}_asc`, label: `${name} ↑` }
				];
			}),
			{ value: 'name_asc', label: 'Name A-Z' },
			{ value: 'name_desc', label: 'Name Z-A' },
			{ value: 'level_asc', label: 'Level ↑' },
			{ value: 'level_desc', label: 'Level ↓' }
		];
	});

	function matchesGemSlots(item: any, bucket: string): boolean {
		const slots = item.jewelSlots ?? 0;
		switch (bucket) {
			case '0':
				return slots === 0;
			case '1':
				return slots === 1;
			case '2':
				return slots === 2;
			case '3+':
				return slots >= 3;
			default:
				return false;
		}
	}

	const itemFilterCategories = $derived.by((): FilterCategory[] => {
		const types = [...new Set(items.map((i: any) => i.type).filter(Boolean))].sort() as string[];
		const rarities = ([...new Set(items.map((i: any) => i.rarity).filter(Boolean))] as string[])
			.sort((a, b) => RARITY_ORDER.indexOf(a ?? 'None') - RARITY_ORDER.indexOf(b ?? 'None'));
		const equipTypes = [...new Set(items.map((i: any) => i.equipType).filter(Boolean))].sort() as string[];
		const statTypes = [...new Set(items.map((i: any) => i.statType || 'Normal').filter(Boolean))].sort() as string[];
		const statKeys = [
			...new Set(items.flatMap((i: any) => Object.keys(i.scaling ?? {})))
		].sort() as string[];

		return [
			{
				key: 'type',
				label: 'Type',
				options: types.map((t) => ({ value: t, label: cap(t), count: items.filter((i: any) => i.type === t).length }))
			},
			{
				key: 'rarity',
				label: 'Rarity',
				options: rarities.map((r) => ({ value: r, label: r, count: items.filter((i: any) => i.rarity === r).length }))
			},
			{
				key: 'equipType',
				label: 'Subtype',
				options: equipTypes.map((e) => ({
					value: e,
					label: equipTypeLabel[e] || cap(e),
					count: items.filter((i: any) => i.equipType === e).length
				}))
			},
			{
				key: 'statType',
				label: 'Stat Type',
				options: statTypes.map((s) => ({
					value: s,
					label: s,
					count: items.filter((i: any) => (i.statType || 'Normal') === s).length
				}))
			},
			{
				key: 'stats',
				label: 'Stats',
				toggleMode: true,
				options: statKeys.map((s) => ({
					value: s,
					label: statsStyles[s]?.name || cap(s),
					count: items.filter((i: any) => (i.scaling ?? {})[s] != null).length
				}))
			},
			{
				key: 'endgame',
				label: 'Endgame',
				options: [{ value: true, label: 'Yes', count: items.filter((i: any) => i.isEndgame === true).length }]
			},
			{
				key: 'hasImage',
				label: 'Has Image',
				options: [{ value: true, label: 'Yes', count: items.filter((i: any) => !!i.imageUrl).length }]
			},
			{
				key: 'gems',
				label: 'Gems',
				options: ['0', '1', '2', '3+'].map((b) => ({
					value: b,
					label: b === '3+' ? '3+' : `${b} slot${b === '1' ? '' : 's'}`,
					count: items.filter((i: any) => matchesGemSlots(i, b)).length
				}))
			}
		].filter((c) => c.options.length > 0 && c.options.some((o) => o.count && o.count > 0));
	});

	let filteredItems = $derived.by(() => {
		let list = items.filter((i: any) => (i.name || i.id).toLowerCase().includes(itemQuery.toLowerCase()));

		// Group active filters by category for OR-within, AND-across behavior
		const groups: Record<string, (string | boolean)[]> = {};
		for (const f of itemFilters) {
			(groups[f.categoryKey] ||= []).push(f.value);
		}

		for (const [categoryKey, values] of Object.entries(groups)) {
			switch (categoryKey) {
				case 'type':
					list = list.filter((i: any) => values.includes(i.type));
					break;
				case 'rarity':
					list = list.filter((i: any) => values.includes(i.rarity));
					break;
				case 'equipType':
					list = list.filter((i: any) => values.includes(i.equipType));
					break;
				case 'statType':
					list = list.filter((i: any) => values.includes(i.statType || 'Normal'));
					break;
				case 'stats': {
					const statFilters = itemFilters.filter((f) => f.categoryKey === 'stats');
					const includes = statFilters.filter((f) => f.mode === 'include').map((f) => String(f.value));
					const excludes = statFilters.filter((f) => f.mode === 'exclude').map((f) => String(f.value));
					if (includes.length) {
						list = list.filter((i: any) => includes.every((s) => (i.scaling ?? {})[s] != null));
					}
					if (excludes.length) {
						list = list.filter((i: any) => excludes.every((s) => (i.scaling ?? {})[s] == null));
					}
					break;
				}
				case 'endgame':
					list = list.filter((i: any) => i.isEndgame === true);
					break;
				case 'hasImage':
					list = list.filter((i: any) => !!i.imageUrl);
					break;
				case 'gems':
					list = list.filter((i: any) => values.some((v) => matchesGemSlots(i, String(v))));
					break;
			}
		}

		const rarityRank = (r: string) => RARITY_ORDER.indexOf(r ?? 'None');
		const epOf = (i: any) => Object.values(i.scaling ?? {}).reduce((s: number, v: any) => s + Number(v), 0);

		list = [...list].sort((a: any, b: any) => {
			if (itemSort === 'ep_asc' || itemSort === 'ep_desc') {
				const sign = itemSort === 'ep_asc' ? 1 : -1;
				return sign * (epOf(a) - epOf(b));
			}

			const statMatch = itemSort.match(/^([\w]+)_(asc|desc)$/);
			if (statMatch && statsStyles[statMatch[1]]) {
				const [, stat, dir] = statMatch;
				const sign = dir === 'asc' ? 1 : -1;
				return sign * (((a.scaling ?? {})[stat] ?? 0) - ((b.scaling ?? {})[stat] ?? 0));
			}

			switch (itemSort) {
				case 'name_asc':
					return (a.name || a.id).localeCompare(b.name || b.id);
				case 'name_desc':
					return (b.name || b.id).localeCompare(a.name || a.id);
				case 'rarity_asc':
					return rarityRank(a.rarity) - rarityRank(b.rarity);
				case 'rarity_desc':
					return rarityRank(b.rarity) - rarityRank(a.rarity);
				case 'level_asc':
					return (a.minLevel ?? 0) - (b.minLevel ?? 0);
				case 'level_desc':
					return (b.minLevel ?? 0) - (a.minLevel ?? 0);
				default:
					return 0;
			}
		});

		return list;
	});
	let filteredModifiers = $derived(
		modifiers.filter((m: any) => (m.name || m.id).toLowerCase().includes(modifierQuery.toLowerCase()))
	);

	let formulaKeys = $derived(Object.keys(formulas));
	let filteredFormulaKeys = $derived(
		formulaKeys.filter((k) => k.toLowerCase().includes(formulaQuery.toLowerCase()))
	);
	let selectedFormula = $derived(selectedFormulaKey ? formulas[selectedFormulaKey] : null);

	function toast(message: string, type: 'success' | 'error' = 'success') {
		const id = crypto.randomUUID();
		toasts = [...toasts, { id, message, type }];
		setTimeout(() => (toasts = toasts.filter((t) => t.id !== id)), 3000);
	}

	function openItemModal(item: any) {
		selectedItemId = item?.id ?? null;
		itemDraft = item ? { ...item } : { ...defaultItem };
		itemModalOpen = true;
	}

	function closeItemModal() {
		itemDraft = null;
		selectedItemId = null;
		itemModalOpen = false;
	}

	async function createItem() {
		openItemModal(null);
	}

	async function saveItem() {
		if (!itemDraft) return;
		try {
			if (!itemDraft.id) {
				const created = await apiClient('/api/admin/items', {
					method: 'POST',
					body: JSON.stringify(itemDraft)
				});
				items = [created, ...items];
				selectedItemId = created.id;
				closeItemModal();
				toast('Item created');
			} else {
				const updated = await apiClient(`/api/admin/items/${itemDraft.id}`, {
					method: 'PUT',
					body: JSON.stringify(itemDraft)
				});
				items = items.map((i: any) => (i.id === updated.id ? updated : i));
				closeItemModal();
				toast('Item saved');
			}
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function deleteItem() {
		if (!itemDraft?.id) return;
		try {
			await apiClient(`/api/admin/items/${itemDraft.id}`, { method: 'DELETE' });
			items = items.filter((i: any) => i.id !== itemDraft.id);
			closeItemModal();
			toast('Item deleted');
		} catch (err: any) {
			toast(err.message, 'error');
		}
		deleteItemConfirm = false;
	}

	function openModifierModal(modifier: any) {
		selectedModifierId = modifier?.id ?? null;
		modifierDraft = modifier ? { ...modifier } : { ...defaultModifier };
		modifierModalOpen = true;
	}

	function closeModifierModal() {
		modifierDraft = null;
		selectedModifierId = null;
		modifierModalOpen = false;
	}

	async function createModifier() {
		openModifierModal(null);
	}

	async function saveModifier() {
		if (!modifierDraft) return;
		try {
			if (!modifierDraft.id) {
				const created = await apiClient('/api/admin/modifiers', {
					method: 'POST',
					body: JSON.stringify(modifierDraft)
				});
				modifiers = [created, ...modifiers];
				selectedModifierId = created.id;
				closeModifierModal();
				toast('Modifier created');
			} else {
				const updated = await apiClient(`/api/admin/modifiers/${modifierDraft.id}`, {
					method: 'PUT',
					body: JSON.stringify(modifierDraft)
				});
				modifiers = modifiers.map((m: any) => (m.id === updated.id ? updated : m));
				closeModifierModal();
				toast('Modifier saved');
			}
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function deleteModifier() {
		if (!modifierDraft?.id) return;
		try {
			await apiClient(`/api/admin/modifiers/${modifierDraft.id}`, { method: 'DELETE' });
			modifiers = modifiers.filter((m: any) => m.id !== modifierDraft.id);
			closeModifierModal();
			toast('Modifier deleted');
		} catch (err: any) {
			toast(err.message, 'error');
		}
		deleteModifierConfirm = false;
	}

	async function saveGameConfig() {
		try {
			await apiClient('/api/admin/config/game-config', {
				method: 'PUT',
				body: JSON.stringify(gameConfig)
			});
			toast('Game config saved');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	function addFormula() {
		const key = newFormulaKey.trim();
		if (!key || formulas[key]) return;
		formulas = { ...formulas, [key]: { ...defaultFormula } };
		selectedFormulaKey = key;
		newFormulaKey = '';
	}

	function updateFormula(key: string, next: any) {
		formulas = { ...formulas, [key]: next };
	}

	function removeFormula(key: string) {
		if (!confirm(`Delete formula "${key}"?`)) return;
		const next = { ...formulas };
		delete next[key];
		formulas = next;
		if (selectedFormulaKey === key) selectedFormulaKey = Object.keys(next)[0] ?? null;
	}

	async function saveFormulas() {
		try {
			await apiClient('/api/admin/config/formulas', {
				method: 'PUT',
				body: JSON.stringify(formulas)
			});
			toast('Formulas saved');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}
</script>

<svelte:head><title>Game Data — AO Tools</title></svelte:head>

<Toast {toasts} />

<ConfirmDialog
	open={deleteItemConfirm}
	title="Delete item?"
	message={`This will permanently remove ${itemDraft?.name || itemDraft?.id || 'this item'}.`}
	confirmLabel="Delete"
	onConfirm={deleteItem}
	onCancel={() => deleteItemConfirm = false}
/>
<ConfirmDialog
	open={deleteModifierConfirm}
	title="Delete modifier?"
	message={`This will permanently remove ${modifierDraft?.name || modifierDraft?.id || 'this modifier'}.`}
	confirmLabel="Delete"
	onConfirm={deleteModifier}
	onCancel={() => deleteModifierConfirm = false}
/>

<FullscreenModal open={itemModalOpen} title={isNewItem ? 'Create Item' : 'Edit Item'} onClose={closeItemModal}>
	{#if itemDraft}
		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl" style="font-family:Merriweather,serif">{itemDraft.name || itemDraft.id || 'New Item'}</h3>
				<div class="flex items-center gap-2">
					{#if canWriteItems}
						{#if !isNewItem}
							<button
								onclick={() => deleteItemConfirm = true}
								class="inline-flex items-center gap-1 rounded border border-red-500/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/20"
							>
								<Trash2 class="h-4 w-4" />
								Delete
							</button>
						{/if}
						<button
							onclick={saveItem}
							class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
						>
							<Save class="h-4 w-4" />
							Save
						</button>
					{/if}
				</div>
			</div>
			{#if error}
				<p transition:fade class="rounded border border-red-500 bg-red-900/20 p-3 text-sm text-red-300">{error}</p>
			{/if}
			<SchemaForm schema={itemFormSchema} value={itemDraft} onChange={(next: any) => (itemDraft = next)} />
			<div class="mt-4">
				<StatOverridesEditor
					value={itemDraft.statOverrides}
					maxLevel={gameConfig.maxLevel}
					stats={Object.keys(gameConfig.statRegistry ?? {})}
					onChange={(next: any) => (itemDraft = { ...itemDraft, statOverrides: next })}
				/>
			</div>
		</div>
	{/if}
</FullscreenModal>

<FullscreenModal
	open={modifierModalOpen}
	title={isNewModifier ? 'Create Modifier' : 'Edit Modifier'}
	onClose={closeModifierModal}
>
	{#if modifierDraft}
		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl" style="font-family:Merriweather,serif">{modifierDraft.name || modifierDraft.id || 'New Modifier'}</h3>
				<div class="flex items-center gap-2">
					{#if canWriteModifiers}
						{#if !isNewModifier}
							<button
								onclick={() => deleteModifierConfirm = true}
								class="inline-flex items-center gap-1 rounded border border-red-500/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/20"
							>
								<Trash2 class="h-4 w-4" />
								Delete
							</button>
						{/if}
						<button
							onclick={saveModifier}
							class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
						>
							<Save class="h-4 w-4" />
							Save
						</button>
					{/if}
				</div>
			</div>
			<SchemaForm schema={modifierFormSchema} value={modifierDraft} onChange={(next: any) => (modifierDraft = next)} />
			<div class="mt-4 rounded border border-gray-600 bg-black/40 p-3">
				<ModifierEffectsEditor
					value={modifierDraft.effects}
					stats={Object.keys(gameConfig.statRegistry ?? {})}
					onChange={(next: any) => (modifierDraft = { ...modifierDraft, effects: next })}
				/>
			</div>
		</div>
	{/if}
</FullscreenModal>

<div class="flex h-[calc(100vh-3.5rem)] flex-col gap-4 p-4 md:p-6">
	<div class="flex flex-wrap items-center gap-3">
		<h1 class="text-2xl md:text-3xl" style="font-family:Merriweather,serif">Game Data</h1>
		{#if stats}
			<div class="flex flex-wrap gap-2 text-xs">
				{#each [{ label: 'Items', value: `${filteredItems.length} / ${stats.items ?? 0}` }, { label: 'Modifiers', value: stats.modifiers ?? 0 }] as stat}
					<span class="rounded border border-white/20 bg-black/40 px-2 py-1 text-gray-300">
						{stat.label}: {stat.value}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
		<!-- Items -->
		<div class="flex min-h-0 w-full flex-col rounded border border-white bg-black/40 md:w-1/2">
			<div class="flex items-center justify-between border-b border-white/10 p-3">
				<div class="flex items-center gap-2">
					<Package class="h-4 w-4 text-gray-300" />
					<h2 class="text-lg" style="font-family:Merriweather,serif">Items</h2>
				</div>
				{#if canWriteItems}
					<button onclick={createItem} class="rounded p-1 hover:bg-white/10" aria-label="Create item">
						<Plus class="h-4 w-4" />
					</button>
				{/if}
			</div>
			<div class="relative border-b border-white/10 p-3">
				<Search class="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
				<input
					bind:value={itemQuery}
					placeholder="Search items..."
					class="w-full rounded border border-gray-600 bg-black py-1.5 pl-7 pr-2 text-sm text-white focus:border-white focus:outline-none"
				/>
			</div>
			<div class="border-b border-white/10 p-3">
				<FilterBar
					categories={itemFilterCategories}
					sortOptions={itemSortOptions}
					filters={itemFilters}
					sort={itemSort}
					onChange={(filters, sort) => {
						itemFilters = filters;
						itemSort = sort;
					}}
				/>
			</div>
			<div class="flex-1 overflow-y-auto p-3">
				<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
					{#each filteredItems as item (item.id)}
						<button
							onclick={() => openItemModal(item)}
							class="group relative aspect-square overflow-hidden rounded border border-white/10 hover:border-white/40"
							aria-label="Edit {item.name || item.id}"
						>
							<Item {item} />
						</button>
					{:else}
						<p class="col-span-full text-sm text-gray-400">No items found.</p>
					{/each}
				</div>
			</div>
		</div>

		<!-- Config sections -->
		<div class="flex min-h-0 w-full flex-col gap-3 overflow-hidden md:w-1/2">
			<div class="flex-1 space-y-3 overflow-y-auto pr-1">
					<ConfigSection title="Modifiers" icon={FileJson}>
						<div class="flex flex-col gap-3">
							<div class="flex items-center justify-between gap-2">
								<div class="relative flex-1">
									<Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
									<input
										bind:value={modifierQuery}
										placeholder="Search modifiers..."
										class="w-full rounded border border-gray-600 bg-black py-1.5 pl-7 pr-2 text-sm text-white focus:border-white focus:outline-none"
									/>
								</div>
								{#if canWriteModifiers}
									<button onclick={createModifier} class="rounded p-2 hover:bg-white/10" aria-label="Create modifier">
										<Plus class="h-4 w-4" />
									</button>
								{/if}
							</div>
							<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
							{#each filteredModifiers as mod (mod.id)}
								<button
									onclick={() => openModifierModal(mod)}
									class="rounded border border-white/10 bg-black/40 px-3 py-2 text-left text-sm hover:border-white/30"
								>
									{mod.name || mod.id}
								</button>
							{:else}
								<p class="text-sm text-gray-400">No modifiers.</p>
							{/each}
							</div>
						</div>
					</ConfigSection>

					<ConfigSection title="Game Config" icon={Cog}>
						<div class="flex flex-col gap-3">
							{#if canWriteConfig}
								<button
									onclick={saveGameConfig}
									class="inline-flex items-center gap-2 self-end rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
								>
									<Save class="h-4 w-4" />
									Save
								</button>
							{/if}
							<div class="flex flex-col gap-2">
								{#each gameConfigGroups as group}
									<ConfigSubSection title={group.title} color={group.color} defaultOpen={group.defaultOpen ?? false}>
										<div class="rounded border border-gray-600 bg-black/40 p-3">
											<SchemaForm
												schema={gameConfigSchema.filter((f) => group.keys.includes(f.key))}
												value={gameConfig}
												onChange={(next: any) => gameConfig = next}
											/>
										</div>
									</ConfigSubSection>
								{/each}
							</div>
							<p class="text-xs text-gray-400">
								Note: edits are stored as JSON. Comments from the original .jsonc files are not preserved.
							</p>
						</div>
					</ConfigSection>

					<ConfigSection title="Formulas" icon={List}>
						<div class="flex h-[500px] flex-col gap-3 md:flex-row">
							<div class="flex w-full flex-col gap-2 md:w-64">
								{#if canWriteFormulas}
									<div class="flex gap-2">
										<input
											bind:value={newFormulaKey}
											placeholder="New formula key"
											class="flex-1 rounded border border-gray-600 bg-black px-2 py-1.5 text-sm text-white focus:border-white focus:outline-none"
										/>
										<button onclick={addFormula} class="rounded border border-white/30 px-2 hover:bg-white/10" aria-label="Add">
											<Plus class="h-4 w-4" />
										</button>
									</div>
								{/if}
								<div class="relative">
									<Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
									<input
										bind:value={formulaQuery}
										placeholder="Search..."
										class="w-full rounded border border-gray-600 bg-black py-1.5 pl-7 pr-2 text-sm text-white focus:border-white focus:outline-none"
									/>
								</div>
								<div class="flex-1 space-y-1 overflow-auto">
									{#each filteredFormulaKeys as key (key)}
										<div class="flex items-center gap-1">
											<button
												onclick={() => selectedFormulaKey = key}
												class="flex-1 rounded px-2 py-1.5 text-left text-sm {selectedFormulaKey === key ? 'bg-white text-black' : 'bg-black text-gray-300 hover:bg-white/10'}"
											>
												{key}
											</button>
											{#if canWriteFormulas}
												<button onclick={() => removeFormula(key)} class="rounded p-1.5 text-red-400 hover:bg-red-900/20" aria-label="Delete">
													<Trash2 class="h-3 w-3" />
												</button>
											{/if}
										</div>
									{:else}
										<p class="text-sm text-gray-400">No formulas.</p>
									{/each}
								</div>
							</div>
							<div class="flex-1 overflow-auto rounded border border-gray-600 bg-black/40 p-3">
								{#if selectedFormulaKey && selectedFormula}
									<div class="mb-3 flex items-center justify-between">
										<h3 class="text-lg" style="font-family:Merriweather,serif">{selectedFormulaKey}</h3>
										{#if canWriteFormulas}
											<button
												onclick={saveFormulas}
												class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
											>
												<Save class="h-4 w-4" />
												Save
											</button>
										{/if}
									</div>
								<SchemaForm
									schema={formulaItemSchema}
									value={selectedFormula}
									onChange={(next: any) => updateFormula(selectedFormulaKey!, next)}
								/>
								{:else}
									<p class="text-gray-400">Select or create a formula.</p>
								{/if}
							</div>
						</div>
					</ConfigSection>
				</div>
		</div>
	</div>

</div>