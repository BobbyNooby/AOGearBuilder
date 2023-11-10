<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import GearButton from '$lib/components/gearBuilder/GearButton.svelte';
	import StatsFinal from '$lib/components/gearBuilder/StatsFinal.svelte';
	import { resetAllStores, storeCurrentBuild } from '$lib/utils/statsStore';
	import GenerateCode from '$lib/components/gearBuilder/GenerateCode.svelte';
	import LoadCode from '$lib/components/gearBuilder/LoadCode.svelte';
	import RandomButton from '$lib/components/gearBuilder/RandomButton.svelte';
	import ShareButton from '$lib/components/gearBuilder/ShareButton.svelte';
	import { loadCode } from '$lib/utils/statsStore';
	import { isMobile } from '$lib/utils/mobileStore';
	import { playCorrect } from '$lib/utils/sound';
	import BuildsSaveButton from '$lib/components/gearBuilder/BuildsSaveButton.svelte';
	import BuildsLoadButton from '$lib/components/gearBuilder/BuildsLoadButton.svelte';

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

	let deviceWidth = 0;

	function checkMobile() {
		if (window.innerWidth < 768) {
			$isMobile = true;
		} else {
			$isMobile = false;
		}
	}

	//Test device width to check for mobile conditions in the html
	onMount(() => {
		// Make sure this only works in browser
		if (typeof window !== 'undefined') {
			checkMobile();
			window.addEventListener('resize', () => {
				checkMobile();
			});
		}
	});

	//Define categories here for the GearButton so i can just map it out with a for loop instead of manually adding one by one.
	const categories = ['accessory1', 'accessory2', 'accessory3', 'chestplate1', 'pants1'];

	let filterType = 'all';
	let sortType = 'default';
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
				<GenerateCode />
				<LoadCode />
				<ShareButton />
			</div>
			<div class="flex items-center justify-center space-x-4 pb-5">
				<BuildsSaveButton />
				<BuildsLoadButton />
			</div>
			<div class="flex items-center justify-center space-x-4 pb-5">
				<RandomButton />
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
					{#each categories as category (category)}
						<div class="flex space-x-4">
							<GearButton {category} {filterType} {sortType} />

							{#each [1, 2, 3] as gemNumber}
								<GearButton category={`${category}Gem${gemNumber}`} {filterType} {sortType} />
							{/each}

							<GearButton category={`${category}Enchant`} {filterType} {sortType} />
							<GearButton category={`${category}Modifier`} {filterType} {sortType} />
						</div>
					{/each}
				</div>

				<div
					class="w-80 ml-4 flex justify-center items-center rounded border-2 w-100 border-slate-300 bg-opacity-40 bg-black p-5"
				>
					<StatsFinal />
				</div>
			</div>
		{:else}
			<!--  mobile view -->
			<p
				class="text-4xl font-medium text-gray-300 text-center mt-20"
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
					<GenerateCode />
				</div>
				<div class="mb-4">
					<LoadCode />
				</div>
				<div class="mb-10">
					<ShareButton />
				</div>
				<div class="mb-4">
					<BuildsSaveButton />
				</div>
				<div class="mb-10">
					<BuildsLoadButton />
				</div>
				<div class="mb-4">
					<RandomButton />
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

			{#each categories as category (category)}
				<div class="mt-4" in:fade={{ delay: 250, duration: 300 }}>
					<GearButton {category} />
				</div>

				<div class="flex space-x-4">
					{#each [1, 2, 3] as gemNumber}
						<GearButton category={`${category}Gem${gemNumber}`} />
					{/each}
				</div>

				<div class="flex space-x-4 mb-4">
					<GearButton category={`${category}Enchant`} />
					<GearButton category={`${category}Modifier`} />
				</div>
			{/each}
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
