<script lang="ts">
	import type { Player } from '$lib/gearBuilder/Player';
	import type { AnyItemDetails } from '$lib/types/itemTypes';
	import { fade } from 'svelte/transition';
	import MenuItem from './MenuItem.svelte';
	import type { PlayerBuildSlot } from '$lib/gearBuilder/PlayerBuildSlot';
	import type { AOTConfig } from '$lib/types/utilTypes';

	let {
		database,
		config,
		player,
		slotKey,
		gemIndex,
		item,
		closeMenu,
		updateState
	}: {
		database: AnyItemDetails[];
		config: AOTConfig;
		player?: Player;
		slotKey: keyof typeof Player.prototype.build.slots;
		gemIndex?: number;
		item: AnyItemDetails;
		closeMenu: () => void;
		updateState: () => void;
	} = $props();

	let itemMainType = item.mainType;
	let filteredDatabse = database.filter(
		(i) =>
			i.mainType === itemMainType &&
			player?.build.validateItem(i, slotKey) === true &&
			i.name !== 'None'
	);
	let noneItem = database.find(
		(i) => i.name === 'None' && i.mainType === itemMainType
	) as AnyItemDetails;
</script>

<div
	id="menuouter"
	class="fixed inset-0 z-20 flex flex-col items-center overflow-y-auto bg-black bg-opacity-70"
	transition:fade={{ duration: 69 }}
>
	<button
		aria-label="Close menu"
		onclick={() => {
			closeMenu();
		}}
	>
		<div
			class=" relative my-4 h-24 w-24 items-center rounded border border-white bg-black object-contain text-lg font-bold text-white"
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
		</div>
	</button>

	<!-- Items menu -->
	<div class="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
		<MenuItem {config} item={noneItem} {player} {slotKey} {closeMenu} {gemIndex} {updateState} />
		{#each filteredDatabse as item}
			<MenuItem {config} {item} {player} {slotKey} {closeMenu} {gemIndex} {updateState} />
		{/each}
	</div>
</div>
