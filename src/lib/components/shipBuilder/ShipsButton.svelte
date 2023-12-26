<script>
	//@ts-nocheck
	import { fade } from 'svelte/transition';
	import { playCorrect } from '$lib/utils/sound.js';
	import { currentShip, resetAllShipParts } from '$lib/utils/shipStatsStore';
	import { ships } from '$lib/data/ships/ships.js';

	let menuIsActive = false;

	function menuToggle() {
		menuIsActive = !menuIsActive;
	}
</script>

<div>
	<button
		class="w-full bg-black border border-white text-white font-bold text-lg py-2 px-4 rounded"
		style="font-family: Merriweather;"
		on:click={() => {
			menuToggle();
			playCorrect();
		}}>{$currentShip.name}</button
	>

	{#if menuIsActive}
		<div
			class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<div class="fixed inset-0 flex items-center justify-center">
				<div class="w-1/2">
					{#each ships as ship}
						<div class="mb-4">
							<button
								class="w-full bg-black border border-white text-white font-bold text-lg py-2 px-4 rounded"
								class:selected={ship.name == $currentShip.name}
								on:click={() => {
									currentShip.set(ship);
									resetAllShipParts();
									playCorrect();
									menuToggle();
								}}
							>
								<p style="font-family: Merriweather;">
									{ship.name}
								</p>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.selected {
		background-color: #0099ff;
		-webkit-text-fill-color: black;
	}
</style>
