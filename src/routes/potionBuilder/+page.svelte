<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Fade in initiator
	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Potion Builder</title>
	<meta name="title" content="Potion Builder" />
	<meta name="description" content="Potion Builder for Arcane Odyssey" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Potion Builder" />
	<meta property="og:description" content="Potion Builder for Arcane Odyssey" />
	<meta property="og:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Potion Builder" />
	<meta property="twitter:description" content="Potion Builder for Arcane Odyssey" />
	<meta property="twitter:image" content="https://i.imgur.com/c6n3LP1.png" />

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
		<p
			class=" text-7xl font-medium text-gray-300 text-center"
			style="font-family: Merriweather;"
			in:fade={{ delay: 250, duration: 300 }}
			out:fade={{ delay: 250, duration: 300 }}
		>
			Potion Builder - WIP
		</p>

		<p
			class=" text-xl font-medium text-gray-300 text-center p-10"
			style="font-family: Merriweather;"
			in:fade={{ delay: 250, duration: 300 }}
			out:fade={{ delay: 250, duration: 300 }}
		>
			If you are interested in contributing data to the potions database, click <a
				href="https://discord.gg/wuczy67us7"
				class=" text-yellow-600">here</a
			> to join the discord server
		</p>

		<button
			class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
			style="font-family: Merriweather;"
			in:fade={{ delay: 250, duration: 300 }}
			out:fade={{ delay: 250, duration: 300 }}
			on:click={() => {
				window.open(
					'https://docs.google.com/spreadsheets/d/1-pP65mFfwWAFRMXqtNFN1p-syiS7d1jX-n6FOEaxQjU/edit?usp=sharing'
				);
			}}
		>
			Potions Spreadsheet
		</button>
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
