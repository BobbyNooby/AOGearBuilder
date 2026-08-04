<script lang="ts">
	import SchemaForm from '$lib/components/admin/SchemaForm.svelte';
	import StatOverridesEditor from '$lib/components/admin/StatOverridesEditor.svelte';
	import ModifierEffectsEditor from '$lib/components/admin/ModifierEffectsEditor.svelte';
	import FullscreenModal from '$lib/components/ui/FullscreenModal.svelte';
	import ConfigSection from '$lib/components/ui/ConfigSection.svelte';
	import Toast, { type Toast as ToastType } from '$lib/components/ui/Toast.svelte';
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import ConfigSubSection from '$lib/components/ui/ConfigSubSection.svelte';
	import FilterBar from '$lib/components/ui/FilterBar.svelte';
	import {
		itemSchema,
		modifierSchema,
		gameConfigSchema,
		formulaItemSchema
	} from '$lib/adminSchemas';
	import { ItemStore } from '$lib/admin/itemStore.svelte';
	import { ModifierStore } from '$lib/admin/modifierStore.svelte';
	import { ConfigStore } from '$lib/admin/configStore.svelte';
	import Item from '$lib/components/Item.svelte';
	import { Package, FileJson, Cog, List, Search, Plus, Trash2, Save } from 'lucide-svelte';
	import { hasPermission, PERMISSIONS } from '@aotools/shared';
	import { fade } from 'svelte/transition';

	let { data }: { data: any } = $props();

	let toasts: ToastType[] = $state([]);
	function toast(message: string, type: 'success' | 'error' = 'success') {
		const id = crypto.randomUUID();
		toasts = [...toasts, { id, message, type }];
		setTimeout(() => (toasts = toasts.filter((t) => t.id !== id)), 3000);
	}

	// svelte-ignore state_referenced_locally
	let itemStore = new ItemStore(data.items ?? [], toast);
	// svelte-ignore state_referenced_locally
	let modifierStore = new ModifierStore(data.modifiers ?? [], toast);
	// svelte-ignore state_referenced_locally
	let configStore = new ConfigStore(data.gameConfig ?? {}, data.formulas ?? {}, toast);

	let itemFormSchema = $derived(itemStore.draft?.id ? itemSchema : itemSchema.filter((f) => f.key !== 'id'));
	let modifierFormSchema = $derived(modifierStore.draft?.id ? modifierSchema : modifierSchema.filter((f) => f.key !== 'id'));

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
		{ title: 'Arcane & Amulets', color: '#58d3d8', keys: ['arcaniumAttunements', 'amuletVariants'] },
		{ title: 'Display & Metadata', color: '#f0c040', keys: ['rarities', 'statTypes', 'equipTypes'] }
	];
</script>

<svelte:head><title>Game Data — AO Tools</title></svelte:head>

<Toast {toasts} />

<ConfirmDialog
	open={itemStore.deleteConfirm}
	title="Delete item?"
	message={`This will permanently remove ${itemStore.draft?.name || itemStore.draft?.id || 'this item'}.`}
	confirmLabel="Delete"
	onConfirm={() => itemStore.deleteItem()}
	onCancel={() => itemStore.deleteConfirm = false}
/>
<ConfirmDialog
	open={modifierStore.deleteConfirm}
	title="Delete modifier?"
	message={`This will permanently remove ${modifierStore.draft?.name || modifierStore.draft?.id || 'this modifier'}.`}
	confirmLabel="Delete"
	onConfirm={() => modifierStore.deleteModifier()}
	onCancel={() => modifierStore.deleteConfirm = false}
/>

