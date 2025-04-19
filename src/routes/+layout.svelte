<script lang="ts">
	import Loader from '$lib/components/ui/Loader.svelte';
	import NavBar from '$lib/components/ui/NavBar.svelte';
	import '../app.css';
	import type { PageData } from './$types';
	let { data, children }: { data: PageData; children: () => any } = $props();
</script>

<section class="app merriweather-regular">
	<NavBar />
	<main class="main-content">
		{@render children()}
		<Loader />
	</main>
</section>

<style>
	.app {
		display: flex;
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
		flex-direction: column; /* Stack children vertically */
		height: 100vh; /* Full height of the viewport */
		width: 100%; /* Full width */
		overflow: hidden; /* Prevent scrollbars */
	}

	.main-content {
		display: flex;
		flex-direction: column; /* Ensure its children are stacked */
		justify-content: center; /* Center children vertically */
		align-items: center; /* Center children horizontally */
		width: 100%; /* Full width of the container */
		overflow: auto; /* Enable scrolling on the main content only */
	}
</style>
