<script lang="ts">
	import GearButton from '$lib/components/Builders/GearButton.svelte';
	import ItemTooltip from '$lib/components/Builders/ItemTooltip.svelte';
	import { CurrentShipBuild } from '$lib/shipBuilder/ShipClass.js';
	import type { MainShip } from '$lib/utils/itemTypes';
	import { writable } from 'svelte/store';

	export let data;
	let SessionShip = new CurrentShipBuild(data.database);

	let ships = data.database.filter((item) => item.mainType == 'Ship');
	console.log(data.database);

	let ShipName = SessionShip.ship.name;

	function handleShipChange() {
		console.log(ships);
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
	<div class="flex items-center justify-center">
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
				<div class=" m-20 w-80 h-auto p-2 border-2 border-white rounded bg-black bg-opacity-40">
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
