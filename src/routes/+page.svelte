<script lang="ts">
	import { page } from '$app/state';
	import { navigationRoutes } from '$lib/components/sidebar/navigationRoutes';
	import BarSeperator from '$lib/components/ui/BarSeperator.svelte';
	import HorizontalNav from '$lib/components/ui/MainPage/HorizontalNav.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const publicRoutes = navigationRoutes.public;
	const adminRoutes = navigationRoutes.admin;
	const devRoutes = navigationRoutes.developer;

	function getDelayFromOrder(order: number) {
		return order * 100;
	}

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
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
</svelte:head>

{#if ready}
	<div in:fade={{ duration: 1000 }} class="flex flex-col items-center space-y-4 text-white">
		<img src="/logo.png" alt="Arcane Odyssey Tools" class="h-64 w-64" />
		<p class="text-6xl">Arcane Odyssey Tools</p>
		<BarSeperator />
		<p class="text-3xl">Tools</p>
		<HorizontalNav routes={publicRoutes} />
		<BarSeperator />
		<p class="text-3xl">Developer Tools</p>
		<HorizontalNav routes={devRoutes} />

		{#if ready && page.data.session && page.data.isAdmin}
			<BarSeperator />
			<p class="text-3xl">Admin</p>
			<HorizontalNav routes={adminRoutes} />
		{/if}
	</div>
{/if}
