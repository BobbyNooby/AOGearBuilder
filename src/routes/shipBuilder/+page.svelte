<script lang="ts">
	import GearButton from '$lib/components/Builders/GearButton.svelte';
	import ItemTooltip from '$lib/components/Builders/ItemTooltip.svelte';
	import { CurrentShipBuild } from '$lib/shipBuilder/ShipClass.js';
	import { ships } from '$lib/shipBuilder/shipList';
	import type { MainShip } from '$lib/utils/itemTypes';
	import { writable } from 'svelte/store';

	export let data;
	let SessionShip = new CurrentShipBuild(data.database);

	let ShipName = SessionShip.ship.name;

	function handleShipChange() {
		const shipToPick = ships.find((ship) => ship.name === ShipName) as MainShip;

		SessionShip.setShip(shipToPick);
		updateKey();
	}

	const keyStore = writable(false);

	function updateKey() {
		console.log(SessionShip.getShipBuildStats());
		keyStore.set(!$keyStore);
	}
</script>

{#key $keyStore}
	<select bind:value={ShipName} on:change={() => handleShipChange()}>
		{#each ships as ship}
			<option>{ship.name}</option>
		{/each}
	</select>

	{#each ships as ship}
		<p>{ship.name}</p>
	{/each}

	<div class="flex flex-row">
		<div class="wrap-container" style="height: 40rem;">
			{#each Object.keys(SessionShip.slots) as slotKey}
				<div class="flex flex-row">
					{#each SessionShip.slots[slotKey] as ShipPartSlot, i}
						{#if ShipPartSlot.base != null}
							<GearButton
								currentItem={ShipPartSlot.base}
								database={data.database}
								ship={SessionShip}
								{slotKey}
								slotIndex={i}
								shipPartType={'base'}
								updatePage={() => {
									updateKey();
								}}
							/>
						{/if}
						{#if ShipPartSlot.enchant && ShipPartSlot.enchant != null}
							<GearButton
								currentItem={ShipPartSlot.enchant}
								database={data.database}
								ship={SessionShip}
								{slotKey}
								slotIndex={i}
								shipPartType={'enchant'}
								updatePage={() => {
									updateKey();
								}}
							/>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
		<div>
			<ItemTooltip
				fullItem={SessionShip.getShipBuildStats()}
				ship={SessionShip}
				showName={true}
				atlanteanAttribute={''}
				showOnlyAtlanteanStat={false}
				isItemMenu={false}
			></ItemTooltip>
		</div>
	</div>
{/key}

<style>
	.wrap-container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
</style>
