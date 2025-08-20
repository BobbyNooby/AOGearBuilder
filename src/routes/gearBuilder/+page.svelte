<script lang="ts">
	import { Player } from '$lib/gearBuilder/Player';
	import type { PageData } from '../$types';
	import type { PlayerBuildSlot } from '$lib/gearBuilder/PlayerBuildSlot';
	import StatList from '$lib/components/builders/stats/StatList.svelte';
	import type { PageServerData } from './$types';
	import GearSection from '$lib/components/builders/gear/GearSection.svelte';
	import RandomButton from '$lib/components/builders/shared/RandomButton.svelte';

	let { data }: { data: PageData & PageServerData } = $props();

	let database = data.items;

	let player = new Player(data.items, data.config);

	let slots = Object.entries(player.build.slots) as [
		keyof typeof player.build.slots,
		PlayerBuildSlot
	][];
	let update = $state(false);
	function updateState() {
		update = !update;
	}
</script>

{#key update}
	<!-- Horizontal Row -->

	<div id="title" class="mb-5">
		<p class="text-7xl text-white">Gear Builder</p>
	</div>

	<div id="buttons">
		<RandomButton {player} {updateState} />
	</div>

	<div class="flex flex-row space-x-10">
		<!-- accessory1 / accessory2 / accessory3 -->
		<div>
			{#each slots as [slotKey, slot] (slotKey)}
				{#if ['accessory1', 'accessory2', 'accessory3'].includes(slotKey)}
					<GearSection config={data.config} {database} {player} {slot} {slotKey} {updateState} />
				{/if}
			{/each}
		</div>

		<!-- chestplate / pants -->
		<div>
			{#each slots as [slotKey, slot] (slotKey)}
				{#if ['chestplate', 'pants'].includes(slotKey)}
					<GearSection config={data.config} {database} {player} {slot} {slotKey} {updateState} />
				{/if}
			{/each}
		</div>

		<div class="m-10 h-auto w-80 rounded border-2 border-white bg-black bg-opacity-40 p-2">
			<StatList
				config={data.config}
				isMenu={false}
				showStatName={true}
				item={player.build.getBuildStats() as any}
				{player}
			/>
		</div>
	</div>
{/key}
