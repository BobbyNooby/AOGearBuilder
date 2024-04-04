<script>
	import '../app.css';
</script>

<section class="bg-zinc-800 app"><slot /></section>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
