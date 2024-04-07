<script>
	import '../app.css';
</script>

<section class="bg-zinc-800 overflow-auto app"><slot /></section>

<style>
	.app {
		display: flex;
		width: 100%;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
