<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Fade in initiator
	let ready = false;
	onMount(() => (ready = true));
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
		<p
			class=" text-7xl font-medium text-gray-300 text-center"
			style="font-family: Merriweather;"
			in:fade={{ delay: 250, duration: 300 }}
			out:fade={{ delay: 250, duration: 300 }}
		>
			Ship Builder - WIP
		</p>

		<p
			class=" text-xl font-medium text-gray-300 text-center p-10"
			style="font-family: Merriweather;"
			in:fade={{ delay: 250, duration: 300 }}
			out:fade={{ delay: 250, duration: 300 }}
		>
			The ship database hasnt been created yet, but if you are interested in contributing data,
			click <a href="https://discord.gg/wuczy67us7" class=" text-yellow-600">here</a> to join the discord
			server.
		</p>
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
