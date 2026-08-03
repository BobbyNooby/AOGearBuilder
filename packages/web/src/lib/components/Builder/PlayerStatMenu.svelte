<script lang="ts">
	import StatBar from './StatBar.svelte';
	import AbilitySelector from './AbilitySelector.svelte';
	import { BuildManager } from '$lib/builder/BuildManager.svelte';
	import { DEFAULT_MAX_LEVEL } from '@aotools/shared';
	let {
		bm
	}: {
		bm: BuildManager;
	} = $props();

	let showAbilitySelector = $state(false);
	let abilitySelectorType = $state<'magic' | 'fighting-style'>('magic');
	let abilitySelectorSlot = $state(0);

	function openAbilitySelector(type: 'magic' | 'fighting-style', slot: number) {
		abilitySelectorType = type;
		abilitySelectorSlot = slot;
		showAbilitySelector = true;
	}

	function closeAbilitySelector() {
		showAbilitySelector = false;
	}

	function handleAbilitySelect(id: string) {
		if (abilitySelectorType === 'magic') {
			bm.selectMagic(abilitySelectorSlot, id);
		} else {
			bm.selectFightingStyle(abilitySelectorSlot, id);
		}
		showAbilitySelector = false;
	}

	function handleLevelChange(delta: number) {
		bm.player.level = Math.min(Math.max(bm.player.level + delta, 1), bm.config.maxLevel || DEFAULT_MAX_LEVEL);
	}

	const STAT_CONFIG = [
		{ key: 'spirit', name: 'Spirit', color: '#E9DE50', legend: 'Increases your maximum health, but reduces your damage output slightly. In turn, having high spirit allows you to use spirit weapons.' },
		{ key: 'magic', name: 'Magic', color: '#02B1EB', legend: 'Increases your knowledge of magic, allowing you to use stronger spells, master multiple magics, and more.' },
		{ key: 'strength', name: 'Strength', color: '#FF6060', legend: 'Increases your athleticism, allowing you to use stronger melee attacks, master multiple fighting styles and more.' },
		{ key: 'weapons', name: 'Weapons', color: '#BFBFBF', legend: 'Increases your experience in using weapons, allowing you to use stronger weapon abilities, master high level weapons, and more.' }
	];

	function getAbilityImage(type: 'magic' | 'fighting-style', id: string | null): string {
		if (!id) return '';
		if (type === 'magic') {
			const m = bm.magics.find((x: any) => x.id === id);
			return m?.imageUrl || '';
		} else {
			const fs = bm.fightingStyles.find((x: any) => x.id === id);
			return fs?.imageUrl || '';
		}
	}

	function getAbilityName(type: 'magic' | 'fighting-style', id: string | null): string {
		if (!id) return 'None';
		if (type === 'magic') {
			const m = bm.magics.find((x: any) => x.id === id);
			return m?.name || id;
		} else {
			const fs = bm.fightingStyles.find((x: any) => x.id === id);
			return fs?.name || id;
		}
	}
</script>

