<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import NavGrid from '$lib/components/misc/NavGrid.svelte';

	// Fade in initiator
	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Arcane Odyssey Tools</title>
	<meta name="title" content="Arcane Odyssey Tools" />
	<meta name="description" content="Various Tools for Arcane Odyssey by BobbyNooby" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Arcane Odyssey Tools" />
	<meta property="og:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="og:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Arcane Odyssey Tools" />
	<meta property="twitter:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Meta Tags Generated with https://metatags.io -->

	<!-- Google Fonts Link -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Open+Sans:wght@700&display=swap"
		rel="stylesheet"
	/>

	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1741484020713413"
		crossorigin="anonymous"
	></script>
</svelte:head>

<section class=" items-center snap-center justify-center w-full h-full">
	{#if ready}
		<div class="flex flex-col items-center justify-center w-full h-full align-center mt-48">
			<img
				src="https://i.imgur.com/c6n3LP1.png"
				alt="logo"
				in:fly={{ y: 20, duration: 2000 }}
				style="padding-top: 3rem;"
			/>

			<p
				class=" text-7xl font-medium text-gray-300 text-center"
				style="font-family: Merriweather;"
				in:fly={{ y: 20, duration: 3000 }}
				out:fade={{ delay: 250, duration: 300 }}
			>
				Arcane Odyssey Tools
			</p>

			<!-- No navbar component as i want this to be a little different -->

			<NavGrid showHome={false} showText={true} />
		</div>
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
