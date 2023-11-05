<script>
	// @ts-nocheck
	import { playCorrect, playWrong } from '$lib/utils/sound';
	import { currentBuildId } from '$lib/utils/statsStore';
	import { fade } from 'svelte/transition';

	let buildName = '';

	// Menu toggle Stuff
	let menuIsActive = false;
	let replaceMenuIsActive = false;
	let savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
	let existingBuildIndex = -1;

	function menuToggle() {
		savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
		menuIsActive = !menuIsActive;
		playCorrect();
	}

	function handleClick() {
		existingBuildIndex = savedBuilds.findIndex((build) => {
			if (build === null || build === undefined) {
				return false; // Skip null or undefined values. Added this as there was an error with old method.
			}
			return build.name === buildName;
		});

		if (buildName === '') {
			playWrong(); // Play the wrong sound if buildName is empty
		} else if (existingBuildIndex !== -1) {
			replaceMenuIsActive = true;
		} else {
			saveBuild();
		}
	}

	function saveBuild() {
		const newBuild = { name: buildName, code: $currentBuildId };
		savedBuilds.unshift(newBuild);
		localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
		menuToggle();
		buildName = '';
	}

	function replaceBuild() {
		savedBuilds[existingBuildIndex].code = $currentBuildId;
		localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
		replaceMenuIsActive = false;
		menuToggle();
		buildName = '';
	}
</script>

<div>
	<!-- Button to open overlay -->
	<button
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
		style="font-family: Merriweather;"
		on:click={menuToggle}>Save Build</button
	>

	<!-- Overlay with item menu -->
	{#if menuIsActive}
		<div
			class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-80 fixed flex justify-center items-center"
			id="menuouter"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<div class="text-white w-full">
				<p class="text-center text-3xl md:text-5xl" style="font-family: Merriweather;">
					Save Build
				</p>
				<div class="flex justify-center">
					<input
						type="text"
						bind:value={buildName}
						placeholder="Build Name"
						class="border rounded p-2 m-2 w-3/4 bg-black text-white text-center"
					/>
				</div>
				<div class="flex justify-center space-x-4">
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={menuToggle}>Cancel</button
					>
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={handleClick}>Save</button
					>
				</div>
			</div>
		</div>
		{#if replaceMenuIsActive}
			<div
				class="z-20 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col justify-center items-center"
				id="menuouter"
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
			>
				<p class="text-center text-3xl my-4 text-white" style="font-family: Merriweather;">
					There is already a build named "{buildName}". Would you like to replace it?
				</p>
				<div class="flex justify-center space-x-4">
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={replaceBuild}>Yes</button
					>
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={() => (replaceMenuIsActive = false)}>No</button
					>
				</div>
			</div>
		{/if}
	{/if}
</div>
