<script lang="ts">
	import { rarityColors, staticImagesRootFolder } from '$lib/dataConstants';
	import type { anyItem } from '$lib/utils/itemTypes';
	import { onMount } from 'svelte'
    
	export let item:anyItem, hasGems:boolean = true, hasStatsOverlay:boolean = true, borderWidth:number = 1;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
			const img = new Image();
			img.src = item.imageId||"";
			loading = true;

			img.onload = () => {
					loading = false;
					loaded = true;
			};
			img.onerror = () => {
					loading = false;
					failed = true;
			};
	})
</script>

<div
	class="w-full h-full flex items-center justify-center relative"
	style="border-color: {rarityColors[
		item.rarity||"Common"
	]}; border-width: {borderWidth}px; background-color: #020202;"
>
    {#if hasStatsOverlay}
        {#if item.statType && item.statType != 'None'}
            <img
                style="opacity: {item.statType ? '1' : '0'};"
                src="{staticImagesRootFolder}/Misc/{item.statType}Items.png"
                alt="Magic"
                class="w-full h-full absolute right-0 bottom-0 z-10"
            />
        {/if}
    {/if}
    {#if hasGems}
        <div class="absolute right-0 bottom-0 flex flex-row z-20">
            {#each { length: item.gemNo } as _, i}
                <img src="{staticImagesRootFolder}/Misc/gemslot.png" alt="Gem slot" class=" w-5 h-5" />
            {/each}
        </div>
    {/if}
    {#if loaded}
        <img
            class="w-full h-full object-contain"
            src={item.imageId}
            alt={item.name}
        />
    {:else if failed}
        <h1 class="text-center" style="color:white;">
            {item.name || 'None'}
        </h1>
    {/if}
</div>