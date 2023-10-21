<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Ship Builder</title>
	<meta name="description" content="Svelte demo app" />
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
