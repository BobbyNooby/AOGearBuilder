<script lang="ts">
	import type { Player } from '$lib/gearBuilder/Player';
	import type { AnyItemDetails } from '$lib/types/itemTypes';
	import Menu from './Menu.svelte';
	import Item from './Item.svelte';

	let {
		database,
		player,
		slotKey,
		gemIndex = undefined,
		item,
		updateState
	}: {
		database: AnyItemDetails[];
		player?: Player;
		slotKey: keyof typeof Player.prototype.build.slots;
		gemIndex?: number;
		item: AnyItemDetails;
		updateState: () => void;
	} = $props();

	let menuToggled = $state(false);

	function openMenu() {
		menuToggled = true;
	}
	function closeMenu() {
		menuToggled = false;
	}
</script>

<button class="flex aspect-square h-24 w-24" onclick={openMenu}>
	<Item {item} />
</button>

{#if menuToggled}
	<Menu {database} {player} {item} {slotKey} {gemIndex} {closeMenu} {updateState} />
{/if}
