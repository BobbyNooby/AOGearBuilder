<script lang="ts">
	import BuildLoadButton from '$lib/components/builders/BuildLoadButton.svelte';
	import BuildSaveButton from '$lib/components/builders/BuildSaveButton.svelte';
	import BuildsOverrideButton from '$lib/components/builders/BuildsOverrideButton.svelte';
	import GearButton from '$lib/components/Builders/GearButton.svelte';
	import ItemTooltip from '$lib/components/Builders/ItemTooltip.svelte';
	import RandomButton from '$lib/components/builders/RandomButton.svelte';
	import BlackButton from '$lib/components/misc/BlackButton.svelte';
	import { CurrentShipBuild } from '$lib/shipBuilder/ShipClass.js';
	import {
		currentShipBuildCode,
		getBuildFromLocalStorage,
		storeBuildToLocalStorage
	} from '$lib/utils/buildSavingUtils.js';
	import type { MainShip } from '$lib/utils/itemTypes';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';

	export let data;
	let SessionShip = new CurrentShipBuild(data.database);

	let ships = data.database.filter((item) => item.mainType == 'Ship');
	console.log(data.database);

	let ShipName = SessionShip.ship.name;

	function handleShipChange() {
		console.log(ships);
		const shipToPick = ships.find((ship) => ship.name === ShipName) as MainShip;

		SessionShip.setShip(shipToPick);
		updatePage();
	}

	const keyStore = writable(false);

	function loadHash() {
		if (window.location.hash.substring(1) !== '') {
			SessionShip.loadBuildCode(data.database, window.location.hash.substring(1));
			history.replaceState({}, document.title, window.location.href.split('#')[0]);
		}
	}

	function updatePage() {
		currentShipBuildCode.set(SessionShip.getBuildCode());

		storeBuildToLocalStorage(get(currentShipBuildCode), 'shipBuild');
		ShipName = SessionShip.ship.name;
		keyStore.update((value: boolean) => !value);
	}

	onMount(() => {
		SessionShip.loadBuildCode(data.database, getBuildFromLocalStorage('shipBuild'));
		loadHash();
		updatePage();
	});
</script>

{#key $keyStore}
	<select bind:value={ShipName} on:change={() => handleShipChange()}>
		{#each ships as ship}
			<option>{ship.name}</option>
		{/each}
	</select>
	<div class="flex flex-col items-center justify-center">
		<div class="flex flex-row space-x-2 my-1">
			<BlackButton
				parentFunction={async () => {
					let code = SessionShip.getBuildCode();
					await navigator.clipboard.writeText(code);
				}}
				parentText={'Get Build Code'}
			></BlackButton>
			<BlackButton
				parentFunction={async () => {
					let inputString = await navigator.clipboard.readText();
					SessionShip.loadBuildCode(data.database, inputString);
					updatePage();
				}}
				parentText={'Load Build Code'}
			></BlackButton>
			<BlackButton
				parentFunction={async () => {
					let code =
						location.origin +
						location.pathname +
						(location.search ? location.search : '') +
						'#' +
						SessionShip.getBuildCode();

					// copy text to clipboard
					await navigator.clipboard.writeText(code);
				}}
				parentText={'Share Build Code'}
			></BlackButton>
		</div>
		<div class="flex flex-row space-x-2 my-1">
			<BuildSaveButton type={'ship'}></BuildSaveButton>
			<BuildLoadButton
				database={data.database}
				type={'ship'}
				parentPlayer={SessionShip}
				updatePage={() => updatePage()}
			></BuildLoadButton>
			<BuildsOverrideButton type={'ship'}></BuildsOverrideButton>
		</div>
		<div class="flex flex-row space-x-2 my-1">
			<RandomButton player={SessionShip} database={data.database} {updatePage} type={'ship'}
			></RandomButton>
			<BlackButton
				parentFunction={() => {
					SessionShip.resetBuild();
					updatePage();
				}}
				parentText={'Reset Build'}
			></BlackButton>
		</div>
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
										updatePage();
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
										updatePage();
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