<div class="rounded border-2 border-white bg-black bg-opacity-60 p-6">
			<!-- Level + Health -->
			<div class="mb-4 flex flex-row items-center gap-4">
				<p class="text-2xl text-white" style="font-family:Merriweather,serif">Level</p>
				<div class="flex items-center gap-2">
					<button
						onclick={() => handleLevelChange(-1)}
						class="rounded border border-white bg-black px-3 py-1 text-white hover:bg-[#1f2937]"
					>-</button>
					<input
						type="number"
						value={bm.player.level}
						min={1}
						max={bm.config.maxLevel || DEFAULT_MAX_LEVEL}
						onchange={(e) => { bm.player.level = parseInt((e.target as HTMLInputElement).value) || DEFAULT_MAX_LEVEL; }}
						class="w-20 rounded border border-white bg-[#020202] px-2 py-1 text-center text-white"
					/>
					<button
						onclick={() => handleLevelChange(1)}
						class="rounded border border-white bg-black px-3 py-1 text-white hover:bg-[#1f2937]"
					>+</button>
				</div>
				<div class="ml-4 flex flex-row gap-4 text-white">
					<p style="font-family:Merriweather,serif">Health: <span class="text-green-500">{bm.buildStats._health || 0}</span></p>
					<p style="font-family:Merriweather,serif">Base: <span class="text-green-300">{93 + bm.player.level * 7}</span></p>
				</div>
			</div>

			<!-- Build badge -->
			{#if bm.detectedBuild}
				<div class="mb-4">
					<span
						class="inline-block rounded px-3 py-1 text-sm font-bold"
						style="background:{bm.detectedBuild.color}22;color:{bm.detectedBuild.color}"
					>
						{bm.detectedBuild.id.toUpperCase()}
					</span>
				</div>
			{/if}

			<!-- Magic slots -->
			<div class="mb-4">
				<p class="mb-2 text-sm text-white" style="font-family:Merriweather,serif">Magic Slots ({bm.magicSlotCount})</p>
				<div class="flex flex-row gap-2">
					{#each Array(bm.magicSlotCount) as _, i}
						<button
							onclick={() => openAbilitySelector('magic', i)}
							class="flex h-24 w-24 flex-col items-center justify-center rounded border border-white bg-black p-2 text-center hover:bg-[#1a1a1a]"
						>
							{#if bm.player.selectedMagic?.[i]}
								<img src={getAbilityImage('magic', bm.player.selectedMagic[i])} alt="" class="mb-1 h-14 w-14 object-contain" />
								<p class="text-[10px] text-white">{getAbilityName('magic', bm.player.selectedMagic[i])}</p>
							{:else}
								<p class="text-xs text-gray-400">Pick</p>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- FS slots -->
			<div class="mb-4">
				<p class="mb-2 text-sm text-white" style="font-family:Merriweather,serif">Fighting Style Slots ({bm.fsSlotCount})</p>
				<div class="flex flex-row gap-2">
					{#each Array(bm.fsSlotCount) as _, i}
						<button
							onclick={() => openAbilitySelector('fighting-style', i)}
							class="flex h-24 w-24 flex-col items-center justify-center rounded border border-white bg-black p-2 text-center hover:bg-[#1a1a1a]"
						>
							{#if bm.player.selectedFS?.[i]}
								<img src={getAbilityImage('fighting-style', bm.player.selectedFS[i])} alt="" class="mb-1 h-14 w-14 object-contain" />
								<p class="text-[10px] text-white">{getAbilityName('fighting-style', bm.player.selectedFS[i])}</p>
							{:else}
								<p class="text-xs text-gray-400">Pick</p>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Stat bars -->
			<div class="mb-4">
				<div class="mb-2 flex flex-row items-center justify-between text-white">
					<p class="text-lg" style="font-family:Merriweather,serif">
						Maximum Points: <span style="color:#c3bef3">{bm.maxPoints}</span> |
						Available: <span style="color:#c3bef3">{bm.availablePoints}</span>
					</p>
				</div>

				{#each STAT_CONFIG as cfg}
					<StatBar
						name={cfg.name}
						color={cfg.color}
						value={(bm.player as any)[cfg.key] || 0}
						max={bm.maxPoints}
						legend={cfg.legend}
						locked={!bm.canEditStat(cfg.key)}
						onChange={(delta) => bm.changeStatPoint(cfg.key as any, delta)}
					/>
				{/each}
			</div>

			<!-- Footer buttons -->
			<div class="flex flex-row items-center gap-4">
				<button
					onclick={() => bm.resetStatPoints()}
					class="rounded border border-white bg-[#020202] px-4 py-2 text-sm text-white hover:bg-[#1f2937]"
					style="font-family:Merriweather,serif"
				>
					Reset Stats
				</button>

				{#if bm.player.awakened}
					<button
						onclick={() => bm.unawaken()}
						class="rounded border border-white bg-[#020202] px-4 py-2 text-sm text-white hover:bg-[#1f2937]"
						style="font-family:Merriweather,serif"
					>
						Unawaken
					</button>
				{:else if bm.canAwaken}
					<button
						onclick={() => bm.awaken()}
						class="rounded border border-white bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
						style="font-family:Merriweather,serif"
					>
						Awaken
					</button>
				{:else if bm.detectedBuild}
					<button
						disabled
						class="cursor-not-allowed rounded border border-white bg-[#020202] px-4 py-2 text-sm text-gray-500"
						style="font-family:Merriweather,serif"
					>
						Awaken at {bm.awakeningLevel}
					</button>
			{/if}
		</div>

	<!-- Ability selector overlay -->
	{#if showAbilitySelector}
		<AbilitySelector
			type={abilitySelectorType}
			selectedId={abilitySelectorType === 'magic'
				? bm.player.selectedMagic?.[abilitySelectorSlot] || null
				: bm.player.selectedFS?.[abilitySelectorSlot] || null}
			items={abilitySelectorType === 'magic' ? bm.magics : bm.fightingStyles}
			onSelect={handleAbilitySelect}
			onClose={closeAbilitySelector}
		/>
	{/if}
</div>
