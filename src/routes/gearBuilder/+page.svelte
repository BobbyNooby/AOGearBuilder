<script>
	import { getCurrentGearSet } from '$lib/utils/statsStore';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import GearButton from '$lib/components/shared/GearButton.svelte';
	import StatsFinal from '$lib/components/gearBuilder/StatsFinal.svelte';
	import { resetAllStores, storeCurrentBuild } from '$lib/utils/statsStore';
	import GenerateCode from '$lib/components/shared/GenerateCode.svelte';
	import LoadCode from '$lib/components/shared/LoadCode.svelte';
	import RandomButton from '$lib/components/shared/RandomButton.svelte';
	import ShareButton from '$lib/components/shared/ShareButton.svelte';
	import { loadCode } from '$lib/utils/statsStore';
	import { isMobile } from '$lib/utils/mobileStore';
	import { playCorrect } from '$lib/utils/sound';
	import BuildsSaveButton from '$lib/components/shared/BuildsSaveButton.svelte';
	import BuildsLoadButton from '$lib/components/shared/BuildsLoadButton.svelte';
	import BuildsOverrideButton from '$lib/components/shared/BuildsOverrideButton.svelte';
	import HealthCalculator from '$lib/components/gearBuilder/HealthCalculator.svelte';
	import PostCalcsButton from '$lib/components/gearBuilder/PostCalcsButton.svelte';

	//Load using hash.
	function loadHash() {
		loadCode(window.location.hash.substring(1));
		history.replaceState({}, document.title, window.location.href.split('#')[0]);
		storeCurrentBuild();
	}

	// Fade in initiator. Reset stores.
	let ready = false;
	onMount(() => {
		ready = true;
		loadCode(localStorage.getItem('currentBuild')); // Load currentBuild from local storage. Basically keeps the last build the person made on
		loadHash(); // Load if link has hash.
	});

	let currentGears = getCurrentGearSet();

	$: {
		currentGears = getCurrentGearSet();
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Gear Builder</title>
	<meta name="title" content="Gear Builder" />
	<meta name="description" content="Gear Builder for Arcane Odyssey by BobbyNooby" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Gear Builder" />
	<meta property="og:description" content="Gear Builder for Arcane Odyssey by BobbyNooby" />
	<meta property="og:image" content="assets/images/icon.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Gear Builder" />
	<meta property="twitter:description" content="Gear Builder for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="assets/images/icon.png" />

	<!-- Meta Tags Generated with https://metatags.io -->

	<!-- Google Fonts Link -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Open+Sans:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section>
	{#if ready}
		{#if !$isMobile}<!--   desktop view -->
			<p
				class="text-6xl font-medium text-gray-300 text-center p-5"
				style="font-family: Merriweather;"
				in:fade={{ delay: 250, duration: 300 }}
				out:fade={{ delay: 250, duration: 300 }}
			>
				Gear Builder
			</p>
			<div class="flex items-center justify-center space-x-4 pb-5">
				<GenerateCode type={'gear'} />
				<LoadCode type={'gear'} />
				<ShareButton type={'gear'} />
			</div>
			<div class="flex items-center justify-center space-x-4 pb-5">
				<BuildsSaveButton type={'gear'} />
				<BuildsLoadButton type={'gear'} />
				<BuildsOverrideButton type={'gear'} />
			</div>
			<div class="flex items-center justify-center space-x-4 pb-5">
				<RandomButton type={'gear'} />
				<button
					class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
					style="font-family: Merriweather;"
					on:click={() => {
						resetAllStores();
						storeCurrentBuild();
						playCorrect();
					}}>Clear</button
				>
			</div>
			<div class="flex">
				<div class="w-100">
					{#each Object.keys(currentGears) as category}
						<div class="flex space-x-4">
							{#each Object.keys(currentGears[category]) as currentItemType}
								{#if currentItemType != 'postCalcs'}
									<GearButton
										currentItem={currentGears[category][currentItemType]}
										{currentItemType}
										category={currentGears[category]}
										categoryName={category}
										{currentGears}
										builderType={'gear'}
									/>
								{/if}
								{#if currentItemType == 'postCalcs'}
									<div class="flex items-center m-auto">
										<PostCalcsButton item={currentGears[category][currentItemType]} />
									</div>{/if}
							{/each}
						</div>
					{/each}
				</div>

				<div
					class="w-80 ml-4 flex justify-center items-center rounded border-2 w-100 border-slate-300 bg-opacity-40 bg-black p-5"
				>
					<StatsFinal />
				</div>
			</div>
			<HealthCalculator />
		{:else}
			<!--  mobile view -->
			<p
				class="text-4xl font-medium text-gray-300 text-center mt-20 pb-10"
				style="font-family: Merriweather;"
				in:fade={{ delay: 250, duration: 300 }}
				out:fade={{ delay: 250, duration: 300 }}
			>
				Gear Builder
			</p>

			<div
				class="w-80 ml-4 flex justify-center items-center rounded border-2 w-100 border-slate-300 bg-opacity-40 bg-black p-5"
			>
				<StatsFinal />
			</div>
			<div class="mt-4 flex flex-col items-center">
				<div class="mb-4">
					<GenerateCode type={'gear'} />
				</div>
				<div class="mb-4">
					<LoadCode type={'gear'} />
				</div>
				<div class="mb-10">
					<ShareButton type={'gear'} />
				</div>
				<div class="mb-4">
					<BuildsSaveButton type={'gear'} />
				</div>
				<div class="mb-4">
					<BuildsLoadButton type={'gear'} />
				</div>
				<div class="mb-10">
					<BuildsOverrideButton type={'gear'} />
				</div>
				<div class="mb-4">
					<RandomButton type={'gear'} />
				</div>

				<div class="mb-4">
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={() => {
							resetAllStores();
							storeCurrentBuild();
							playCorrect();
						}}>Clear</button
					>
				</div>
			</div>

			{#each Object.keys(currentGears) as category}
				<div class="mt-4" in:fade={{ delay: 250, duration: 300 }}>
					<GearButton
						currentItem={currentGears[category]['base']}
						currentItemType={'base'}
						category={currentGears[category]}
						categoryName={category}
						{currentGears}
						builderType={'gear'}
					/>
				</div>

				<div class="flex space-x-4">
					<GearButton
						currentItem={currentGears[category]['gem1']}
						currentItemType={'gem1'}
						category={currentGears[category]}
						categoryName={category}
						{currentGears}
						builderType={'gear'}
					/>
					<GearButton
						currentItem={currentGears[category]['gem2']}
						currentItemType={'gem2'}
						category={currentGears[category]}
						categoryName={category}
						{currentGears}
						builderType={'gear'}
					/>
					<GearButton
						currentItem={currentGears[category]['gem3']}
						currentItemType={'gem3'}
						category={currentGears[category]}
						categoryName={category}
						{currentGears}
						builderType={'gear'}
					/>
				</div>

				<div class="flex space-x-4">
					<GearButton
						currentItem={currentGears[category]['enchant']}
						currentItemType={'enchant'}
						category={currentGears[category]}
						categoryName={category}
						{currentGears}
						builderType={'gear'}
					/>
					<GearButton
						currentItem={currentGears[category]['modifier']}
						currentItemType={'modifier'}
						category={currentGears[category]}
						categoryName={category}
						{currentGears}
						builderType={'gear'}
					/>
				</div>

				<div class="flex space-x-4 mb-4">
					<PostCalcsButton item={currentGears[category]['postCalcs']} />
				</div>
			{/each}
			<HealthCalculator />
		{/if}
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
