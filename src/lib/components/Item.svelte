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

	export let item: ArmorItemData | GemItemData | EnchantItemData | ModifierItemData | any,
		slotKey: 'accessory1' | 'accessory2' | 'accessory3' | 'chestplate' | 'pants',
		gemIndex: boolean | number,
		player: Player,
		toggleMenu: () => void,
		updatePage: () => void;

	let isHovering = false;
	let mousePosition = { x: 0, y: 0 };
	const hoverWidth = writable(300);

	let levelRange = '';

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

		if (!item.hasOwnProperty('minLevel') && !item.hasOwnProperty('maxLevel')) {
			levelRange = '';
		} else {
			levelRange = item.minLevel + ' - ' + item.maxLevel;
		}

		setBoxPositionOverflow();
	}

	function handleMouseOut() {
		isHovering = false;
	}

	function handleClick() {
		const itemSetted: boolean = player.build.setGear(item, slotKey, gemIndex);

		console.log(itemSetted);
		if (itemSetted === true) {
			updatePage();
			toggleMenu();
		}
	}

	let chosenAtlanteanAttribute: string = '';
	let showOnlyAtlanteanStat = false;

	//Modifier calculations
	modifierCalcs: if (item.name == 'Atlantean Essence') {
		const atlantenOrder = ['power', 'defense', 'attackSize', 'attackSpeed', 'agility', 'intensity'];

		let preAtlanteanArmor = player.build.slots[slotKey].getSlotStats(true);

		//Calculations for Atlantean
		for (const currentAttribute of atlantenOrder) {
			if (preAtlanteanArmor[currentAttribute] == 0) {
				chosenAtlanteanAttribute = currentAttribute;
				showOnlyAtlanteanStat = true;
				break modifierCalcs;
			}
		}
		// Only happens when all of them have a value so hence the loop around
		chosenAtlanteanAttribute = 'power';
		showOnlyAtlanteanStat = true;
	} else {
		chosenAtlanteanAttribute = '';
		showOnlyAtlanteanStat = false;
	}

	let validImage = true;

	let image = new Image();
</script>

<button
	on:mousemove={handleMouseOver}
	on:mouseleave={handleMouseOut}
	on:click={handleClick}
	class="m-1 w-20 h-20 md:w-24 md:h-24"
	style="border-color: {rarityColors[item.rarity]}; border-width: 1px; background-color: #020202;"
>
	<img
		class="w-full h-full object-contain"
		style="display: {validImage && item.imageId != '' ? 'block' : 'none'};"
		src={item.imageId}
		alt={item.name}
		on:error={() => (validImage = false)}
		on:load={() => (validImage = true)}
	/>
	<h1 style="display:{!validImage || item.imageId == '' ? 'block' : 'none'}; color:white;">
		{item.name || 'None'}
	</h1>

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
	  border-color: {rarityColors[item.rarity]};
	  color: white;
	  top: {mousePosition.y}px; 
	  left: {mousePosition.x + 20}px;
	  z-index : 40
	 
	  
	  
	"
		>
			<h2 class="text-2xl z-40" style="color: white; font-family: Merriweather;">{item.name}</h2>
			<p class="text-xl z-40" style="color: white; font-family: Merriweather;">
				{#if item.subType && item.subType !== 'None'}{item.subType}{/if}
				{item.mainType}
			</p>
			<p class="text-l z-40" style="color: white; font-family: Merriweather;">
				{#if levelRange != ''}Level {levelRange}{/if}
			</p>
			<p class="text-l z-40" style="color: white; font-family: 'Open Sans', sans-serif;">
				{item.legend}
			</p>
			<div class=" items-center text-center z-40">
				<ItemTooltip
					{item}
					{player}
					{slotKey}
					showName={true}
					isItemMenu={true}
					atlanteanAttribute={chosenAtlanteanAttribute}
					{showOnlyAtlanteanStat}
				/>
			</div>
		</div>
	{/if}
</button>
