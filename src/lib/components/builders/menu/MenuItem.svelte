<script lang="ts">
	import TooltipTrigger from '$lib/components/ui/TooltipTrigger.svelte';
	import type { Player } from '$lib/gearBuilder/Player';
	import type { AnyItemDetails, GearStats } from '$lib/types/itemTypes';
	import { consoleBob } from '$lib/utils';
	import { onMount } from 'svelte';
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
			if (item.name != 'None') {
				const minLevel = Math.min(...item.statsPerLevel.map((statPerLevel) => statPerLevel.level));
				const maxLevel = Math.max(...item.statsPerLevel.map((statPerLevel) => statPerLevel.level));
				levelRangeString = `${minLevel} - ${maxLevel}`;
			}
		}
	}

	let container: HTMLElement = $state(document.getElementById('menuouter')!);
	onMount(() => {
		container = document.getElementById('menuouter')!;
	});
</script>

{#snippet MenuItem()}
	<button onclick={handleClick} class="aspect-square h-24 w-24">
		<Item {item} />
	</button>
{/snippet}

{#snippet ItemTooltipSnippet()}
	<ItemTooltip
		{levelRangeString}
		{player}
		{slotKey}
		{item}
		atlanteanAttribute={chosenAtlanteanAttribute}
		{showOnlyAtlanteanStat}
	/>
{/snippet}

<TooltipTrigger
	containerElement={container}
	triggerSnippet={MenuItem}
	tooltipContent={ItemTooltipSnippet}
	cursorOffset={{ x: 20, y: 0 }}
	tooltipWidth={300}
/>
