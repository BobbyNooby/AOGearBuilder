<script lang="ts">
	import type { anyItem } from '$lib/gearBuilder/itemTypes';
	import { onMount } from 'svelte'
	export let item:anyItem, src:string = item.imageId;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
			const img = new Image();
			img.src = src;
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

{#if loaded}
    <img class="w-full h-full object-contain" {src} alt={item.name} />
    
{:else if failed || loading}
    <h1 style="color:white;">{item.name || "None"}</h1>
{/if}

