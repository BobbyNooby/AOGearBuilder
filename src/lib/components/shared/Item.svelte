<script>
	// @ts-nocheck

	import {
		validateEntry,
		storeCurrentBuild,
		noModList,
		noModModifiers
	} from '$lib/utils/statsStore';
	import { playCorrect, playWrong } from '$lib/utils/sound.js';
	import { get, writable } from 'svelte/store';
	import { getGemById, getModifierById } from '$lib/utils/getItemById';
	import ItemTooltip from './ItemTooltip.svelte';
	import { isMobile } from '$lib/utils/mobileStore';
	import { fade } from 'svelte/transition';

	export let menuToggle, item, category, currentItem, categoryName, builderType, currentGears; // Props

	//Mouse hover and position detection for tooltip
	let isHovering = false;
	let mousePosition = { x: 0, y: 0 };
	let hoverWidth = writable(300);
	let menuIsActive = false; // Bool for mobile menu

	// Checks if box will overflow and set new position if it will
	// uses element with id menuouter as this is the element that contains the scrolable content
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

	// Called when the hover div is created
	function createdHover() {
		setBoxPositionOverflow();
	}

	function handleMouseOver(event) {
		isHovering = true;
		mousePosition = { x: event.clientX, y: event.clientY };

		setBoxPositionOverflow();
	}

	function handleMouseOut() {
		isHovering = false;
	}

	// Handling stat change depending on category (basically depends on which button you click). Changing accessory resets gems.
	const handleStatChange = () => {
		if (builderType == 'gear') {
			if (['Accessory', 'Chestplate', 'Pants'].includes($currentItem.mainType)) {
				currentItem.set(item);
				if (item.gemNo < 3) {
					//Thx woodyloody B)
					category.gem3.set(getGemById(0));
				}
				if (item.gemNo < 2) {
					category.gem2.set(getGemById(0));
				}
				if (item.gemNo < 1) {
					category.gem1.set(getGemById(0));
				}
			} else {
				currentItem.set(item);
			}
			if (noModList.includes(item.name) && noModModifiers.includes(get(category.modifier).name)) {
				category.modifier.set(getModifierById(0));
			}
			storeCurrentBuild();
			console.log(categoryName);
		} else if (builderType == 'ship') {
			currentItem.set(item);
			storeCurrentBuild();
		}
	};

	function handleClick() {
		if (builderType == 'gear') {
			if (
				// Dont conditions that dont allow item to be clicked
				// EG : item is same as itself, item is same as another item on the list, item of amulet subtype is clicked even though theres another amulet, same condition as amulet but for helmets.
				item.name != 'None' &&
				!validateEntry(item, categoryName, currentItem)
			) {
				playWrong();
			} else {
				goThrough();
			}
		} else if (builderType == 'ship') {
			if (item.name != 'None' && !validateEntry(item, categoryName, currentItem)) {
				playWrong();
			} else {
				goThrough();
			}
		}
	}

	function goThrough() {
		if (!$isMobile) {
			handleStatChange();
			menuToggle();
			playCorrect();
		} else if ($isMobile) {
			playCorrect();
			menuIsActive = true;
		}
	}

	let chosenAtlanteanAttribute = '';
	let showOnlyAtlanteanStat = false;

	modifierCalcs: if (item.name == 'Atlantean Essence') {
		const attributes = [
			'power',
			'defense',
			'agility',
			'attackSpeed',
			'attackSize',
			'intensity',
			'insanity',
			'drawback',
			'warding'
		];

		const atlantenOrder = ['power', 'defense', 'attackSize', 'attackSpeed', 'agility', 'intensity'];

		const tempItem = {
			power: 0,
			defense: 0,
			agility: 0,
			attackSize: 0,
			attackSpeed: 0,
			intensity: 0,
			insanity: 0,
			drawback: 0,
			warding: 0
		};
		console.log(get(category['base']).defense);
		for (const attribute of attributes) {
			// Run through each stat and calculate their value
			tempItem[attribute] =
				get(category['base'])[attribute] +
				get(category['gem1'])[attribute] +
				get(category['gem2'])[attribute] +
				get(category['gem3'])[attribute] +
				(attribute === 'warding' || attribute === 'insanity' || attribute === 'drawback' // Test if the attribute is any of these 3
					? get(category['enchant'])[attribute] // Add value directly if it is
					: Math.floor(
							get(category['enchant'])[attribute] * (get(category['base'])['maxLevel'] / 10)
					  )); // Else multiply by maxLevel / 10
		}

		//Calculations for Atlantean
		for (const currentAttribute of atlantenOrder) {
			console.log(currentAttribute);
			if (tempItem[currentAttribute] == 0) {
				chosenAtlanteanAttribute = currentAttribute;
				showOnlyAtlanteanStat = true;
				break modifierCalcs;
			}
		}
		// Only happens when all of them have a value so hence the loop around
		chosenAtlanteanAttribute = 'power';
		showOnlyAtlanteanStat = true;
	} else {
		chosenAtlanteanAttribute = undefined;
		showOnlyAtlanteanStat = false;
	}
