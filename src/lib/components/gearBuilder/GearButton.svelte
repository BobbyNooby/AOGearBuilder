<script>
	// @ts-nocheck

	import {
		accessory1,
		accessory1Gem1,
		accessory1Gem2,
		accessory1Gem3,
		accessory1Enchant,
		accessory1Modifier,
		accessory2,
		accessory2Gem1,
		accessory2Gem2,
		accessory2Gem3,
		accessory2Enchant,
		accessory2Modifier,
		accessory3,
		accessory3Gem1,
		accessory3Gem2,
		accessory3Gem3,
		accessory3Enchant,
		accessory3Modifier,
		chestplate1,
		chestplate1Gem1,
		chestplate1Gem2,
		chestplate1Gem3,
		chestplate1Enchant,
		chestplate1Modifier,
		pants1,
		pants1Gem1,
		pants1Gem2,
		pants1Gem3,
		pants1Enchant,
		pants1Modifier
	} from '$lib/utils/statsStore'; // Store import
	import { fade } from 'svelte/transition';
	import ItemMenu from './ItemMenu.svelte';
	import { playCorrect, playWrong } from '$lib/utils/sound.js';
	import { isMobile } from '$lib/utils/mobileStore';

	export let category, filterType, sortType; // Props import

	let imageSrc = '';

	// Used to identify if a gem slot is valid and change opacity of item image
	let validGems = validateGem();

	// Switched to this reactive method of showing the image Src to prep for loading and saving builds. Removes use of a setButtonImg function.
	$: {
		switch (category) {
			case 'accessory1':
				imageSrc = $accessory1.imageId;
				break;
			case 'accessory1Gem1':
				imageSrc = $accessory1Gem1.imageId;
				break;
			case 'accessory1Gem2':
				imageSrc = $accessory1Gem2.imageId;
				break;
			case 'accessory1Gem3':
				imageSrc = $accessory1Gem3.imageId;
				break;
			case 'accessory1Enchant':
				imageSrc = $accessory1Enchant.imageId;
				break;
			case 'accessory1Modifier':
				imageSrc = $accessory1Modifier.imageId;
				break;
			case 'accessory2':
				imageSrc = $accessory2.imageId;
				break;
			case 'accessory2Gem1':
				imageSrc = $accessory2Gem1.imageId;
				break;
			case 'accessory2Gem2':
				imageSrc = $accessory2Gem2.imageId;
				break;
			case 'accessory2Gem3':
				imageSrc = $accessory2Gem3.imageId;
				break;
			case 'accessory2Enchant':
				imageSrc = $accessory2Enchant.imageId;
				break;
			case 'accessory2Modifier':
				imageSrc = $accessory2Modifier.imageId;
				break;
			case 'accessory3':
				imageSrc = $accessory3.imageId;
				break;
			case 'accessory3Gem1':
				imageSrc = $accessory3Gem1.imageId;
				break;
			case 'accessory3Gem2':
				imageSrc = $accessory3Gem2.imageId;
				break;
			case 'accessory3Gem3':
				imageSrc = $accessory3Gem3.imageId;
				break;
			case 'accessory3Enchant':
				imageSrc = $accessory3Enchant.imageId;
				break;
			case 'accessory3Modifier':
				imageSrc = $accessory3Modifier.imageId;
				break;
			case 'chestplate1':
				imageSrc = $chestplate1.imageId;
				break;
			case 'chestplate1Gem1':
				imageSrc = $chestplate1Gem1.imageId;
				break;
			case 'chestplate1Gem2':
				imageSrc = $chestplate1Gem2.imageId;
				break;
			case 'chestplate1Gem3':
				imageSrc = $chestplate1Gem3.imageId;
				break;
			case 'chestplate1Enchant':
				imageSrc = $chestplate1Enchant.imageId;
				break;
			case 'chestplate1Modifier':
				imageSrc = $chestplate1Modifier.imageId;
				break;
			case 'pants1':
				imageSrc = $pants1.imageId;
				break;
			case 'pants1Gem1':
				imageSrc = $pants1Gem1.imageId;
				break;
			case 'pants1Gem2':
				imageSrc = $pants1Gem2.imageId;
				break;
			case 'pants1Gem3':
				imageSrc = $pants1Gem3.imageId;
				break;
			case 'pants1Enchant':
				imageSrc = $pants1Enchant.imageId;
				break;
			case 'pants1Modifier':
				imageSrc = $pants1Modifier.imageId;
				break;
			default:
				imageSrc = 'assets/images/unknown.jpg';
				break;
		}

		// Checks if gem slot is vaild on item refresh
		validGems = validateGem();
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
			(category == 'accessory1Gem1' && $accessory1.gemNo < 1) ||
			(category == 'accessory1Gem2' && $accessory1.gemNo < 2) ||
			(category == 'accessory1Gem3' && $accessory1.gemNo < 3) ||
			(category == 'accessory2Gem1' && $accessory2.gemNo < 1) ||
			(category == 'accessory2Gem2' && $accessory2.gemNo < 2) ||
			(category == 'accessory2Gem3' && $accessory2.gemNo < 3) ||
			(category == 'accessory3Gem1' && $accessory3.gemNo < 1) ||
			(category == 'accessory3Gem2' && $accessory3.gemNo < 2) ||
			(category == 'accessory3Gem3' && $accessory3.gemNo < 3) ||
			(category == 'chestplate1Gem1' && $chestplate1.gemNo < 1) ||
			(category == 'chestplate1Gem2' && $chestplate1.gemNo < 2) ||
			(category == 'chestplate1Gem3' && $chestplate1.gemNo < 3) ||
			(category == 'pants1Gem1' && $pants1.gemNo < 1) ||
			(category == 'pants1Gem2' && $pants1.gemNo < 2) ||
			(category == 'pants1Gem3' && $pants1.gemNo < 3)
		) {
			return false;
		} else {
			return true;
		}
	}

	// Validates if gem should be loaded by item having enough slots or if no item is selected
	function validateGem() {
		/*

		return: returns false if gem is not value and item is selected, returns true if gem is valid or no item is selected

		*/
		if (
			((category.startsWith('accessory1') && $accessory1.name != 'None') ||
				(category.startsWith('accessory2') && $accessory2.name != 'None') ||
				(category.startsWith('accessory3') && $accessory3.name != 'None') ||
				(category.startsWith('chestplate1') && $chestplate1.name != 'None') ||
				(category.startsWith('pants1') && $pants1.name != 'None')) &&
			!validateGemNo()
		) {
			return false;
		} else {
			return true;
		}
	}

	// Check for required gem slots and open the menu
	function handleClick() {
		if (!validateGemNo()) {
			playWrong();
		} else {
			menuToggle();
			playCorrect();
		}
	}
</script>

{#if validGems || !$isMobile}
	<div>
		<!-- Button to open overlay -->
		<button on:click={handleClick} disabled={!validGems}
			><img
				src={imageSrc}
				alt="{category} Button"
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
					<ItemMenu {category} {menuToggle} {filterType} {sortType} />
				</div>
			</div>
		{/if}
	</div>
{/if}
