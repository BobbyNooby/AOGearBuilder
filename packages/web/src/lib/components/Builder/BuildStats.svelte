<script lang="ts">
	import { statsStyles, staticImagesRootFolder } from '$lib/utils';
	import { secondaryStatEffect, type GameConfig } from '$lib/stats';

	let {
		stats,
		player,
		config
	}: {
		stats: Record<string, number>;
		player: { level: number };
		config: GameConfig;
	} = $props();

	const STAT_NAMES = ['power','defense','size','haste','dexterity','range','regeneration','pierce','resistance','insanity','warding','drawback'];
	const ICONS: Record<string, string> = {
		power:'power',defense:'defense',size:'attackSize',haste:'attackSpeed',dexterity:'agility',
		range:'intensity',pierce:'piercing',regeneration:'regeneration',resistance:'resistance',
		insanity:'insanity',warding:'warding',drawback:'drawback',
	};
	const tooltips: Record<string, string> = $derived(
		Object.fromEntries(
			['size','haste','dexterity','range','regeneration','pierce','resistance']
				.map(s => [s, secondaryStatEffect(s, stats[s] || 0, player.level, config)])
		)
	);
</script>

<h2 class="mb-3 text-base font-bold text-white" style="font-family:Merriweather,serif">Build Stats</h2>

<div class="flex flex-col gap-1">
	{#each STAT_NAMES as stat}
		{@const style = statsStyles[stat]}
		{@const val = stats[stat] || 0}
		{@const tip = tooltips[stat]}
		{#if val > 0}
			<div class="flex items-center justify-center" title={tip || ''}>
				<img class="h-6 w-6" src="{staticImagesRootFolder}/stats/{ICONS[stat] || stat}.png" alt={stat} />
				<p
					class="ml-2"
					style="font-family:'Open Sans',sans-serif;font-weight:700;font-size:20px;
						-webkit-text-fill-color:{style?.fillColor || '#fff'};
						-webkit-text-stroke:1px {style?.strokeColor || '#000'};
						text-align:center;"
				>
					+{val} {style?.name || stat}
					{#if stat === 'stability' || stat === 'resilience'}%{/if}
				</p>
				{#if tip}
					<span class="ml-2 text-xs text-gray-400">({tip})</span>
				{/if}
			</div>
		{/if}
	{/each}
</div>

{#if (stats._health || 0) > 0}
	<div class="mt-3 border-t border-white pt-2">
		<div class="flex items-center justify-center">
			<p class="text-base font-bold text-white" style="font-family:'Open Sans',sans-serif">HP: {stats._health}</p>
		</div>
	</div>
{/if}

{#if (stats._ep || 0) > 0}
	<div class="mt-1 border-t border-white pt-2">
		<div class="flex items-center justify-center">
			<p class="text-base font-bold text-white" style="font-family:'Open Sans',sans-serif">EP: {stats._ep}</p>
		</div>
	</div>
{/if}