</script>

{#if !$isMobile}
	<button
		on:click={handleClick}
		on:mousemove={handleMouseOver}
		on:mouseleave={handleMouseOut}
		class="z-30"
	>
		<img src={item.imageId} alt={item.name} />
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
	  border-color: {item.rarityColor};
	  color: white;
	  top: {mousePosition.y}px; 
	  left: {mousePosition.x + 20}px;
	  z-index : 40
	 
	  
	  
	"
			>
				<h2 class="text-2xl z-40" style="color: white; font-family: Merriweather;">{item.name}</h2>
				<p class="text-xl z-40" style="color: white; font-family: Merriweather;">
					{#if item.maxLevel > 0}
						Level {item.maxLevel}
					{/if}{item.mainType}
				</p>
				<p class="text-l z-40" style="color: white; font-family: 'Open Sans', sans-serif;">
					{item.legend}
				</p>
				<div class=" items-center text-center z-40">
					<ItemTooltip
						{item}
						showName={true}
						atlanteanAttribute={chosenAtlanteanAttribute}
						{showOnlyAtlanteanStat}
					/>
				</div>
			</div>
		{/if}
	</button>
{/if}

{#if $isMobile}
	<button on:click={handleClick} class="z-20">
		<img src={item.imageId} alt={item.name} />
		{#if menuIsActive}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="z-30 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col justify-center items-center"
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
				on:click={() => {
					event.stopPropagation();
				}}
			>
				<div class="space-y-2 flex flex-col justify-center items-center z-40">
					<img src={item.imageId} alt={item.name} />
					<h2 class="text-2xl z-40" style="color: white; font-family: Merriweather;">
						{item.name}
					</h2>
					<p class="text-xl z-40" style="color: white; font-family: Merriweather;">
						{#if item.maxLevel > 0}
							Level {item.maxLevel}
						{/if}{item.mainType}
					</p>
					<p class="text-l z-40" style="color: white; font-family: 'Open Sans', sans-serif;">
						{item.legend}
					</p>
					<div class=" items-center text-center z-40">
						<ItemTooltip
							{item}
							showName={true}
							atlanteanAttribute={chosenAtlanteanAttribute}
							{showOnlyAtlanteanStat}
						/>
					</div>
					<div class="flex flex-row space-x-2">
						<button
							class="bg-green-500 border border-white text-white font-bold text-lg py-2 px-4 w-44"
							style="font-family: Merriweather;"
							on:click={() => {
								handleStatChange();
								menuIsActive = false;
								menuToggle();
								playCorrect();
							}}>Select</button
						>

						<button
							class="bg-red-600 border border-white text-white font-bold text-lg py-2 px-4 w-44 z-"
							style="font-family: Merriweather;"
							on:click={() => {
								menuIsActive = false;
								playCorrect();
							}}>Cancel</button
						>
					</div>
				</div>
			</div>
		{/if}
	</button>
{/if}
