<script>
	import '../styles.css';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app bg-zinc-800">
	<main>
		<slot />
		<Footer />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
