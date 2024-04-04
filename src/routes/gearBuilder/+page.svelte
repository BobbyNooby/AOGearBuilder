<script lang="ts">
	import { onMount } from 'svelte';
	import GearButton from '$lib/components/GearButton.svelte';
	import { Player } from '$lib/playerClasses';
	import type { PageData } from '../$types';
	import { writable } from 'svelte/store';
	import ItemTooltip from '$lib/components/ItemTooltip.svelte';

	export let data: PageData;

	let SessionPlayer = new Player();
	const updatePageStore = writable(false);

	function updatePage() {
		// Toggle the value of the writable store
		updatePageStore.update((value) => !value);
	}
</script>

{#key $updatePageStore}
	<div>
		{#each Object.keys(SessionPlayer.build.slots) as slotKey}
			<div class="flex flex-wrap">
				<GearButton
					Database={data}
					CurrentItem={SessionPlayer.build.slots[slotKey].armor}
					Player={SessionPlayer}
					SlotKey={slotKey}
					SlotPieceKey={'armor'}
					gemIndex={false}
					setFunction={SessionPlayer.build.setGear}
					{updatePage}
				/>

				<GearButton
					Database={data}
					CurrentItem={SessionPlayer.build.slots[slotKey].enchant}
					Player={SessionPlayer}
					SlotKey={slotKey}
					SlotPieceKey={'enchant'}
					gemIndex={false}
					setFunction={SessionPlayer.build.setGear}
					{updatePage}
				/>
				<GearButton
					Database={data}
					CurrentItem={SessionPlayer.build.slots[slotKey].modifier}
					Player={SessionPlayer}
					SlotKey={slotKey}
					SlotPieceKey={'modifier'}
					gemIndex={false}
					setFunction={SessionPlayer.build.setGear}
					{updatePage}
				/>
				<label for={`${slotKey}-armorLevel`}>Armor Level:</label>
				<select
					bind:value={SessionPlayer.build.slots[slotKey].armorLevel}
					id={`${slotKey}-armorLevel`}
				>
					{#each Object.values(SessionPlayer.build.slots[slotKey].armor.statsPerLevel) as { level }}
						<option value={level}>{level}</option>
					{/each}
				</select>

				{#each Object.values(SessionPlayer.build.slots[slotKey].gems) as gem, index}
					<GearButton
						Database={data}
						CurrentItem={gem}
						Player={SessionPlayer}
						SlotKey={slotKey}
						SlotPieceKey={'gems'}
						gemIndex={parseInt(index)}
						setFunction={SessionPlayer.build.setGear}
						{updatePage}
					/>
				{/each}
			</div>
		{/each}

		<ItemTooltip
			Item={SessionPlayer.build.getBuildStats()}
			showName={true}
			atlanteanAttribute={''}
		/>
	</div>
{/key}
