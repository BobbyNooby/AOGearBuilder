<script lang="ts">
	import { aggregateBuildStats, type BuildObject, type GameConfig } from '@aotools/shared';
	import { statsStyles, statTypeBorderColors, rarityColors, staticImagesRootFolder } from '$lib/utils';
	import ItemThumb from './ItemThumb.svelte';

	let {
		name,
		build,
		allItems,
		modifiers,
		config,
		savedAt,
		source,
		compact = false
	}: {
		name: string;
		build: BuildObject;
		allItems: Record<string, any>[];
		modifiers: Record<string, any>[];
		config: GameConfig;
		savedAt: string;
		source: 'local' | 'online';
		compact?: boolean;
	} = $props();

	function findById(collection: Record<string, any>[], id: string | undefined): Record<string, any> | null {
		if (!id) return null;
		return collection.find((x) => x.id === id || x._id === id || String(x._id) === id) ?? null;
	}

	const armorItems = $derived(build.slots.map(s =>
		s.armorId ? findById(allItems, s.armorId) : null
	));

	const statResult = $derived.by(() => {
		const slots = build.slots.map(s => {
			const gems: Record<string, any>[] = [];
			for (const id of (s.gemIds || [])) {
				const g = findById(allItems, id);
				if (g) gems.push(g);
			}
			return {
				key: s.key,
				armor: s.armorId ? findById(allItems, s.armorId) : null,
				level: s.level || 0,
				enchant: s.enchantId ? findById(modifiers, s.enchantId) : null,
				modifier: s.modifierId ? findById(modifiers, s.modifierId) : null,
				gems,
				attunement: s.attunement ?? null,
				amuletVariant: s.amuletVariant ?? null
			};
		});
		return aggregateBuildStats(slots, build.player as any, config);
	});

	const date = $derived(new Date(savedAt).toLocaleDateString(undefined, {
		year: 'numeric', month: 'short', day: 'numeric'
	}));

	const STAT_NAMES = ['power', 'defense', 'size', 'haste', 'dexterity', 'range',
		'regeneration', 'pierce', 'resistance', 'insanity', 'warding', 'drawback'];

	const STAT_ICONS: Record<string, string> = {
		power:'power',defense:'defense',size:'attackSize',haste:'attackSpeed',dexterity:'agility',
		range:'intensity',pierce:'piercing',regeneration:'regeneration',resistance:'resistance',
		insanity:'insanity',warding:'warding',drawback:'drawback',
	};

	function itemBorder(item: Record<string, any>): string {
		return statTypeBorderColors[item.statType] || rarityColors[item.rarity] || '#30363d';
	}
</script>

<div
	class="flex flex-col gap-2 rounded border p-3 {compact ? 'border-white/20' : 'border-white/30'}"
	style="background:#0a0a0a"
>
	<div class="flex items-center justify-between gap-2">
		<p
			class="truncate font-bold text-white"
			class:text-sm={compact}
			class:text-base={!compact}
			style="font-family:Merriweather,serif"
		>
			{name}
		</p>
		<div class="flex shrink-0 items-center gap-1 text-xs text-white/40">
			<span>{date}</span>
			<span class="rounded border border-white/20 px-1 py-0.5 text-[10px] uppercase">{source}</span>
		</div>
	</div>

	<div class="flex flex-row justify-center gap-1">
		{#each armorItems as item, i}
			<div
				class="overflow-hidden {compact ? 'w-10 h-10' : 'w-12 h-12'}"
				style="border:1px solid {item ? itemBorder(item) : '#30363d'}; background:#020202"
			>
				<ItemThumb {item} fallback={['A1','A2','A3','C','P'][i]} />
			</div>
		{/each}
	</div>

	<div class="flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
		{#each STAT_NAMES as stat}
			{@const val = statResult[stat] || 0}
			{@const style = statsStyles[stat]}
			{#if val > 0}
				<span class="inline-flex items-center gap-0.5">
					<img class="h-3.5 w-3.5" src="{staticImagesRootFolder}/stats/{STAT_ICONS[stat] || stat}.png" alt="" />
					<span
						class="text-xs"
						style="font-family:'Open Sans',sans-serif; font-weight:700;
							-webkit-text-fill-color:{style?.fillColor || '#fff'};
							-webkit-text-stroke:1px {style?.strokeColor || '#000'};"
					>
						+{val}
					</span>
				</span>
			{/if}
		{/each}
		{#if (statResult._health || 0) > 0}
			<span class="text-xs text-white/70" style="font-family:'Open Sans',sans-serif">HP {statResult._health}</span>
		{/if}
		{#if (statResult._ep || 0) > 0}
			<span class="text-xs text-white/70" style="font-family:'Open Sans',sans-serif">EP {statResult._ep.toFixed(1)}</span>
		{/if}
	</div>

	{#if !compact}
		<div class="flex justify-center text-xs text-white/30" style="font-family:'Open Sans',sans-serif">
			Lv.{build.player.level} {build.player.awakened ? 'Awakened' : ''}
		</div>
	{/if}
</div>
