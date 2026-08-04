<script lang="ts">
	import Item from '../Item.svelte';
	import PickerModal from './PickerModal.svelte';
	import PostCalcsButton from './PostCalcsButton.svelte';
	import { getSlotStats } from '@aotools/shared';
	import { staticNoneBaseRoot, statsStyles, staticImagesRootFolder } from '$lib/utils';
	import { BuildManager } from '$lib/builder/BuildManager.svelte';

	let {
		slotIndex, bm
	}: {
		slotIndex: number;
		bm: BuildManager;
	} = $props();

	const slot = $derived(bm.slots[slotIndex]);
	const isWeapon = $derived(slot.equipType === 'weapon');

	let modalField = $state('');
	let modalOpen = $state(false);
	let pickerSubtitle = $state('');

	let fuseGemAItem = $state<any>(null);

	function openModal(f: string) { modalField = f; modalOpen = true; pickerSubtitle = ''; }
	function closeModal() { modalField = ''; modalOpen = false; pickerSubtitle = ''; fuseGemAItem = null; bm.cancelFuse(); }

	function startFuse(gemIdx: number) {
		bm.startFuse(slotIndex, gemIdx);
		fuseGemAItem = null;
		pickerSubtitle = 'Pick first gem to fuse';
		modalField = 'gem';
		modalOpen = true;
	}

	function selectItem(id: string) {
		if (bm.fuseState.active) {
			const result = bm.handleFusePick(id);
			if (result === 'need_more') {
				const all = [...bm.allItems, ...bm.modifiers];
				fuseGemAItem = all.find((i: any) => (i.id || i._id) === id);
				if (fuseGemAItem) {
					pickerSubtitle = `Pick second gem to fuse (first: ${fuseGemAItem.name})`;
				}
				return;
			}
			pickerSubtitle = '';
			closeModal();
			return;
		}
		bm.pickItem(modalField, slotIndex, id || null);
		closeModal();
	}

	let slotStats = $derived(getSlotStats(slot, bm.player, bm.config));
	let lvlMax = $derived(Math.min(slot.armor?.maxLevel ?? bm.player.level, bm.player.level));
	let lvlMin = $derived(slot.armor?.minLevel ?? 1);
	let levelOptions = $derived.by(() => {
		if (isWeapon) {
			const lo = Math.ceil(lvlMin / 10) * 10, hi = Math.floor(lvlMax / 10) * 10;
			const o: number[] = [];
			for (let l = lo; l <= hi; l += 10) o.push(l);
			return o.length ? o : [0];
		}
		const lo = Math.ceil(lvlMin / 10) * 10, hi = Math.floor(lvlMax / 10) * 10;
		const o: number[] = [];
		for (let l = lo; l <= hi; l += 10) o.push(l);
		return o.length ? o : [0];
	});
	let itemName = $derived(slot.armor?.name || '');
	let isArcanium = $derived(slot.armor?.statType === 'Arcanium');
	let isAmulet = $derived(slot.armor?.id === 'amulet' || slot.armor?.name === 'Amulet');
	let attunementOptions = $derived(bm.magics.filter(m => bm.player.selectedMagic?.includes(m.id)).sort((a: any, b: any) => a.name.localeCompare(b.name)));
	let amuletTypes = $derived(bm.config.amuletVariants?.types || []);
	let amuletTiers = $derived(Object.keys(bm.config.amuletVariants?.tiers || {}));

	$effect(() => {
		if (!slot.armor) bm.resetSlotVariants(slotIndex);
	});

	$effect(() => {
		if (slot.attunement && !bm.player.selectedMagic?.includes(slot.attunement)) {
			bm.setAttunement(slotIndex, null);
		}
	});

	function noneItem(kind: string) {
		return { id: '', name: 'None', rarity: 'None', type: kind, imageUrl: `${staticNoneBaseRoot}/${kind}/0.jpg` };
	}
	function armorNoneItem() {
		if (isWeapon) return { id: '', name: 'None', rarity: 'None', type: 'weapon', imageUrl: '/images/weapon/0.png' };
		const kind = slot.equipType === 'legging' ? 'pants' : (slot.equipType === 'chestpiece' ? 'chestplate' : 'accessory');
		return noneItem(kind);
	}
</script>

