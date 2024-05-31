<script lang="ts">
	import GearButton from '$lib/components/Builders/GearButton.svelte';
	import { CurrentShipBuild } from '$lib/shipBuilder/ShipClass.js';

	export let data;

	let SessionShip = new CurrentShipBuild(data.database);
</script>

{#each Object.keys(SessionShip.slots) as slotKey}
	{#each SessionShip.slots[slotKey] as item}
		<GearButton
			currentItem={item}
			database={data}
			ship={SessionShip}
			{slotKey}
			updatePage={() => {}}
		/>
	{/each}
{/each}
