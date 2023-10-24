<script>
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
	} from '$lib/utils/statsStore';
	import { playCorrect, playWrong } from '$lib/utils/sound';
	import { baseGem } from '$lib/utils/baseGem';
	import Itemstat from './Itemstat.svelte';
	import { writable } from 'svelte/store';

	export let menuToggle, item, category, setButtonImgSrc; // Props

	//Mouse hover and position detection for tooltip
	let isHovering = false;
	let mousePosition = { x: 0, y: 0 };
	let hoverWidth = writable(300);

	function handleMouseOver(event) {
		isHovering = true;
		mousePosition = { x: event.clientX, y: event.clientY };

		if (mousePosition.x + $hoverWidth > window.innerWidth) {
			mousePosition.x = mousePosition.x - 40 - $hoverWidth;
		}
	}

	function handleMouseOut() {
		isHovering = false;
	}

	// Handling stat change depending on category (basically depends on which button you click). Changing accessory resets gems.
	const handleStatChange = (category) => {
		switch (category) {
			case 'accessory1':
				accessory1.set(item);
				accessory1Gem1.set(baseGem);
				accessory1Gem2.set(baseGem);
				accessory1Gem3.set(baseGem);
				menuToggle();
				break;

			case 'accessory1Gem1':
				accessory1Gem1.set(item);
				menuToggle();
				break;

			case 'accessory1Gem2':
				accessory1Gem2.set(item);
				menuToggle();
				break;

			case 'accessory1Gem3':
				accessory1Gem3.set(item);
				menuToggle();
				break;

			case 'accessory1Enchant':
				accessory1Enchant.set(item);
				menuToggle();
				break;

			case 'accessory1Modifier':
				accessory1Modifier.set(item);
				menuToggle();
				break;

			case 'accessory2':
				accessory2.set(item);
				accessory2Gem1.set(baseGem);
				accessory2Gem2.set(baseGem);
				accessory2Gem3.set(baseGem);
				menuToggle();
				break;

			case 'accessory2Gem1':
				accessory2Gem1.set(item);
				menuToggle();
				break;

			case 'accessory2Gem2':
				accessory2Gem2.set(item);
				menuToggle();
				break;

			case 'accessory2Gem3':
				accessory2Gem3.set(item);
				menuToggle();
				break;

			case 'accessory2Enchant':
				accessory2Enchant.set(item);
				menuToggle();
				break;

			case 'accessory2Modifier':
				accessory2Modifier.set(item);
				menuToggle();
				break;

			case 'accessory3':
				accessory3.set(item);
				accessory3Gem1.set(baseGem);
				accessory3Gem2.set(baseGem);
				accessory3Gem3.set(baseGem);
				menuToggle();
				break;

			case 'accessory3Gem1':
				accessory3Gem1.set(item);
				menuToggle();
				break;

			case 'accessory3Gem2':
				accessory3Gem2.set(item);
				menuToggle();
				break;

			case 'accessory3Gem3':
				accessory3Gem3.set(item);
				menuToggle();
				break;

			case 'accessory3Enchant':
				accessory3Enchant.set(item);
				menuToggle();
				break;

			case 'accessory3Modifier':
				accessory3Modifier.set(item);
				menuToggle();
				break;

			case 'chestplate1':
				chestplate1.set(item);
				chestplate1Gem1.set(baseGem);
				chestplate1Gem2.set(baseGem);
				chestplate1Gem3.set(baseGem);
				menuToggle();
				break;

			case 'chestplate1Gem1':
				chestplate1Gem1.set(item);
				menuToggle();
				break;

			case 'chestplate1Gem2':
				chestplate1Gem2.set(item);
				menuToggle();
				break;

			case 'chestplate1Gem3':
				chestplate1Gem3.set(item);
				menuToggle();
				break;

			case 'chestplate1Enchant':
				chestplate1Enchant.set(item);
				menuToggle();
				break;

			case 'chestplate1Modifier':
				chestplate1Modifier.set(item);
				menuToggle();
				break;

			case 'pants1':
				pants1.set(item);
				pants1Gem1.set(baseGem);
				pants1Gem2.set(baseGem);
				pants1Gem3.set(baseGem);
				menuToggle();
				break;

			case 'pants1Gem1':
				pants1Gem1.set(item);
				menuToggle();
				break;

			case 'pants1Gem2':
				pants1Gem2.set(item);
				menuToggle();
				break;

			case 'pants1Gem3':
				pants1Gem3.set(item);
				menuToggle();
				break;

			case 'pants1Enchant':
				pants1Enchant.set(item);
				menuToggle();
				break;

			case 'pants1Modifier':
				pants1Modifier.set(item);
				menuToggle();
				break;

			default:
				menuToggle();
				break;
		}
	};

	function handleClick() {
		if (
			// Dont conditions that dont allow item to be clicked
			// EG : item is same as itself, item is same as another item on the list, item of amulet subtype is clicked even though theres another amulet, same condition as amulet but for helmets.
			item.name != 'None' &&
			(item.name == $accessory1.name ||
				item.name == $accessory2.name ||
				item.name == $accessory3.name ||
				item.name == $chestplate1.name ||
				item.name == $pants1.name ||
				(category == 'accessory1Enchant' && item.name == $accessory1Enchant.name) ||
				(category == 'accessory2Enchant' && item.name == $accessory2Enchant.name) ||
				(category == 'accessory3Enchant' && item.name == $accessory3Enchant.name) ||
				(category == 'chestplate1Enchant' && item.name == $chestplate1Enchant.name) ||
				(category == 'pants1Enchant' && item.name == $pants1Enchant.name) ||
				(category == 'accessory1' &&
					item.subType == 'Amulet' &&
					($accessory2.subType == 'Amulet' || $accessory3.subType == 'Amulet')) ||
				(category == 'accessory2' &&
					item.subType == 'Amulet' &&
					($accessory1.subType == 'Amulet' || $accessory3.subType == 'Amulet')) ||
				(category == 'accessory3' &&
					item.subType == 'Amulet' &&
					($accessory1.subType == 'Amulet' || $accessory2.subType == 'Amulet')) ||
				(category == 'accessory1' &&
					item.subType == 'Helmet' &&
					($accessory2.subType == 'Helmet' || $accessory3.subType == 'Helmet')) ||
				(category == 'accessory2' &&
					item.subType == 'Helmet' &&
					($accessory1.subType == 'Helmet' || $accessory3.subType == 'Helmet')) ||
				(category == 'accessory3' &&
					item.subType == 'Helmet' &&
					($accessory1.subType == 'Helmet' || $accessory2.subType == 'Helmet')))
		) {
			playWrong();
		} else {
			handleStatChange(category);
			console.log(menuToggle());
			playCorrect();
			menuToggle();
		}
	}
</script>

<button
	on:click={handleClick}
	on:mousemove={handleMouseOver}
	on:mouseleave={handleMouseOut}
	class="z-30"
>
	<img src={item.imageId} alt={item.name} />
	{#if isHovering}
		<div
			class="z-40"
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
				<Itemstat {item} />
			</div>
		</div>
	{/if}
</button>
