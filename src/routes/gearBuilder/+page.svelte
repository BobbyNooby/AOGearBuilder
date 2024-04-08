<script lang="ts">
	import { onMount } from 'svelte';
	import GearButton from '$lib/components/GearButton.svelte';
	import { Player } from '$lib/playerClasses';
	import type { PageData } from '../$types';
	import { writable } from 'svelte/store';
	import ItemTooltip from '$lib/components/ItemTooltip.svelte';
	import { fade } from 'svelte/transition';
	import PlayerStatMenu from '$lib/components/PlayerStats/PlayerStatMenu.svelte';
	import { testNumber } from '$lib/playerUtils';

	export let data: PageData;

	let SessionPlayer = new Player();
	const updatePageStore = writable(false);

	function updatePage() {
		// Toggle the value of the writable store
		updatePageStore.update((value) => !value);
	}
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

{#key $updatePageStore}
	<section class="flex flex-col items-center" style="display: flex;">
		<p class="mt-8 text-7xl text-white merriweather-light" style="font-family: Merriweather;">
			Gear Builder{testNumber}
		</p>

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
											>
												{#each Object.values(SessionPlayer.build.slots[slotKey].armor.statsPerLevel) as statsAtLevel}
													<option transition:fade={{ duration: 69 }} value={statsAtLevel.level}
														>{statsAtLevel.level}</option
													>
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
											>
												{#each Object.values(SessionPlayer.build.slots[slotKey].armor.statsPerLevel) as statsAtLevel}
													<option transition:fade={{ duration: 69 }} value={statsAtLevel.level}
														>{statsAtLevel.level}</option
													>
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

				<div class=" m-20 w-80 p-2 border-2 border-white rounded bg-black bg-opacity-40 h-72">
					<ItemTooltip
						item={SessionPlayer.build.getBuildStats()}
						showName={true}
						atlanteanAttribute={''}
					/>
				</div>
			</div>
		</div>

		<PlayerStatMenu player={SessionPlayer} updatePage={() => updatePage()} />
	</section>
{/key}
