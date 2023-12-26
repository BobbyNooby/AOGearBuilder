<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import ShipsButton from '$lib/components/shipBuilder/ShipsButton.svelte';
	import ShipStatsFinal from '$lib/components/shipBuilder/ShipStatsFinal.svelte';
	import { isMobile } from '$lib/utils/mobileStore';
	import { getCurrentShipParts, loadShipCode, resetAllShipParts } from '$lib/utils/shipStatsStore';
	import GearButton from '$lib/components/shared/GearButton.svelte';
	import { storeCurrentBuild } from '$lib/utils/statsStore';
	import { playCorrect } from '$lib/utils/sound';
	import GenerateCode from '$lib/components/shared/GenerateCode.svelte';
	import LoadCode from '$lib/components/shared/LoadCode.svelte';
	import ShareButton from '$lib/components/shared/ShareButton.svelte';
	import BuildsSaveButton from '$lib/components/shared/BuildsSaveButton.svelte';
	import BuildsLoadButton from '$lib/components/shared/BuildsLoadButton.svelte';
	import BuildsOverrideButton from '$lib/components/shared/BuildsOverrideButton.svelte';
	import RandomButton from '$lib/components/shared/RandomButton.svelte';

	//Load using hash.
	function loadHash() {
		loadShipCode(window.location.hash.substring(1));
		history.replaceState({}, document.title, window.location.href.split('#')[0]);
		storeCurrentBuild();
	}

	// Fade in initiator
	let ready = false;
	onMount(() => {
		ready = true;
		loadShipCode(localStorage.getItem('currentShipBuild'));
		loadHash();
	});

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

	let currentShipParts = getCurrentShipParts();
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
	<meta property="og:image" content="assets/images/icon.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Ship Builder" />
	<meta property="twitter:description" content="Ship Builder for Arcane Odyssey by BobbyNooby" />
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
		{#if !$isMobile}
			<p
				class=" text-7xl font-medium text-gray-300 text-center pt-20 pb-5"
				style="font-family: Merriweather;"
				in:fade={{ delay: 250, duration: 300 }}
				out:fade={{ delay: 250, duration: 300 }}
			>
				Ship Builder
			</p>

			<div>
				<div class="flex items-center justify-center space-x-4 pb-5">
					<GenerateCode type={'ship'} />
					<LoadCode type={'ship'} />
					<ShareButton type={'ship'} />
				</div>
				<div class="flex items-center justify-center space-x-4 pb-5">
					<BuildsSaveButton type={'ship'} />
					<BuildsLoadButton type={'ship'} />
					<BuildsOverrideButton type={'ship'} />
				</div>
				<div class="flex items-center justify-center space-x-4 pb-5">
					<RandomButton type={'ship'} />
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={() => {
							resetAllShipParts();
							storeCurrentBuild();
							playCorrect();
						}}>Clear</button
					>
				</div>
				<div class="w-1/3 mx-auto p-5">
					<ShipsButton />
				</div>
				<div class="flex pb-20">
					<div class="grid grid-cols-2 gap-x-20">
						<div>
							{#each Object.keys(currentShipParts) as category}
								{#if category != 'deckhands'}
									<div class="flex space-x-4">
										{#each Object.keys(currentShipParts[category]) as currentItemType}
											<GearButton
												currentItem={currentShipParts[category][currentItemType]}
												{currentItemType}
												category={currentShipParts[category]}
												categoryName={category}
												currentGears={currentShipParts}
												builderType={'ship'}
											/>
										{/each}
									</div>
								{/if}
							{/each}
						</div>

						<div>
							{#each Object.keys(currentShipParts) as category}
								{#if category == 'deckhands'}
									<div class="flex flex-col">
										{#each Object.keys(currentShipParts[category]) as currentItemType}
											<GearButton
												currentItem={currentShipParts[category][currentItemType]}
												{currentItemType}
												category={currentShipParts[category]}
												categoryName={category}
												currentGears={currentShipParts}
												builderType={'ship'}
											/>
										{/each}
									</div>
								{/if}
							{/each}
						</div>
					</div>
					<div
						class="w-80 ml-4 flex justify-center items-center rounded border-2 w-100 border-slate-300 bg-opacity-40 bg-black p-5"
					>
						<ShipStatsFinal />
					</div>
				</div>
			</div>
		{:else}
			<!-- MOBILE VIEW -->
			<p
				class="text-4xl font-medium text-gray-300 text-center mt-20 pb-10"
				style="font-family: Merriweather;"
				in:fade={{ delay: 250, duration: 300 }}
				out:fade={{ delay: 250, duration: 300 }}
			>
				Ship Builder
			</p>

			<div
				class="w-80 ml-4 flex justify-center items-center rounded border-2 w-100 border-slate-300 bg-opacity-40 bg-black p-5"
			>
				<ShipStatsFinal />
			</div>

			<div class="mt-4 flex flex-col items-center">
				<div class="mb-4">
					<GenerateCode type={'ship'} />
				</div>
				<div class="mb-4">
					<LoadCode type={'ship'} />
				</div>
				<div class="mb-10">
					<ShareButton type={'ship'} />
				</div>
				<div class="mb-4">
					<BuildsSaveButton type={'ship'} />
				</div>
				<div class="mb-4">
					<BuildsLoadButton type={'ship'} />
				</div>
				<div class="mb-10">
					<BuildsOverrideButton type={'ship'} />
				</div>
				<div class="mb-4">
					<RandomButton type={'ship'} />
				</div>

				<div class="mb-4">
					<button
						class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
						style="font-family: Merriweather;"
						on:click={() => {
							resetAllShipParts();
							storeCurrentBuild();
							playCorrect();
						}}>Clear</button
					>
				</div>
			</div>

			<div class="w-full mx-auto p-5">
				<ShipsButton />
			</div>

			<div>
				{#each Object.keys(currentShipParts) as category}
					{#if category != 'deckhands'}
						<div class="flex space-x-4">
							{#each Object.keys(currentShipParts[category]) as currentItemType}
								<GearButton
									currentItem={currentShipParts[category][currentItemType]}
									{currentItemType}
									category={currentShipParts[category]}
									categoryName={category}
									currentGears={currentShipParts}
									builderType={'ship'}
								/>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
			<div class="pt-5 pb-10">
				{#each Object.keys(currentShipParts) as category}
					{#if category == 'deckhands'}
						<div class="flex space-x-2">
							{#each Object.keys(currentShipParts[category]) as currentItemType}
								<GearButton
									currentItem={currentShipParts[category][currentItemType]}
									{currentItemType}
									category={currentShipParts[category]}
									categoryName={category}
									currentGears={currentShipParts}
									builderType={'ship'}
								/>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
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
