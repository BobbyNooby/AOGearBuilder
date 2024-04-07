<script lang="ts">
	import type { Player } from '$lib/playerClasses';

	export let player: Player,
		statKey: keyof Player,
		name: string,
		description: string,
		color: string;


       
</script>

<div class="flex flex-col">
	<div class="flex flex-row">
		<p>Vitality</p>

		<div class="flex items-center">
			<button
				on:click={() => {
					player[statKey] -= 1;
				}}
				class="bg-black text-white px-4 py-2 rounded border border-white">-</button
			>
			<input
				type="number"
				class="text-black m-2 p-2"
				min={0}
				max={maximumPlayerStatPoints}
				bind:value={player.vitalityPoints}
			/>
			<button
				on:click={() => {
					stat += 1;
				}}
				class="bg-black text-white px-4 py-2 rounded border border-white">+</button
			>
		</div>
	</div>
	<div class="border-2 {color}">
		<div class="border-2 border-gray-800 bg-gray-800">
			<div
				class="{color} h-2"
				style="width: {(player.vitalityPoints / maximumPlayerStatPoints) * 100}%;"
			></div>
		</div>
	</div>
</div>
