<script lang="ts">
	import TooltipTrigger from './TooltipTrigger.svelte';
	import Item from './Item.svelte';
	import ItemTooltip from './ItemTooltip.svelte';
	import type { PlayerState } from '$lib/stats';

	let {
		item, slotData, player
	}: {
		item: Record<string, any>;
		slotData?: Record<string, any>;
		player?: PlayerState;
	} = $props();
</script>

<TooltipTrigger>
	{#snippet trigger()}
		<div class="aspect-square w-24 cursor-pointer">
			<Item {item} />
		</div>
	{/snippet}
	{#snippet tooltip()}
		<ItemTooltip {item} {slotData} {player} />
	{/snippet}
</TooltipTrigger>
