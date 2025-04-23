<script lang="ts">
	import TooltipTrigger from '$lib/components/ui/TooltipTrigger.svelte';
	import type { PlayerBuildSlot } from '$lib/gearBuilder/PlayerBuildSlot';
	import { Info } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import StatList from './StatList.svelte';
	import type { AnyItemDetails } from '$lib/types/itemTypes';
	import type { AOTConfig } from '$lib/types/utilTypes';
	import type { Player } from '$lib/gearBuilder/Player';

	let { slot, config, player }: { slot: PlayerBuildSlot; config: AOTConfig; player: Player } =
		$props();

	const stats = slot.getSlotStats() as AnyItemDetails;
	const itemName = slot.armor.name;
	const atlanteanAttribute = slot.chosenAtlanteanAttribute;

	let container: HTMLElement;
	onMount(() => {
		container = document.documentElement;
	});
</script>

{#snippet Button()}
	<div class="h-full w-fit rounded-md border border-white bg-gray-800 px-3 py-1 text-gray-300">
		<Info />
	</div>
{/snippet}

{#snippet HoverStuff()}
	<div
		class="h-full w-full rounded-md border-2 border-white bg-black p-1 text-center text-white opacity-95"
	>
		<p>{itemName}</p>
		<StatList
			{player}
			{config}
			item={stats}
			showStatName={false}
			{atlanteanAttribute}
			highlightAtlanteanStat={true}
		/>
	</div>
{/snippet}

<TooltipTrigger
	triggerSnippet={Button}
	tooltipContent={HoverStuff}
	cursorOffset={{ x: 20, y: 0 }}
	containerElement={container}
	tooltipWidth={200}
/>
