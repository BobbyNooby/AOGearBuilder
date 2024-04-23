<script>
	import Footer from '$lib/components/misc/Footer.svelte';
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

<section class="bg-zinc-800 overflow-auto app">
	<main><slot /></main>
	<Footer />
</section>

<style>
	.app {
		display: flex;
		width: 100%;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
