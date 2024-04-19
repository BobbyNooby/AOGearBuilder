<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { isMobile } from '$lib/utils/mobileStore';
	import Analytics from '$lib/utils/Analytics.svelte';
	import { Toaster } from 'svelte-french-toast';

	function checkMobile() {
		console.log(window.innerWidth);
		if (window.innerWidth < 1072) {
			$isMobile = true;
			console.log($isMobile);
		} else {
			$isMobile = false;
			console.log($isMobile);
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
</script>

<svelte:head>
	<!-- Google Fonts Link -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Eagle+Lake&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Toaster />

<section class="bg-zinc-800 overflow-auto app">
	<Analytics />
	<main><slot /></main>
</section>

<style>
	.app {
		display: flex;
		width: 100%;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
