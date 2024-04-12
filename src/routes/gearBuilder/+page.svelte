<script lang="ts">
	import { onMount } from 'svelte';
	import GearButton from '$lib/components/GearButton.svelte';
	import { Player } from '$lib/playerClasses';
	import type { PageData } from '../$types';
	import { get, writable } from 'svelte/store';
	import ItemTooltip from '$lib/components/ItemTooltip.svelte';
	import { fade } from 'svelte/transition';
	import PlayerStatMenu from '$lib/components/PlayerStats/PlayerStatMenu.svelte';
	import { testNumber } from '$lib/playerUtils';
	import FilterButton from '$lib/components/FilterButton.svelte';
	import SortButton from '$lib/components/SortButton.svelte';
	import { currentBuildCode } from '$lib/utils/buildSavingUtils';
	import BlackButton from '$lib/components/misc/BlackButton.svelte';
	import { getBuildFromLocalStorage, storeBuildToLocalStorage } from '$lib/utils/buildSavingUtils';
	import BuildSaveButton from '$lib/components/builders/BuildSaveButton.svelte';
	import BuildLoadButton from '$lib/components/builders/BuildLoadButton.svelte';

	export let data: PageData;
	let ready = false;

	let SessionPlayer = new Player();
	const updatePageStore = writable(false);

	function loadHash() {
		if (window.location.hash.substring(1) !== '') {
			SessionPlayer.loadBuildCode(data.Database, window.location.hash.substring(1));
			history.replaceState({}, document.title, window.location.href.split('#')[0]);
		}
	}

	function updatePage() {
		// Toggle the value of the writable store
		currentBuildCode.set(SessionPlayer.getBuildCode());
		storeBuildToLocalStorage(get(currentBuildCode));
		updatePageStore.update((value) => !value);
	}

	onMount(() => {
		SessionPlayer.loadBuildCode(data.Database, getBuildFromLocalStorage());
		loadHash();
		updatePage();
		ready = true;
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Arcane Odyssey Tools</title>
	<meta name="title" content="Ship Builder" />
	<meta name="description" content="Ship Builder for Arcane Odyssey by BobbyNooby" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Ship Builder" />
	<meta property="og:description" content="Ship Builder for Arcane Odyssey by BobbyNooby" />
	<meta property="og:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Ship Builder" />
	<meta property="twitter:description" content="Ship Builder for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

{#if ready}
	{#key $updatePageStore}
		<section class="flex flex-col items-center" style="display: flex;">
			<p class="mt-8 text-7xl text-white merriweather-light" style="font-family: Merriweather;">
				Gear Builder{testNumber}
			</p>

			<div class="flex flex-row space-x-2 my-1">
				<BlackButton
					parentFunction={async () => {
						let code = SessionPlayer.getBuildCode();
						await navigator.clipboard.writeText(code);
					}}
					parentText={'Get Build Code'}
				></BlackButton>

				<BlackButton
					parentFunction={async () => {
						let inputString = await navigator.clipboard.readText();
						SessionPlayer.loadBuildCode(data.Database, inputString);
						updatePage();
					}}
					parentText={'Load Build Code'}
				></BlackButton>
				<BlackButton
					parentFunction={async () => {
						let code =
							location.protocol +
							'//' +
							location.host +
							location.pathname +
							(location.search ? location.search : '') +
							'#' +
							SessionPlayer.getBuildCode();

						// copy text to clipboard
						await navigator.clipboard.writeText(code);
					}}
					parentText={'Share Build Code'}
				></BlackButton>
			</div>

			<div class="flex flex-row space-x-2 my-1">
				<BuildSaveButton type={'gear'}></BuildSaveButton>
				<BuildLoadButton
					database={data.Database}
					type={'gear'}
					parentPlayer={SessionPlayer}
					updatePage={() => updatePage()}
				></BuildLoadButton>
			</div>

			<div class="flex flex-row space-x-2 mt-5 mb-2">
				<FilterButton></FilterButton>
				<SortButton></SortButton>
			</div>

			<div class="flex justify-center items-center">
				<div class="flex flex-row">
					<div class="flex flex-row">
						<div class="mr-2">
							{#each Object.keys(SessionPlayer.build.slots) as slotKey}
								{#if ['accessory1', 'accessory2', 'accessory3'].includes(slotKey)}
									<div class="flex flex-col mb-10">
										<div class="flex flex-row">
											<GearButton
												database={data}
												currentItem={SessionPlayer.build.slots[slotKey].armor}
												player={SessionPlayer}
												{slotKey}
												gemIndex={false}
												{updatePage}
											/>

											<GearButton
												database={data}
												currentItem={SessionPlayer.build.slots[slotKey].enchant}
												player={SessionPlayer}
												{slotKey}
												gemIndex={false}
												{updatePage}
											/>
											<GearButton
												database={data}
												currentItem={SessionPlayer.build.slots[slotKey].modifier}
												player={SessionPlayer}
												{slotKey}
												gemIndex={false}
												{updatePage}
											/>
											<div class="flex flex-col justify-center items-center">
												<p class="text-xl text-white" style=" font-family: Merriweather;">Level</p>
												<select
													class="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
													bind:value={SessionPlayer.build.slots[slotKey].armorLevel}
													on:change={() => {
														updatePage();
													}}
												>
													{#each Object.values(SessionPlayer.build.slots[slotKey].armor.statsPerLevel) as statsAtLevel}
														{#if statsAtLevel.level <= SessionPlayer.level}
															<option transition:fade={{ duration: 69 }} value={statsAtLevel.level}
																>{statsAtLevel.level}</option
															>
														{/if}
													{/each}
												</select>
											</div>
										</div>
										<div class="flex flex-row">
											{#each Object.values(SessionPlayer.build.slots[slotKey].gems) as gem, index}
												<GearButton
													database={data}
													currentItem={gem}
													player={SessionPlayer}
													{slotKey}
													gemIndex={parseInt(index)}
													{updatePage}
												/>
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						</div>
						<div class="ml-2">
							{#each Object.keys(SessionPlayer.build.slots) as slotKey}
								{#if ['chestplate', 'pants'].includes(slotKey)}
									<div class="flex flex-col mb-10">
										<div class="flex flex-row">
											<GearButton
												database={data}
												currentItem={SessionPlayer.build.slots[slotKey].armor}
												player={SessionPlayer}
												{slotKey}
												gemIndex={false}
												{updatePage}
											/>

											<GearButton
												database={data}
												currentItem={SessionPlayer.build.slots[slotKey].enchant}
												player={SessionPlayer}
												{slotKey}
												gemIndex={false}
												{updatePage}
											/>
											<GearButton
												database={data}
												currentItem={SessionPlayer.build.slots[slotKey].modifier}
												player={SessionPlayer}
												{slotKey}
												gemIndex={false}
												{updatePage}
											/>
											<div class="flex flex-col justify-center items-center">
												<p class="text-xl text-white" style=" font-family: Merriweather;">Level</p>
												<select
													class="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
													bind:value={SessionPlayer.build.slots[slotKey].armorLevel}
													on:change={() => {
														updatePage();
													}}
												>
													{#each Object.values(SessionPlayer.build.slots[slotKey].armor.statsPerLevel) as statsAtLevel}
														{#if statsAtLevel.level <= SessionPlayer.level}
															<option transition:fade={{ duration: 69 }} value={statsAtLevel.level}
																>{statsAtLevel.level}</option
															>
														{/if}
													{/each}
												</select>
											</div>
										</div>
										<div class="flex flex-row">
											{#each Object.values(SessionPlayer.build.slots[slotKey].gems) as gem, index}
												<GearButton
													database={data}
													currentItem={gem}
													player={SessionPlayer}
													{slotKey}
													gemIndex={parseInt(index)}
													{updatePage}
												/>
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>

					<div class="w-full h-full">
						<div class=" m-20 w-80 h-96 p-2 border-2 border-white rounded bg-black bg-opacity-40">
							<ItemTooltip
								isItemMenu={false}
								item={SessionPlayer.build.getBuildStats()}
								showName={true}
								atlanteanAttribute={''}
								showOnlyAtlanteanStat={false}
							/>
						</div>
					</div>
				</div>
			</div>

			<PlayerStatMenu player={SessionPlayer} updatePage={() => updatePage()} />
		</section>
	{/key}
{/if}
