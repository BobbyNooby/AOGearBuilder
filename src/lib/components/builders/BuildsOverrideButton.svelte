<script>
	import { currentBuildCode } from '$lib/utils/buildSavingUtils';
	import { fade } from 'svelte/transition';

	// @ts-nocheck

	export let type;

	let saveBuildType = '';

	if (type == 'gear') {
		saveBuildType = 'savedBuilds';
	} else if (type == 'ship') {
		saveBuildType = 'savedShipBuilds';
	}

	let savedBuilds = JSON.parse(localStorage.getItem(saveBuildType)) || [];

	// Menu toggle Stuff
	let menuIsActive = false;

	function menuToggle() {
		menuIsActive = !menuIsActive;
	}

	function handleClick() {
		savedBuilds = JSON.parse(localStorage.getItem(saveBuildType)) || [];
		menuToggle();
	}

	function overrideBuild(savedBuild) {
		// replaces the code in the build with same name to new code
		if (type == 'gear') {
			savedBuilds = savedBuilds.map((build) =>
				build.name === savedBuild['name'] ? { ...build, code: $currentBuildCode } : build
			);
		} else if (type == 'ship') {
			// savedBuilds = savedBuilds.map((build) =>
			// 	build.name === savedBuild['name'] ? { ...build, code: $currentShipBuildId } : build
			// );
		}

		localStorage.setItem(saveBuildType, JSON.stringify(savedBuilds));
		menuToggle();
	}

	let searchQuery = '';

	$: filteredBuilds = savedBuilds.filter((item) => {
		// Check if the search query is empty or if the item name includes the search query
		if (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
			return true;
		}
		return false;
	});
</script>

<div>
	<!-- Button to open overlay -->
	<button
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
		style="font-family: Merriweather;"
		on:click={handleClick}>Override Build</button
	>

	<!-- Overlay with builds -->
	{#if menuIsActive}
		<div
			class="z-30 fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 overflow-y-auto"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<div class="flex flex-col items-center w-full h-full">
				<button
					on:click={() => {
						menuToggle();
					}}
					class="bg-black border rounded border-white text-white font-bold text-lg w-20 h-20 p-4 relative my-3"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="100%"
						height="100%"
						fill="currentColor"
						class="bi bi-x-lg"
						viewBox="0 0 16 16"
					>
						<path
							d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
						/>
					</svg>
				</button>
				<p
					class="text-center text-3xl md:text-5xl text-white my-5"
					style="font-family: Merriweather;"
				>
					Saved Builds
				</p>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search"
					class="border rounded p-2 m-2 w-1/2 bg-black text-white"
				/>
				<div
					class=" w-3/4 md:w-1/2 h-3/4 bg-black border-white border rounded bg-opacity-75 overflow-auto"
				>
					{#each filteredBuilds as savedBuild (savedBuild.name)}
						<div class="my-4 mx-4 flex items-center justify-center">
							<button
								class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-56 md:w-80 rounded"
								on:click={() => {
									overrideBuild(savedBuild);
								}}
								style="text-align: center; white-space: normal; word-wrap: break-word;"
							>
								<p>{savedBuild.name}</p>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
