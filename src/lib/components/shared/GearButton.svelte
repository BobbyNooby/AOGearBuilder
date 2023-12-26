<script>
	// @ts-nocheck

	import { fade } from 'svelte/transition';
	import ItemMenu from './ItemMenu.svelte';
	import { playCorrect, playWrong } from '$lib/utils/sound.js';
	import { isMobile } from '$lib/utils/mobileStore';
	import { currentShip } from '$lib/utils/shipStatsStore';

	export let category, currentItem, categoryName, currentGears, currentItemType, builderType; // Props import

	let baseItem = category['base'];

	// Used to identify if a gem slot is valid and change opacity of item image
	let validGems = validateGem();
	let visibleShipPart = validateShipPartVisibility(category, currentItemType);

	// Switched to this reactive method of showing the image Src to prep for loading and saving builds. Removes use of a setButtonImg function.
	$: {
		console.log($baseItem, $currentShip); // Dunno why i have to console log this for the function to work >.>

		validGems = validateGem();
		visibleShipPart = validateShipPartVisibility(category, currentItemType);
	}

	// Menu toggle Stuff
	let menuIsActive = false;

	function menuToggle() {
		menuIsActive = !menuIsActive;
	}

	// Validates if item has enough gem slots
	function validateGemNo() {
		/*

		return: returns false if the gem is not valid, returns true if gem is valid

		*/
		if (
			(currentItemType === 'gem1' && $baseItem.gemNo < 1) ||
			(currentItemType === 'gem2' && $baseItem.gemNo < 2) ||
			(currentItemType === 'gem3' && $baseItem.gemNo < 3)
		) {
			return false;
		} else {
			return true;
		}
	}

	// Validates if gem should be loaded by item having enough slots or if no item is selected
	function validateGem() {
		if (builderType == 'gear') {
			/*

		return: returns false if gem is not value and item is selected, returns true if gem is valid or no item is selected

		*/
			if ($baseItem.name != 'None' && !validateGemNo()) {
				return false;
			} else {
				return true;
			}
		}
	}

	function validateShipPartVisibility() {
		if (
			(categoryName == 'hull' && $currentShip.hullArmorSlot < 1) ||
			(currentItemType == 'quartermaster1' && $currentShip.quarterMasterSlot < 1) ||
			(currentItemType == 'quartermaster2' && $currentShip.quarterMasterSlot < 2) ||
			(currentItemType == 'cannon' && $currentShip.cannonSlot < 1) ||
			(currentItemType == 'siegeWeapon' && $currentShip.siegeWeaponSlot < 1) ||
			(currentItemType == 'shipCrew1' && $currentShip.shipCrewSlot < 1) ||
			(currentItemType == 'deckhand1' && $currentShip.deckhandSlot < 1) ||
			(currentItemType == 'deckhand2' && $currentShip.deckhandSlot < 2) ||
			(currentItemType == 'deckhand3' && $currentShip.deckhandSlot < 3) ||
			(currentItemType == 'deckhand4' && $currentShip.deckhandSlot < 4) ||
			(categoryName == 'sails' && $currentShip.sailMaterialSlot < 1) ||
			(categoryName == 'rams' && $currentShip.ramSlot < 1)
		) {
			return false;
		} else {
			return true;
		}
	}

	// Check for required gem slots and open the menu
	function handleClick() {
		if (builderType == 'gear') {
			if (!validateGemNo()) {
				playWrong();
			} else {
				menuToggle();
				playCorrect();
			}
		} else if (builderType == 'ship') {
			menuToggle();
			playCorrect();
		}
	}
</script>

{#if builderType == 'gear'}
	{#if validGems || !$isMobile}
		<div>
			<!-- Button to open overlay -->
			<button on:click={handleClick} disabled={!validGems}
				><img
					src={$currentItem.imageId}
					alt="{$currentItem.mainType} Button"
					style="opacity: {validGems ? '1' : '0'}"
				/></button
			>

			<!-- Overlay with item menu -->
			{#if menuIsActive}
				<div
					class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
					id="menuouter"
					in:fade={{ duration: 100 }}
					out:fade={{ duration: 100 }}
				>
					<div>
						<ItemMenu
							{category}
							{menuToggle}
							{currentItem}
							{categoryName}
							{currentGears}
							{builderType}
						/>
					</div>
				</div>
			{/if}
		</div>
	{/if}
{/if}

{#if builderType == 'ship'}
	{#if visibleShipPart}
		<div>
			<!-- Button to open overlay -->
			<button on:click={handleClick} disabled={!visibleShipPart}
				><img
					src={$currentItem.imageId}
					alt="{$currentItem.mainType} Button"
					style="opacity: {visibleShipPart ? '1' : '0'}"
				/></button
			>

			<!-- Overlay with item menu -->
			{#if menuIsActive}
				<div
					class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
					id="menuouter"
					in:fade={{ duration: 100 }}
					out:fade={{ duration: 100 }}
				>
					<div>
						<ItemMenu
							{category}
							{menuToggle}
							{currentItem}
							{categoryName}
							{currentGears}
							{builderType}
						/>
					</div>
				</div>
			{/if}
		</div>
	{/if}
{/if}
