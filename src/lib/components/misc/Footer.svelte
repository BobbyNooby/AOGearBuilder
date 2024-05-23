<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { isMobile } from '$lib/utils/mobileStore';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import NavGrid from './NavGrid.svelte';

	// Fade in initiator.
	let ready = false;
	onMount(() => (ready = true));

	let isMenuActive = false;

	function handleClick() {
		isMenuActive = true;
	}
</script>

<div class="always-visible fixed bottom-4 self-center z-0">
	{#if ready}
		<footer
			style="padding-top: 1rem;"
			class="mb-5 opacity-100 transition-opacity duration-300 ease-in-out w-full z-0"
			in:fly={{ y: -20, duration: 1000 }}
			out:fade={{ delay: 250, duration: 300 }}
		>
			<NavGrid showHome={true} showText={false}></NavGrid>
		</footer>
	{/if}
</div>
{#if isMenuActive}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="z-10 fixed inset-0 flex bg-black bg-opacity-90 overflow-y-auto items-center align-middle justify-center"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
		on:click={() => {
			event.stopPropagation();
		}}
	>
		<div class=" z-40">
			<NavGrid showHome={true} />
		</div>
	</div>
{/if}

<style>
	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav button {
	}
</style>
