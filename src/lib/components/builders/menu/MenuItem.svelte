<script lang="ts">
	import type { Player } from '$lib/gearBuilder/Player';
	import type { AnyItemDetails, GearStats } from '$lib/types/itemTypes';
	import { consoleBob } from '$lib/utils';
	import { writable } from 'svelte/store';
	import Item from './Item.svelte';
	import ItemTooltip from './ItemTooltip.svelte';

	let {
		player,
		slotKey,
		gemIndex,
		item,
		closeMenu,
		updateState
	}: {
		player?: Player;
		slotKey: keyof typeof Player.prototype.build.slots;
		gemIndex?: number;
		item: AnyItemDetails;
		closeMenu: () => void;
		updateState: () => void;
	} = $props();

	function handleClick() {
		if (player) {
			if (player.build.setGear(item, slotKey, gemIndex)) {
				consoleBob(item);
				updateState();
				closeMenu();
			}
		}
	}

	let isHovering = $state(false);
	let mousePosition = $state({ x: 0, y: 0 });
	let hoverWidth = $state(300);

	function handleMouseOver(event: MouseEvent) {
		isHovering = true;
		mousePosition = { x: event.clientX, y: event.clientY };
	}

	function handleMouseOut(event: MouseEvent) {
		isHovering = false;
	}

	function setBoxPositionOverflow() {
		if (mousePosition.x + hoverWidth + 20 >= document.getElementById('menuouter').clientWidth) {
			if (document.getElementById('menuouter') != null) {
				mousePosition.x =
					mousePosition.x - 40 - hoverWidth + document.getElementById('menuouter').scrollLeft;
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

	function handleBlur() {
		isHovering = false;
	}

	let chosenAtlanteanAttribute: string = $state('');
	let showOnlyAtlanteanStat = $state(false);

	//Modifier calculations
	if (player) {
		modifierCalcs: if (item.name == 'Atlantean Essence') {
			const atlantenOrder = [
				'power',
				'defense',
				'attackSize',
				'attackSpeed',
				'agility',
				'intensity'
			];

			let preAtlanteanArmor = player.build.slots[slotKey].getSlotStats(true);

			//Calculations for Atlantean
			for (const currentAttribute of atlantenOrder as Array<keyof GearStats>) {
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
	}

	let levelRangeString = '';
	if (player) {
		if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
			const minLevel = Math.min(...item.statsPerLevel.map((statPerLevel) => statPerLevel.level));
			const maxLevel = Math.max(...item.statsPerLevel.map((statPerLevel) => statPerLevel.level));
			levelRangeString = `${minLevel} - ${maxLevel}`;
		}
	}
</script>

<button
	class="aspect-square h-24 w-24"
	onclick={handleClick}
	onmousemove={handleMouseOver}
	onmouseout={handleMouseOut}
	onblur={handleBlur}
>
	<Item {item} />
</button>

{#if isHovering}
	<ItemTooltip
		{levelRangeString}
		{player}
		{slotKey}
		{item}
		{createdHover}
		{hoverWidth}
		{mousePosition}
		atlanteanAttribute={chosenAtlanteanAttribute}
		{showOnlyAtlanteanStat}
	/>
{/if}
