<script lang="ts">
	import TooltipTrigger from '../TooltipTrigger.svelte';

	let {
		stats,
		itemName,
		statsStyles,
		staticImagesRootFolder
	}: {
		stats: Record<string, number>;
		itemName: string;
		statsStyles: Record<string, { name: string; fillColor: string; strokeColor: string; suffix: string }>;
		staticImagesRootFolder: string;
	} = $props();

	const iconMap: Record<string, string> = {
		power: 'power', defense: 'defense',
		size: 'attackSize', haste: 'attackSpeed', dexterity: 'agility', range: 'intensity',
		pierce: 'piercing', regeneration: 'regeneration', resistance: 'resistance',
		insanity: 'insanity', warding: 'warding', drawback: 'drawback',
	};

	let entries = $derived(
		Object.entries(stats).filter(([k, v]) => v > 0 && !k.startsWith('_'))
	);
</script>

<TooltipTrigger>
	{#snippet trigger()}
		<button aria-label="Slot stats" class="h-full w-fit rounded-md border border-white bg-[#1f2937] px-3 py-1 text-gray-300 hover:bg-[#374151]">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
				<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/>
				<path d="M8 7v5M8 4.5v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
		</button>
	{/snippet}
	{#snippet tooltip()}
		<div class="h-full w-full rounded-md border-2 border-white bg-black p-1 text-center text-white opacity-95">
			<p class="text-sm" style="font-family:Merriweather,serif">{itemName || 'No item'}</p>
			{#if entries.length > 0}
				<div class="mt-1 flex flex-col gap-1">
					{#each entries as [stat, val]}
						{@const style = statsStyles[stat]}
						{@const icon = iconMap[stat] || stat}
						<div class="flex items-center justify-center">
							<img class="h-6 w-6" src="{staticImagesRootFolder}/stats/{icon}.png" alt={stat} />
							<p
								class="ml-1"
								style="font-family:'Open Sans',sans-serif;font-weight:700;font-size:20px;
									-webkit-text-fill-color:{style?.fillColor || '#fff'};
									-webkit-text-stroke:1px {style?.strokeColor || '#000'};
									text-align:center;"
							>
								{val}
							</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-xs text-gray-400">No stats</p>
			{/if}
		</div>
	{/snippet}
</TooltipTrigger>
