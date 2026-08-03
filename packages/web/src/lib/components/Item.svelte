<script lang="ts">
	import { rarityColors, statTypeBorderColors, staticImagesRootFolder } from '$lib/utils';

	let { item }: { item: Record<string, any> } = $props();

	let loaded = $state(false);
	let failed = $state(false);
	let currentUrl = $state('');

	$effect(() => {
		const url = item.imageUrl || '';
		currentUrl = url;
		loaded = false;
		failed = false;
		if (!url) { failed = true; return; }
		const img = new Image();
		img.src = url;
		img.onload = () => { if (currentUrl === url) loaded = true; };
		img.onerror = () => { if (currentUrl === url) failed = true; };
	});
</script>

<div
	class="relative flex h-full w-full items-center justify-center overflow-hidden"
	style="border:1px solid {statTypeBorderColors[item.statType] || rarityColors[item.rarity] || '#30363d'}; background:#020202"
>
	{#if item.statType && item.statType !== 'None' && item.statType !== 'Normal'}
		<img
			src="{staticImagesRootFolder}/Misc/{item.statType}Items.png"
			alt={item.statType}
			class="absolute inset-0 z-10 h-full w-full opacity-80"
			onerror={(e) => (e.currentTarget as HTMLElement).remove()}
		/>
	{/if}

	{#if (item.jewelSlots || 0) > 0}
		<div class="absolute bottom-0 right-0 z-20 flex flex-row">
			{#each Array(item.jewelSlots || 0) as _, i}
				<img src="{staticImagesRootFolder}/Misc/gemslot.png" alt="gem" class="h-5 w-5" onerror={(e) => (e.currentTarget as HTMLElement).remove()} />
			{/each}
		</div>
	{/if}

	{#if loaded}
		<img class="h-full w-full object-contain" src={item.imageUrl} alt={item.name} />
	{:else if failed}
		<h1 class="z-30 px-1 text-center text-sm font-bold leading-tight text-white" style="font-family:Merriweather,serif">{item.name || '?'}</h1>
	{/if}
</div>
