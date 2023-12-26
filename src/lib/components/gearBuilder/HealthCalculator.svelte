<script>
	import { finalDefense } from '$lib/utils/statsStore';
	import { onMount } from 'svelte';

	const baseHealth = 93;
	let playerLevel = 1;
	let vitalityLevel = 0;
	onMount(() => {
		if (
			localStorage.getItem('playerLevel') != null &&
			localStorage.getItem('vitalityLevel') != null //Only load if there is the localstorage if not will default to 1 and 0
		) {
			playerLevel = parseInt(localStorage.getItem('playerLevel'));
			vitalityLevel = parseInt(localStorage.getItem('vitalityLevel'));
		} else {
			playerLevel = 1;
			vitalityLevel = 0;
		}
	});

	function handleHealthCalculationUpdate() {
		if (playerLevel > 125) {
			playerLevel = 125;
		} else if (playerLevel < 1 || playerLevel == null) {
			playerLevel = 1;
		} else if (vitalityLevel > playerLevel * 2) {
			vitalityLevel = playerLevel * 2;
		} else if (vitalityLevel < 0 || vitalityLevel == null) {
			vitalityLevel = 0;
		}
		localStorage.setItem('playerLevel', playerLevel.toString());
		localStorage.setItem('vitalityLevel', vitalityLevel.toString());
	}
</script>

<div class="pb-32 w-full md:w-3/5 pt-5">
	<div
		class="bg-black border border-white text-white items-center justify-center text-center flex flex-col p-5"
		style="font-family: merriweather;"
	>
		<p class="text-4xl">Health Calculator</p>
		<div class="flex flex-row space-x-5 p-5">
			<div class="flex flex-col items-center">
				<p class="text-xl">Player Level</p>
				<input
					name="Player Level"
					class="text-black"
					type="number"
					min="1"
					max="125"
					bind:value={playerLevel}
					on:input={handleHealthCalculationUpdate}
				/>
				<div class="flex justify-between space-x-3 mt-3">
					<button
						class="bg-black text-white px-4 py-2 rounded border border-white"
						on:click={() => {
							playerLevel -= 1;
							handleHealthCalculationUpdate();
						}}>-</button
					>

					<button
						class="bg-black text-white px-4 py-2 rounded border border-white"
						on:click={() => {
							playerLevel += 1;
							handleHealthCalculationUpdate();
						}}>+</button
					>
				</div>
			</div>

			<div class="flex flex-col items-center">
				<p class="text-xl">Vitality Level</p>
				<input
					name="Vitality Level"
					class="text-black"
					type="number"
					min="0"
					max="250"
					bind:value={vitalityLevel}
					on:input={handleHealthCalculationUpdate}
				/>
				<div class="flex justify-between space-x-3 mt-3">
					<button
						class="bg-black text-white px-4 py-2 rounded border border-white"
						on:click={() => {
							vitalityLevel -= 1;
							handleHealthCalculationUpdate();
						}}>-</button
					>

					<button
						class="bg-black text-white px-4 py-2 rounded border border-white"
						on:click={() => {
							vitalityLevel += 1;
							handleHealthCalculationUpdate();
						}}>+</button
					>
				</div>
			</div>

			<div class="flex flex-col items-center">
				<p class="text-xl">Health</p>
				<p>{baseHealth + vitalityLevel * 4 + playerLevel * 7 + $finalDefense}</p>
			</div>
		</div>
	</div>
</div>
