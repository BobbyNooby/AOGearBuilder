<script lang="ts">
	import { CurrentBuild } from '$lib/gearBuilder/CurrentBuild';
	import { ArmorSlot } from '$lib/gearBuilder/ArmorSlot';
	import { fade } from 'svelte/transition';
	import type {
		ArmorItemData,
		EnchantItemData,
		GemItemData,
		ModifierItemData
	} from '$lib/itemTypes';
	import type { Player } from '$lib/playerClasses';
	import Item from './Item.svelte';
	import { rarityColors } from '$lib/dataConstants';
	import { writable } from 'svelte/store';
	import PlayerStatMenu from './PlayerStatMenu.svelte';

	export let CurrentItem: ArmorItemData | GemItemData | EnchantItemData | ModifierItemData | any,
		Database: any,
		SlotKey: string,
		Player: Player,
		gemIndex: boolean | number,
		updatePage: () => void;

	let menuBool = false;
	let isActive = true;

	function toggleMenu(): void {
		menuBool = !menuBool;
	}

	// Have to do this to make the item able to be updated

	function handleClick() {
		toggleMenu();
	}

	let ItemMenuData = Database[CurrentItem.mainType];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<!-- Button -->
<div
	class="border-1 w-28 h-28 m-2"
	style="border-color: {rarityColors[CurrentItem.rarity]};  ;"
	on:click={handleClick}
>
	<img class="w-full h-full object-contain" alt={CurrentItem.name} src={CurrentItem.imageId} />
</div>
<!-- <p>{reactiveTest}</p> -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<!-- Item menu -->
{#if menuBool}
	<div
		id="menuouter"
		class="fixed inset-0 bg-black bg-opacity-70 z-10 flex flex-col items-center"
		transition:fade={{ duration: 69 }}
	>
		<button
			on:click={() => {
				toggleMenu();
			}}
			class=" my-4 w-20 h-20 bg-black border rounded border-white text-white font-bold text-lg py-2 px-4 items-center relative"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				fill="currentColor"
				class="bi bi-x-lg"
				viewBox="0 0 16 16"
				style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
			>
				<path
					d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
				/>
			</svg>
		</button>

		<div class="flex-wrap flex mx-72">
			{#each ItemMenuData as item}
				<Item Item={item} {SlotKey} {gemIndex} {Player} {toggleMenu} {updatePage} />
			{/each}
		</div>
	</div>
{/if}
