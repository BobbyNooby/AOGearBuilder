<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Fade in initiator
	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Info</title>
	<meta name="title" content="Info" />
	<meta name="description" content="Links to discord, and data spreadsheets." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Info" />
	<meta property="og:description" content="Links to discord, and data spreadsheets." />
	<meta property="og:image" content="assets/images/icon.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Info" />
	<meta property="twitter:description" content="Links to discord, and data spreadsheets." />
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
		<ul class="items-center justify-center flex flex-col">
			<p
				class=" text-7xl font-medium text-gray-300 text-center p-4"
				style="font-family: Merriweather;"
				in:fade={{ delay: 250, duration: 300 }}
				out:fade={{ delay: 250, duration: 300 }}
			>
				Info
			</p>

			<li class="p-4">
				<button
					class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
					style="font-family: Merriweather;"
					in:fade={{ delay: 250, duration: 300 }}
					out:fade={{ delay: 250, duration: 300 }}
					on:click={() => {
						window.open('https://github.com/BobbyNooby/AOGearBuilder/');
					}}
				>
					Source Code
				</button>
			</li>

			<li class="p-4">
				<button
					class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
					style="font-family: Merriweather;"
					in:fade={{ delay: 250, duration: 300 }}
					out:fade={{ delay: 250, duration: 300 }}
					on:click={() => {
						window.open('https://discord.gg/wuczy67us7');
					}}
				>
					Discord Server
				</button>
			</li>

			<li class="p-4">
				<button
					class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
					style="font-family: Merriweather;"
					in:fade={{ delay: 250, duration: 300 }}
					out:fade={{ delay: 250, duration: 300 }}
					on:click={() => {
						window.open(
							'https://docs.google.com/spreadsheets/d/1Omh978beSVrifDPuX0WPTbOr_xgpibY39gg73IgCv78/edit?usp=sharing'
						);
					}}
				>
					Gear Spreadsheet
				</button>
			</li>

			<li class="p-4">
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
			</li>
		</ul>
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
