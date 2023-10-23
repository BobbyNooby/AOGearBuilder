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
	} from '$lib/utils/statsStore'; //Store import
	import { fade } from 'svelte/transition';
	import ItemMenu from './ItemMenu.svelte';
	import { playCorrect, playWrong } from '$lib/utils/sound';

	export let category, filterType, sortType; //Props import

	// Button Image Stuff

	const defaultImages = {
		//Default img urls for the buttons

		accessory1: 'https://i.imgur.com/ynJYNoA.jpg',
		accessory1Gem1: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory1Gem2: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory1Gem3: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory1Enchant: 'https://i.imgur.com/PzIWvMv.jpg',
		accessory1Modifier: 'https://i.imgur.com/iKfI8Cp.jpg',

		accessory2: 'https://i.imgur.com/ynJYNoA.jpg',
		accessory2Gem1: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory2Gem2: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory2Gem3: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory2Enchant: 'https://i.imgur.com/PzIWvMv.jpg',
		accessory2Modifier: 'https://i.imgur.com/iKfI8Cp.jpg',

		accessory3: 'https://i.imgur.com/ynJYNoA.jpg',
		accessory3Gem1: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory3Gem2: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory3Gem3: 'https://i.imgur.com/5pGLWmQ.jpg',
		accessory3Enchant: 'https://i.imgur.com/PzIWvMv.jpg',
		accessory3Modifier: 'https://i.imgur.com/iKfI8Cp.jpg',

		chestplate1: 'https://i.imgur.com/Uj7r6Fm.jpg',
		chestplate1Gem1: 'https://i.imgur.com/5pGLWmQ.jpg',
		chestplate1Gem2: 'https://i.imgur.com/5pGLWmQ.jpg',
		chestplate1Gem3: 'https://i.imgur.com/5pGLWmQ.jpg',
		chestplate1Enchant: 'https://i.imgur.com/PzIWvMv.jpg',
		chestplate1Modifier: 'https://i.imgur.com/iKfI8Cp.jpg',

		pants1: 'https://i.imgur.com/U9Z0chG.jpg',
		pants1Gem1: 'https://i.imgur.com/5pGLWmQ.jpg',
		pants1Gem2: 'https://i.imgur.com/5pGLWmQ.jpg',
		pants1Gem3: 'https://i.imgur.com/5pGLWmQ.jpg',
		pants1Enchant: 'https://i.imgur.com/PzIWvMv.jpg',
		pants1Modifier: 'https://i.imgur.com/iKfI8Cp.jpg'
	};

	let buttonImgSrc = defaultImages[category];

	function setButtonImgSrc(value) {
		//Function for setting button image
		buttonImgSrc = value;
	}

	// Menu toggle Stuff
	let menuIsActive = false;

	function menuToggle() {
		menuIsActive = !menuIsActive;
	}

	// Set the button image to default if the gem name is None.
	// I use this method as when item is changed it resets the gems in its row to None
	// The stats change but the button doesnt, so i use this reactive method to set the image to default if the name of the gem button is None.
	// Similar to reacts UseState
	$: {
		if (
			($accessory1Gem1.name === 'None' && category === 'accessory1Gem1') ||
			($accessory1Gem2.name === 'None' && category === 'accessory1Gem2') ||
			($accessory1Gem3.name === 'None' && category === 'accessory1Gem3') ||
			($accessory2Gem1.name === 'None' && category === 'accessory2Gem1') ||
			($accessory2Gem2.name === 'None' && category === 'accessory2Gem2') ||
			($accessory2Gem3.name === 'None' && category === 'accessory2Gem3') ||
			($accessory3Gem1.name === 'None' && category === 'accessory3Gem1') ||
			($accessory3Gem2.name === 'None' && category === 'accessory3Gem2') ||
			($accessory3Gem3.name === 'None' && category === 'accessory3Gem3') ||
			($chestplate1Gem1.name === 'None' && category === 'chestplate1Gem1') ||
			($chestplate1Gem2.name === 'None' && category === 'chestplate1Gem2') ||
			($chestplate1Gem3.name === 'None' && category === 'chestplate1Gem3') ||
			($pants1Gem1.name === 'None' && category === 'pants1Gem1') ||
			($pants1Gem2.name === 'None' && category === 'pants1Gem2') ||
			($pants1Gem3.name === 'None' && category === 'pants1Gem3')
		) {
			buttonImgSrc = defaultImages[category];
		}
	}

	//Check for if the gear has a required gemslots
	//Wont open menu if the gear doesnt meet the condition
	const handleClick = () => {
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
			playWrong();
		} else {
			menuToggle();
			playCorrect();
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<!-- Button to open overlay -->
	<button on:click={handleClick}><img src={buttonImgSrc} alt="{category} Button" /></button>

	<!-- Overlay with item menu -->
	{#if menuIsActive}
		<div
			class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<div>
				<ItemMenu {category} {menuToggle} {setButtonImgSrc} {filterType} {sortType} />
			</div>
		</div>
	{/if}
</div>
