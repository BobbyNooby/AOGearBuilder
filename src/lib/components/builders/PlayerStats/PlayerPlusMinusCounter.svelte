<script lang="ts">
	import { Player } from '$lib/gearBuilder/playerClasses';

	export let player: Player,
		playerKey: keyof Player,
		minimumValue: number,
		maximumValue: number,
		incrementFunction: any,
		decrementFunction: any;
</script>

<div class="flex items-center">
	<button
		on:click={() => {
			decrementFunction;
		}}
		class="bg-black text-white px-4 py-2 rounded border border-white">-</button
	>
	<input
		type="number"
		class="text-black m-2 p-2"
		min={minimumValue}
		max={maximumValue}
		bind:value={player[playerKey]}
	/>
	<button
		on:click={() => {
			incrementFunction;
		}}
		class="bg-black text-white px-4 py-2 rounded border border-white">+</button
	>
</div>
