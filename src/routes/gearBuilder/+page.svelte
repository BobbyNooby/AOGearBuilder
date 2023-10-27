<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import GearButton from '$lib/components/gearBuilder/GearButton.svelte';
	import StatsFinal from '$lib/components/gearBuilder/StatsFinal.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import Sort from '$lib/components/Sort.svelte';
	import { resetAllStores } from '$lib/utils/statsStore';
	import GenerateCode from '$lib/components/gearBuilder/GenerateCode.svelte';
	import LoadCode from '$lib/components/gearBuilder/LoadCode.svelte';
	import ShareButton from '$lib/components/gearBuilder/ShareButton.svelte';
	import { loadCode } from '$lib/utils/statsStore';

	//Load using hash.
	function loadHash() {
		loadCode(window.location.hash.substring(1));
		history.replaceState({}, document.title, window.location.href.split('#')[0]);
	}

	// Fade in initiator. Reset stores.
	let ready = false;
	onMount(() => {
		ready = true;
		resetAllStores();
		loadHash();
	});

	let deviceWidth = 0;

	//Test device width to check for mobile conditions in the html
	onMount(() => {
		// Make sure this only works in browser
		if (typeof window !== 'undefined') {
			deviceWidth = window.innerWidth;
			window.addEventListener('resize', () => {
				deviceWidth = window.innerWidth;
			});
		}
	});

	//Define categories here for the GearButton so i can just map it out with a for loop instead of manually adding one by one.
	let categories = ['accessory1', 'accessory2', 'accessory3', 'chestplate1', 'pants1'];

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
	<meta property="og:image" content="https://i.imgur.com/axkyVz8.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Gear Builder" />
	<meta property="twitter:description" content="Gear Builder for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="https://i.imgur.com/axkyVz8.png" />

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
		{#if deviceWidth >= 768}<!--   desktop view -->
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
			<div class="flex items-center justify-between space-x-4">
				<Filter />
				<Sort />
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
				<div class="mb-4">
					<ShareButton />
				</div>
				<div class="mb-4">
					<Filter />
				</div>
				<div class="mb-4">
					<Sort />
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
