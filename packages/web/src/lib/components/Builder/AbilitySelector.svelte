<script lang="ts">
	import { fade } from 'svelte/transition';
	import { staticImagesRootFolder } from '$lib/utils';

	let {
		type,
		selectedId,
		items,
		onSelect,
		onClose
	}: {
		type: 'magic' | 'fighting-style';
		selectedId: string | null;
		items: any[];
		onSelect: (id: string) => void;
		onClose: () => void;
	} = $props();

	// svelte-ignore state_referenced_locally
	let hoveredItem = $state(items[0] || null);

	function handleHover(item: any) {
		hoveredItem = item;
	}

	function handleSelect() {
		if (hoveredItem) onSelect(hoveredItem.id);
	}

	// stat bar helpers
	function getStatEntries(stats: Record<string, any>) {
		if (!stats) return [];
		return Object.entries(stats).map(([key, val]) => ({
			key,
			label: val.text || key,
			value: val.value || 0,
			min: val.minValue || 0,
			max: val.maxValue || 1
		}));
	}

	function barWidth(val: number, min: number, max: number) {
		if (max <= min) return 0;
		return Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));
	}

	const isMagic = $derived(type === 'magic');
</script>

{#if items.length > 0}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-black bg-opacity-95 p-4"
		transition:fade={{ duration: 100 }}
		onclick={(e) => { if (e.target === e.currentTarget) onClose(); }}
		onkeydown={(e) => { if (e.key === 'Escape') onClose(); }}
		tabindex="-1"
		role="dialog"
	>
		<!-- Close button -->
		<button aria-label="Close" onclick={onClose} class="absolute right-4 top-4">
			<div class="flex h-12 w-12 items-center justify-center rounded border border-white bg-black text-white">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg>
			</div>
		</button>

		<p class="mb-4 mt-8 text-center text-3xl text-white" style="font-family:Merriweather,serif">
			Select {isMagic ? 'Magic' : 'Fighting Style'}
		</p>

		<!-- Horizontal scrollable grid -->
		<div class="flex w-3/4 flex-row gap-3 overflow-x-auto rounded border border-white bg-black p-3">
			{#each items as item (item.id)}
				<button
					class="flex h-36 w-36 flex-shrink-0 flex-col items-center justify-center rounded border border-white bg-black p-2 text-center transition-colors hover:bg-[#1a1a1a]"
					class:!bg-[#2a2a2a]={hoveredItem?.id === item.id}
					onmouseenter={() => handleHover(item)}
					onclick={() => handleHover(item)}
				>
					<img src={item.imageUrl} alt={item.name} class="mb-1 h-20 w-20 object-contain" />
					<p class="text-xs text-white" style="font-family:Merriweather,serif">{item.name}</p>
				</button>
			{/each}
		</div>

		<!-- Preview pane -->
		{#if hoveredItem}
			<div class="mt-6 flex w-3/4 flex-row gap-6">
				<!-- Left: stats -->
				<div class="flex w-1/2 flex-col items-center">
					<p
						class="mb-4 text-center text-3xl"
						style="font-family:Merriweather,serif;
							color:{hoveredItem.textColors?.genericFillColor || '#fff'};
							-webkit-text-stroke:1px {hoveredItem.textColors?.genericStrokeColor || '#000'};"
					>
						{hoveredItem.name}
						{#if isMagic}Magic{/if}
					</p>

					{#each getStatEntries(hoveredItem.stats) as stat}
						<div class="mb-2 w-full">
							<p class="text-sm text-white" style="font-family:Merriweather,serif">
								{stat.label} : {stat.value}x
							</p>
							<div class="flex flex-row items-center">
								<span class="w-5 text-xs text-white">{stat.min}</span>
								<div class="mx-2 h-4 flex-1 border-2 border-gray-400 bg-black bg-opacity-50">
									<div
										class="h-full transition-all duration-300"
										style="width:{barWidth(stat.value, stat.min, stat.max)}%;background-color:{hoveredItem.color || '#fff'};"
									></div>
								</div>
								<span class="w-5 text-xs text-white">{stat.max}</span>
							</div>
						</div>
					{/each}

					{#if isMagic && hoveredItem.statusEffect && hoveredItem.statusEffect.name !== 'NONE'}
						<div
							class="mt-4 flex flex-col text-center"
							style="font-family:Merriweather,serif;
								color:{hoveredItem.textColors?.genericFillColor || '#fff'};
								-webkit-text-stroke:1px {hoveredItem.textColors?.genericStrokeColor || '#000'};"
						>
							<p class="text-xl">
								Status Effect - <span style="color:{hoveredItem.statusEffect.effectFillColor};-webkit-text-stroke-color:{hoveredItem.statusEffect.effectStrokeColor};">{hoveredItem.statusEffect.name}</span>
							</p>
							<p class="mt-1 text-sm text-white">{hoveredItem.statusEffect.description}</p>
							<p
								class="mt-1 text-sm"
								style="color:{hoveredItem.statusEffect.applyMethodFillColor};-webkit-text-stroke-color:{hoveredItem.statusEffect.applyMethodStrokeColor};-webkit-text-stroke:1px;"
							>
								{hoveredItem.statusEffect.applyMethod}
							</p>
						</div>
					{/if}
				</div>

				<!-- Right: legend + extra stats -->
				<div class="flex w-1/2 flex-col items-center">
					<p class="mb-4 text-center text-lg text-white" style="font-family:Merriweather,serif">
						{hoveredItem.legend}
					</p>

					<p class="mb-2 text-center text-xl text-white" style="font-family:Merriweather,serif">Extra Stats</p>
					<div class="w-full px-4 text-white" style="font-family:Merriweather,serif">
						{#if hoveredItem.extraStats}
							{#each Object.entries(hoveredItem.extraStats) as [key, vals]}
								{#if Array.isArray(vals) && vals.length > 0}
									<div class="flex flex-row py-1">
										<div class="w-1/3 text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
										<div class="flex flex-col w-2/3 text-sm">
											{#each vals as v}<p>{v}</p>{/each}
										</div>
									</div>
								{/if}
							{/each}
						{/if}

						{#if !isMagic && hoveredItem.passives && hoveredItem.passives.length > 0}
							<div class="mt-2">
								<p class="mb-1 text-sm font-bold">Passives</p>
								{#each hoveredItem.passives as p}<p class="text-sm">{p}</p>{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<!-- Select button -->
		{#if hoveredItem}
			<button
				onclick={handleSelect}
				class="mt-6 w-56 border-2 border-white bg-blue-600 p-4 text-xl text-white transition-colors hover:bg-blue-500"
				style="font-family:Merriweather,serif"
			>
				Select {isMagic ? 'Magic' : 'Fighting Style'}
			</button>
		{/if}
	</div>
{/if}