<div class="flex flex-col space-y-4 p-2">
	<!-- Armor / Enchant / Modifier -->
	<div class="flex flex-row space-x-4">
		<button onclick={() => openModal('armor')} class="flex aspect-square h-24 w-24 items-center justify-center rounded bg-[#020202]">
			{#if slot.armor}<Item item={slot.armor!} />{:else}<Item item={armorNoneItem()} />{/if}
		</button>
		{#if slot.armor && !isWeapon}
			<button onclick={() => openModal('enchant')} class="flex aspect-square h-24 w-24 items-center justify-center rounded bg-[#020202]">
				{#if slot.enchant}<Item item={slot.enchant!} />{:else}<Item item={noneItem('enchant')} />{/if}
			</button>
			<button onclick={() => openModal('modifier')} class="flex aspect-square h-24 w-24 items-center justify-center rounded bg-[#020202]">
				{#if slot.modifier}<Item item={slot.modifier!} />{:else}<Item item={noneItem('modifier')} />{/if}
			</button>
		{/if}
	</div>

	<!-- Gems -->
	{#if slot.armor && !isWeapon && (slot.armor.jewelSlots || 0) > 0}
		<div class="flex flex-row space-x-4">
			{#each Array(Math.min(slot.armor.jewelSlots || 0, 4)) as _, gi}
				<div class="flex flex-col items-center space-y-1">
					<button onclick={() => openModal('gem')} class="flex aspect-square h-24 w-24 items-center justify-center rounded bg-[#020202]">
						{#if slot.gems?.[gi]} <Item item={slot.gems[gi]} /> {:else} <Item item={noneItem('gem')} /> {/if}
					</button>
					<button onclick={() => startFuse(gi)} class="text-xs text-yellow-400 hover:text-yellow-200" title="Fuse two gems into this slot">Fuse</button>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Armor Level + PostCalcs -->
	{#if slot.armor}
		<div class="flex flex-row items-center space-x-4">
			<p class="text-white" style="font-family:Merriweather,serif">{isWeapon ? 'Weapon Level' : 'Armor Level'}</p>
			<select value={slot.level} onchange={e => bm.setLevel(slotIndex, parseInt((e.target as HTMLSelectElement).value) || slot.level)}
				class="flex-1 rounded-md border border-white bg-[#020202] px-2 py-1 text-white">
				{#each levelOptions as lvl}<option>{lvl}</option>{/each}
			</select>
			<PostCalcsButton stats={slotStats} {itemName} {statsStyles} {staticImagesRootFolder} />
		</div>

		<!-- Arcanium attunement selector -->
		{#if isArcanium && !isWeapon}
			<div class="flex flex-row items-center space-x-4">
				<p class="text-white" style="font-family:Merriweather,serif">Attunement</p>
				<select value={slot.attunement || ''} onchange={e => bm.setAttunement(slotIndex, (e.target as HTMLSelectElement).value)}
					class="flex-1 rounded-md border border-white bg-[#020202] px-2 py-1 text-white">
					<option value="">--select magic--</option>
					{#each attunementOptions as m}
						<option value={m.id} selected={slot.attunement === m.id}>{m.name}</option>
					{/each}
				</select>
			</div>
		{/if}

		<!-- Amulet variant selector -->
		{#if isAmulet && !isWeapon}
			<div class="flex flex-row items-center space-x-2">
				<p class="text-white" style="font-family:Merriweather,serif">Amulet</p>
				<select value={slot.amuletVariant?.type || ''} onchange={e => bm.setAmuletVariant(slotIndex, (e.target as HTMLSelectElement).value, null)}
					class="flex-1 rounded-md border border-white bg-[#020202] px-2 py-1 text-white">
					<option value="">--type--</option>
					{#each amuletTypes as t}
						<option value={t} selected={slot.amuletVariant?.type === t}>{t[0].toUpperCase() + t.slice(1)}</option>
					{/each}
				</select>
				<select value={slot.amuletVariant?.tier || ''} onchange={e => bm.setAmuletVariant(slotIndex, null, (e.target as HTMLSelectElement).value)}
					class="flex-1 rounded-md border border-white bg-[#020202] px-2 py-1 text-white">
					<option value="">--tier--</option>
					{#each amuletTiers as tier}
						<option value={tier} selected={slot.amuletVariant?.tier === tier}>{tier}</option>
					{/each}
				</select>
			</div>
		{/if}
	{/if}
</div>

<PickerModal show={modalOpen} field={modalField} items={bm.getPickerItems(modalField, slotIndex)} onSelect={selectItem} onClose={closeModal}
	subtitle={pickerSubtitle}
	validate={(item) => bm.canPickItem(modalField, slotIndex, item)} />
