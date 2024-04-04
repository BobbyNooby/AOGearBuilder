<script lang="ts">
	import { rarityColors } from '$lib/dataConstants';
	import type {
		ArmorItemData,
		GemItemData,
		EnchantItemData,
		ModifierItemData
	} from '$lib/itemTypes';
	import { writable } from 'svelte/store';
	import ItemTooltip from './ItemTooltip.svelte';
	import type { Player } from '$lib/playerClasses';

	export let Item: ArmorItemData | GemItemData | EnchantItemData | ModifierItemData | any,
		SlotKey: string,
		gemIndex: boolean | number,
		Player: Player,
		toggleMenu: () => void,
		updatePage: () => void;

	let isHovering = false;
	let mousePosition = { x: 0, y: 0 };
	const hoverWidth = writable(300);

	let levelRange = '';

	let chosenAtlanteanAttribute: string = '';
	let showOnlyAtlanteanStat = false;

	function setBoxPositionOverflow() {
		if (mousePosition.x + $hoverWidth + 20 >= document.getElementById('menuouter').clientWidth) {
			if (document.getElementById('menuouter') != null) {
				mousePosition.x =
					mousePosition.x - 40 - $hoverWidth + document.getElementById('menuouter').scrollLeft;
			}
		} else {
			if (document.getElementById('menuouter') != null) {
				mousePosition.x += document.getElementById('menuouter').scrollLeft;
			}
		}

		if (document.getElementById('hover') != null) {
			if (
				mousePosition.y + document.getElementById('hover').offsetHeight >=
				document.getElementById('menuouter').clientHeight
			) {
				if (document.getElementById('menuouter') != null) {
					mousePosition.y =
						mousePosition.y -
						document.getElementById('hover').offsetHeight +
						document.getElementById('menuouter').scrollTop;
				}
			} else {
				if (document.getElementById('menuouter') != null) {
					mousePosition.y += document.getElementById('menuouter').scrollTop;
				}
			}
		}
	}

	function createdHover() {
		setBoxPositionOverflow();
	}

	function handleMouseOver(event: MouseEvent) {
		isHovering = true;
		mousePosition = { x: event.clientX, y: event.clientY };

		if (!Item.hasOwnProperty('statsPerLevel')) {
			levelRange = '';
		} else if (Item.statsPerLevel.length == 1) {
			levelRange = Item.statsPerLevel[0].level;
		} else if (Item.statsPerLevel.length > 1) {
			levelRange =
				Item.statsPerLevel[0].level.toString() +
				' - ' +
				Item.statsPerLevel[Item.statsPerLevel.length - 1].level.toString();
		}

		setBoxPositionOverflow();
	}

	function handleMouseOut() {
		isHovering = false;
	}

	function handleClick() {
		Player.build.setGear(Item, SlotKey, gemIndex);
		updatePage();
		toggleMenu();
	}
</script>

<button
	on:mousemove={handleMouseOver}
	on:mouseleave={handleMouseOut}
	on:click={handleClick}
	class="m-2 w-28 h-28"
	style="border-color: {rarityColors[Item.rarity]}; border-width: 1px; background-color: #020202;"
>
	<img alt={Item.name} src={Item.imageId} class="w-full h-full object-contain" />
	<p>{Item.name}</p>
	{#if isHovering}
		<div
			use:createdHover
			class="z-40 rounded"
			id="hover"
			style="
	  position: absolute;
	  background-color: black;  
	  width: {$hoverWidth}px; 
	  padding: 10px;
	  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	  border: 3px solid white;
	  border-color: {rarityColors[Item.rarity]};
	  color: white;
	  top: {mousePosition.y}px; 
	  left: {mousePosition.x + 20}px;
	  z-index : 40
	 
	  
	  
	"
		>
			<h2 class="text-2xl z-40" style="color: white; font-family: Merriweather;">{Item.name}</h2>
			<p class="text-xl z-40" style="color: white; font-family: Merriweather;">
				{#if Item.subType && Item.subType !== 'None'}{Item.subType}{/if}
				{Item.mainType}
			</p>
			<p class="text-l z-40" style="color: white; font-family: Merriweather;">
				{#if levelRange != ''}Level {levelRange}{/if}
			</p>
			<p class="text-l z-40" style="color: white; font-family: 'Open Sans', sans-serif;">
				{Item.legend}
			</p>
			<div class=" items-center text-center z-40">
				<ItemTooltip
					{Item}
					showName={true}
					atlanteanAttribute={chosenAtlanteanAttribute}
					{showOnlyAtlanteanStat}
				/>
			</div>
		</div>
	{/if}
</button>
