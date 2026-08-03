<script lang="ts">
	import { rarityColors, staticImagesRootFolder, statsStyles, equipTypeLabel } from '$lib/utils';
	import { formatStatRange, displayMaxLevel, formatModifierStats, computeEP } from '$lib/stats';
	import type { GameConfig, PlayerState } from '$lib/stats';
	import { page } from '$app/state';

	let {
		item, slotData, player
	}: {
		item: Record<string, any>;
		slotData?: Record<string, any>;
		player?: PlayerState;
	} = $props();

	const config: GameConfig = {
		maxLevel: page.data.gameMaxLevel,
		pointsPerLevel: 0,
		statPointMaxFormula: '',
		scalings: page.data.scalings,
		statRegistry: page.data.statRegistry,
		buildTypes: [],
		playerTransforms: {}
	};

	const statRange = $derived(formatStatRange(item, config));
	const cappedMax = $derived(displayMaxLevel(item, config.maxLevel));
	const minLvl = $derived(Math.floor((item.minLevel || 1) / 10) * 10);

	// enchant / modifier exact contribution at current slot level
	const modifierStats = $derived.by(() => {
		if (!item.effects || item.effects.length === 0) return null;
		const level = slotData?.level || player?.level || 0;
		return formatModifierStats(item, level, config);
	});

	const modifierEP = $derived.by(() => {
		if (!modifierStats || Object.keys(modifierStats).length === 0) return 0;
		const level = slotData?.level || player?.level || 0;
		return computeEP(modifierStats, level, config);
	});

	// map new stat names → icon filename used in GitHub images repo
	const iconMap: Record<string, string> = {
		power: 'power', defense: 'defense',
		size: 'attackSize', haste: 'attackSpeed', dexterity: 'agility', range: 'intensity',
		pierce: 'piercing', regeneration: 'regeneration', resistance: 'resistance',
		insanity: 'insanity', warding: 'warding', drawback: 'drawback',
	};
	const statTypeColors: Record<string, string> = { Magic: '#02B1EB', Arcanium: '#02B1EB', Strength: '#FF6060', Vitality: '#00FF00' };

	function cap(s: string): string { return s ? s[0].toUpperCase() + s.slice(1) : ''; }
</script>

<div
	class="rounded p-3 text-center shadow-lg"
	style="background:#000; border:3px solid {rarityColors[item.rarity] || '#fff'}; color:white; z-index:50"
>
	<h2 class="text-2xl" style="font-family:Merriweather,serif; color:white">{item.name || item.id}</h2>
	<p class="text-md" style="font-family:Merriweather,serif; color:white">
		{item.rarity ? `${item.rarity} ` : ''}{equipTypeLabel[item.equipType] || cap(item.equipType) || cap(item.type)}
		{#if item.statType && item.statType !== 'Normal' && item.statType !== 'None'}
			<span style="color:{statTypeColors[item.statType] || '#fff'}; font-size:0.85em"> · {item.statType}</span>
		{/if}
	</p>

	{#if slotData?.attunement}
		<p class="text-sm mt-1" style="font-family:Merriweather,serif; color:#02B1EB">
			Attuned to {slotData.attunement}
		</p>
	{/if}

	{#if slotData?.amuletVariant?.type && slotData?.amuletVariant?.tier}
		<p class="text-sm mt-1" style="font-family:Merriweather,serif; color:#E9DE50">
			{cap(slotData.amuletVariant.type)} Amulet · {cap(slotData.amuletVariant.tier)}
		</p>
	{/if}

	{#if item.description}
		<p class="text-sm mt-1 text-gray-400 italic" style="font-family:'Open Sans',sans-serif">{item.description}</p>
	{/if}

	{#if item.minLevel != null}
		<p class="text-lg mt-1" style="font-family:Merriweather,serif; color:white">
			Level {minLvl}{#if cappedMax !== minLvl} — {cappedMax}{/if}
		</p>
	{/if}

	{#if item.legend}
		<p class="text-sm mt-1 text-gray-400" style="font-family:'Open Sans',sans-serif">{item.legend}</p>
	{/if}

	<!-- armor / gem stat rows -->
	{#if Object.keys(statRange.stats).length > 0}
		<div class="flex flex-col items-center mt-2 gap-1">
			{#each Object.entries(statRange.stats) as [stat, val]}
				{@const style = statsStyles[stat]}
				{@const icon = iconMap[stat] || stat}
				<div class="flex items-center justify-center">
					<img class="h-6 w-6" src="{staticImagesRootFolder}/stats/{icon}.png" alt={stat} />
					<p
						style="font-family:'Open Sans',sans-serif;font-weight:700;font-size:20px;
							-webkit-text-fill-color:{style?.fillColor || '#fff'};
							-webkit-text-stroke:1px {style?.strokeColor || '#000'};
							text-align:center;color:{style?.fillColor || '#fff'};"
					>
						{val}{style?.suffix || ''}
					</p>
				</div>
			{/each}
		</div>
	{/if}

	<!-- enchant / modifier scaled stat rows -->
	{#if modifierStats && Object.keys(modifierStats).length > 0}
		<div class="flex flex-col items-center mt-2 gap-1">
			{#each Object.entries(modifierStats) as [stat, val]}
				{@const style = statsStyles[stat]}
				{@const icon = iconMap[stat] || stat}
				{#if val !== 0}
					<div class="flex items-center justify-center">
						<img class="h-6 w-6" src="{staticImagesRootFolder}/stats/{icon}.png" alt={stat} />
						<p
							style="font-family:'Open Sans',sans-serif;font-weight:700;font-size:20px;
								-webkit-text-fill-color:{style?.fillColor || '#fff'};
								-webkit-text-stroke:1px {style?.strokeColor || '#000'};
								text-align:center;color:{style?.fillColor || '#fff'};"
						>
							{#if val > 0}+{/if}{val}{style?.suffix || ''} {style?.name || stat}
						</p>
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	{#if statRange.ep || modifierEP > 0}
		<div class="mt-2 border-t border-white pt-1">
			<p style="font-family:'Open Sans',sans-serif;font-weight:700;font-size:20px;color:white">EP: {statRange.ep || modifierEP}</p>
		</div>
	{/if}
</div>
