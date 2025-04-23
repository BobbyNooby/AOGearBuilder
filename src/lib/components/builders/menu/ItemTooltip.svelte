<script lang="ts">
	import type { Player } from '$lib/gearBuilder/Player';
	import type { AnyItemDetails } from '$lib/types/itemTypes';
	import type { AOTConfig } from '$lib/types/utilTypes';
	import { rarityColors } from '$lib/utils';
	import StatList from '../stats/StatList.svelte';

	let {
		item,
		config,
		levelRangeString,
		player,
		slotKey,
		atlanteanAttribute,
		showOnlyAtlanteanStat
	}: {
		item: AnyItemDetails;
		config: AOTConfig;
		levelRangeString: string;
		player?: Player;
		slotKey: keyof typeof Player.prototype.build.slots;
		atlanteanAttribute?: string;
		showOnlyAtlanteanStat?: boolean;
	} = $props();
</script>

<div
	class="z-40 w-full items-center rounded text-center"
	style="
	  background-color: black;  
	  padding: 10px;
	  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	  border: 3px solid white;
	  border-color: {rarityColors[item.rarity]};
	  color: white;
	  z-index : 40
	"
>
	<h2 class="z-40 text-2xl" style="color: white; font-family: Merriweather;">{item.name}</h2>
	<p class="z-40 text-xl" style="color: white; font-family: Merriweather;">
		{#if item.subType != null && item.subType != 'None'}{item.subType}{/if}
		{item.mainType}
	</p>
	<p class="text-l z-40" style="color: white; font-family: Merriweather;">
		{#if levelRangeString != ''}Level {levelRangeString}{/if}
	</p>
	<p class="text-l z-40" style="color: white; font-family: 'Open Sans', sans-serif;">
		{item.legend}
	</p>
	<div class=" z-40 items-center text-center">
		<StatList
			{config}
			{item}
			{player}
			{slotKey}
			isMenu={true}
			showStatName={true}
			{atlanteanAttribute}
			{showOnlyAtlanteanStat}
		/>
	</div>
</div>