<FullscreenModal open={itemStore.modalOpen} title={itemStore.isNew ? 'Create Item' : 'Edit Item'} onClose={() => itemStore.closeModal()}>
	{#if itemStore.draft}
		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl" style="font-family:Merriweather,serif">{itemStore.draft.name || itemStore.draft.id || 'New Item'}</h3>
				<div class="flex items-center gap-2">
					{#if canWriteItems}
						{#if !itemStore.isNew}
							<button
								onclick={() => itemStore.deleteConfirm = true}
								class="inline-flex items-center gap-1 rounded border border-red-500/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/20"
							>
								<Trash2 class="h-4 w-4" />
								Delete
							</button>
						{/if}
						<button
							onclick={() => itemStore.saveItem()}
							class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
						>
							<Save class="h-4 w-4" />
							Save
						</button>
					{/if}
				</div>
			</div>
			<SchemaForm schema={itemFormSchema} value={itemStore.draft} onChange={(next: any) => (itemStore.draft = next)} typeFilter={itemStore.draft?.type} config={configStore.gameConfig} />
			<div class="mt-4">
				<StatOverridesEditor
					value={itemStore.draft.statOverrides}
					maxLevel={configStore.gameConfig.maxLevel}
					stats={Object.keys(configStore.gameConfig.statRegistry ?? {})}
					config={configStore.gameConfig}
					onChange={(next: any) => (itemStore.draft = { ...itemStore.draft, statOverrides: next })}
				/>
			</div>
		</div>
	{/if}
</FullscreenModal>

<FullscreenModal
	open={modifierStore.modalOpen}
	title={modifierStore.isNew ? 'Create Modifier' : 'Edit Modifier'}
	onClose={() => modifierStore.closeModal()}
>
	{#if modifierStore.draft}
		<div class="flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl" style="font-family:Merriweather,serif">{modifierStore.draft.name || modifierStore.draft.id || 'New Modifier'}</h3>
				<div class="flex items-center gap-2">
					{#if canWriteModifiers}
						{#if !modifierStore.isNew}
							<button
								onclick={() => modifierStore.deleteConfirm = true}
								class="inline-flex items-center gap-1 rounded border border-red-500/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/20"
							>
								<Trash2 class="h-4 w-4" />
								Delete
							</button>
						{/if}
						<button
							onclick={() => modifierStore.saveModifier()}
							class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
						>
							<Save class="h-4 w-4" />
							Save
						</button>
					{/if}
				</div>
			</div>
			<SchemaForm schema={modifierFormSchema} value={modifierStore.draft} onChange={(next: any) => (modifierStore.draft = next)} />
			<div class="mt-4 rounded border border-gray-600 bg-black/40 p-3">
				<ModifierEffectsEditor
					value={modifierStore.draft.effects}
					stats={Object.keys(configStore.gameConfig.statRegistry ?? {})}
					onChange={(next: any) => (modifierStore.draft = { ...modifierStore.draft, effects: next })}
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
				{#each [{ label: 'Items', value: `${itemStore.filteredItems.length} / ${stats.items ?? 0}` }, { label: 'Modifiers', value: stats.modifiers ?? 0 }] as stat}
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
					<button onclick={() => itemStore.createItem()} class="rounded p-1 hover:bg-white/10" aria-label="Create item">
						<Plus class="h-4 w-4" />
					</button>
				{/if}
			</div>
			<div class="relative border-b border-white/10 p-3">
				<Search class="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
				<input
					bind:value={itemStore.query}
					placeholder="Search items..."
					class="w-full rounded border border-gray-600 bg-black py-1.5 pl-7 pr-2 text-sm text-white focus:border-white focus:outline-none"
				/>
			</div>
			<div class="border-b border-white/10 p-3">
				<FilterBar
					categories={itemStore.filterCategories}
					sortOptions={itemStore.sortOptions}
					filters={itemStore.filters}
					sort={itemStore.sort}
					onChange={(filters, sort) => {
						itemStore.filters = filters;
						itemStore.sort = sort;
					}}
				/>
			</div>
			<div class="flex-1 overflow-y-auto p-3">
				<div class="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
					{#each itemStore.filteredItems as item (item.id)}
						<button
							onclick={() => itemStore.openModal(item)}
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
										bind:value={modifierStore.query}
										placeholder="Search modifiers..."
										class="w-full rounded border border-gray-600 bg-black py-1.5 pl-7 pr-2 text-sm text-white focus:border-white focus:outline-none"
									/>
								</div>
								{#if canWriteModifiers}
									<button onclick={() => modifierStore.createModifier()} class="rounded p-2 hover:bg-white/10" aria-label="Create modifier">
										<Plus class="h-4 w-4" />
									</button>
								{/if}
							</div>
							<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
							{#each modifierStore.filteredModifiers as mod (mod.id)}
								<button
									onclick={() => modifierStore.openModal(mod)}
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
									onclick={() => configStore.saveGameConfig()}
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
												value={configStore.gameConfig}
												onChange={(next: any) => configStore.gameConfig = next}
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
											bind:value={configStore.newFormulaKey}
											placeholder="New formula key"
											class="flex-1 rounded border border-gray-600 bg-black px-2 py-1.5 text-sm text-white focus:border-white focus:outline-none"
										/>
										<button onclick={() => configStore.addFormula()} class="rounded border border-white/30 px-2 hover:bg-white/10" aria-label="Add">
											<Plus class="h-4 w-4" />
										</button>
									</div>
								{/if}
								<div class="relative">
									<Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
									<input
										bind:value={configStore.formulaQuery}
										placeholder="Search..."
										class="w-full rounded border border-gray-600 bg-black py-1.5 pl-7 pr-2 text-sm text-white focus:border-white focus:outline-none"
									/>
								</div>
								<div class="flex-1 space-y-1 overflow-auto">
									{#each configStore.filteredFormulaKeys as key (key)}
										<div class="flex items-center gap-1">
											<button
												onclick={() => configStore.selectedFormulaKey = key}
												class="flex-1 rounded px-2 py-1.5 text-left text-sm {configStore.selectedFormulaKey === key ? 'bg-white text-black' : 'bg-black text-gray-300 hover:bg-white/10'}"
											>
												{key}
											</button>
											{#if canWriteFormulas}
												<button onclick={() => configStore.removeFormula(key)} class="rounded p-1.5 text-red-400 hover:bg-red-900/20" aria-label="Delete">
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
								{#if configStore.selectedFormulaKey && configStore.selectedFormula}
									<div class="mb-3 flex items-center justify-between">
										<h3 class="text-lg" style="font-family:Merriweather,serif">{configStore.selectedFormulaKey}</h3>
										{#if canWriteFormulas}
											<button
												onclick={() => configStore.saveFormulas()}
												class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
											>
												<Save class="h-4 w-4" />
												Save
											</button>
										{/if}
									</div>
								<SchemaForm
									schema={formulaItemSchema}
									value={configStore.selectedFormula}
									onChange={(next: any) => configStore.updateFormula(configStore.selectedFormulaKey!, next)}
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
