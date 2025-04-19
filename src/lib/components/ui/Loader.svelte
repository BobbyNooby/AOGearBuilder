<script>
	import { navigating } from '$app/state';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

{#if navigating.complete}
	<div
		class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black opacity-95"
		style="z-index: 999;"
		in:fade={{ duration: 100, easing: cubicInOut }}
		out:fade={{ duration: 100, easing: cubicInOut }}
	>
		<img src="/logo.png" alt="Arcane Odyssey Tools" class=" rotating-image h-96 w-96" />
	</div>
{/if}

<style>
	.rotating-image {
		animation: rotate 2s steps(72) infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate3d(0, 0, 0, 0deg);
		}
		to {
			transform: rotate3d(0, 1, 0, 360deg);
		}
	}
</style>
