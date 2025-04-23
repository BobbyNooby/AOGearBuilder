<script lang="ts">
	import type { Player } from '$lib/gearBuilder/Player';
	import type { PlayerBuildSlot } from '$lib/gearBuilder/PlayerBuildSlot';
	import type { AnyItemDetails } from '$lib/types/itemTypes';
	import MenuTrigger from '../menu/MenuTrigger.svelte';
	import PostCalcsButton from '../stats/PostCalcsButton.svelte';

	let {
		database,
		player,
		slot,
		slotKey,
		updateState
	}: {
		database: AnyItemDetails[];
		player: Player;
		slot: PlayerBuildSlot;
		slotKey: keyof typeof Player.prototype.build.slots;
		updateState: () => void;
	} = $props();

	const availableLevels = slot.armor.statsPerLevel
		.map((entry) => entry.level)
		.sort((a, b) => b - a);
	const selectedValue = $state(slot.armorLevel);

	function handleLevelChange(event: Event) {
		const selectElement = event.target as HTMLSelectElement;
		const levelValue = parseInt(selectElement.value);
		slot.setArmorLevel(levelValue);
		updateState();
	}
</script>

<div class="flex flex-col space-y-4 p-2">
	<!-- Armor / Enchant / Modifier -->
	<div class="flex flex-row space-x-4">
		<MenuTrigger {database} {player} item={slot.armor} {slotKey} {updateState} />
		<MenuTrigger {database} {player} item={slot.enchant} {slotKey} {updateState} />
		<MenuTrigger {database} {player} item={slot.modifier} {slotKey} {updateState} />
	</div>

	<!-- Gems -->
	<div class="flex flex-row space-x-4">
		{#each slot.gems as gem, gemIndex}
			<MenuTrigger {database} {player} item={gem} {slotKey} {gemIndex} {updateState} />
		{/each}
	</div>

	<div class="flex flex-row space-x-4">
		<p class="text-white">Armor Level</p>
		<select value={slot.armorLevel} class="flex-1 rounded-md" onchange={handleLevelChange}>
			{#each availableLevels as level}
				<option>{level}</option>
			{/each}
		</select>
		<PostCalcsButton {slot}></PostCalcsButton>
	</div>
</div>
