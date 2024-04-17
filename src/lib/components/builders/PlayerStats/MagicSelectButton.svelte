<script lang="ts">
	import { magicDetails } from '$lib/dataConstants';
	import { Player } from '$lib/gearBuilder/playerClasses';
	import { fade } from 'svelte/transition';

	export let updatePage: any, player: Player;

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<div>
	<button
		on:click={toggleMenu}
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-56 h-56"
	>
		<div class="m-5">
			<img
				src="https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/typescript/static/assets/images/Magics/Acid_Magic_29.webp"
				alt="Test"
			/>
			<p style="font-family: Merriweather;">{player.magic}</p>
		</div>
	</button>
</div>

{#if isMenuOpen}
	<div
		class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
	>
		<div
			class="z-20 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col justify-center items-center"
			id="menuouter"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<p class="text-center text-3xl my-4 text-white" style="font-family: Merriweather;">
				Select Magic
			</p>
			<div class="flex flex-row border-white rounded border w-3/4 overflow-x-auto">
				{#each Object.values(magicDetails) as magicOption}
					<div class="m-2">
						<button
							on:click={() => {
								pla;
								updatePage();
								toggleMenu();
							}}
							class="bg-black border border-white text-white font-bold text-sm py-2 px-4 w-28 h-28 items-center text-center"
							style="font-family: Merriweather;"
						>
							<p style="font-family: Merriweather;">{magicOption.name}</p>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
