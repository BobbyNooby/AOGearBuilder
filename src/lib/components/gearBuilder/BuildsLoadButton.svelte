<script>
	import { playCorrect, playWrong } from '$lib/utils/sound';
	import { loadCode } from '$lib/utils/statsStore';
	import { fade } from 'svelte/transition';

	// @ts-nocheck

	let savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];

	// Menu toggle Stuff
	let menuIsActive = false;

	function menuToggle() {
		menuIsActive = !menuIsActive;
		playCorrect();
	}

	function handleClick() {
		savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
		menuToggle();
	}

	let deletedBuildName = '';
	let deletedBuild = null;

	function startDelete(savedBuild) {
		deletedBuild = savedBuild;
		deletedBuildName = savedBuild.name;
	}

	function deleteBuild() {
		if (deletedBuild) {
			savedBuilds = savedBuilds.filter((item) => item.name !== deletedBuild.name);
			localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
			savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
			playCorrect();
			deletedBuild = null;
		}
	}

	let renameName = '';
	let renamingBuild = null;

	// Function to start renaming
	function startRename(savedBuild) {
		renamingBuild = savedBuild;
		renameName = savedBuild.name;
	}

	// Function to save the new name
	function saveRename() {
		if (renamingBuild) {
			renamingBuild.name = renameName;
			localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
			savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || []; // Reload the item name
			playCorrect();
			renamingBuild = null; // to close menu
		}
	}

	async function handleCopy(inputString) {
		// generate code

		// copy text to clipboard
		await navigator.clipboard.writeText(inputString);
		playCorrect();
	}
</script>

<div>
	<!-- Button to open overlay -->
	<button
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
		style="font-family: Merriweather;"
		on:click={handleClick}>Load Build</button
	>

	<!-- Overlay with builds -->
	{#if menuIsActive}
		<div
			class="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 overflow-y-auto"
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
				<div
					class=" w-3/4 md:w-1/2 h-3/4 bg-black border-white border rounded bg-opacity-75 overflow-auto"
				>
					{#each savedBuilds as savedBuild (savedBuild.name)}
						<div class="my-4 mx-4 flex items-center justify-center">
							<button
								class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-56 md:w-80 rounded"
								on:click={() => {
									menuToggle();
									loadCode(savedBuild.code);
								}}
								style="text-align: center; white-space: normal; word-wrap: break-word;"
							>
								<p>{savedBuild.name}</p>
							</button>
							<div class="ml-4 flex flex-col items-center">
								<button
									class="bg-black border border-white text-white font-bold text-lg py-2 px-2 rounded"
									style="font-family: Merriweather;"
									on:click={() => handleCopy(savedBuild.code)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-clipboard"
										viewBox="0 0 16 16"
									>
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
										/>
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
										/>
									</svg>
								</button>
							</div>
							<div class="ml-4 flex flex-col items-center">
								<button
									class="bg-black border border-white text-white font-bold text-lg py-2 px-2 rounded"
									style="font-family: Merriweather;"
									on:click={() => startRename(savedBuild)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-pencil"
										viewBox="0 0 16 16"
									>
										<path
											d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
										/>
									</svg>
								</button>
							</div>
							<div class="ml-4 flex flex-col items-center">
								<button
									class="bg-black border border-white text-white font-bold text-lg py-2 px-2 rounded"
									style="font-family: Merriweather;"
									on:click={() => startDelete(savedBuild)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-x-circle"
										viewBox="0 0 16 16"
									>
										<path
											d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
										/>
										<path
											d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
										/>
									</svg>
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		{#if renamingBuild}
			<div
				class="z-20 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex justify-center items-center"
				id="menuouter"
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
			>
				<div class="text-white w-full">
					<p class="text-center text-3xl md:text-5xl" style="font-family: Merriweather;">
						Rename Build
					</p>
					<div class="flex justify-center">
						<input
							type="text"
							bind:value={renameName}
							placeholder="Rename"
							class="border rounded p-2 m-2 w-3/4 bg-black text-white text-center"
						/>
					</div>
					<div class="flex justify-center space-x-4">
						<button
							class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
							style="font-family: Merriweather;"
							on:click={saveRename}>Save</button
						>
					</div>
				</div>
			</div>
		{/if}
		{#if deletedBuild}
			<div
				class="z-20 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col justify-center items-center"
				id="menuouter"
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
			>
				<p class="text-center text-3xl my-4 text-white" style="font-family: Merriweather;">
					Are you sure you want to delete "{deletedBuild.name}"?
				</p>
				<div class="flex justify-center space-x-4">
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={deleteBuild}>Yes</button
					>
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={() => (deletedBuild = null)}>No</button
					>
				</div>
			</div>
		{/if}
	{/if}
</div>
