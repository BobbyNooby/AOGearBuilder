<script lang="ts">
	import TooltipTrigger from '$lib/components/ui/TooltipTrigger.svelte';
	import { onMount } from 'svelte';

	let container: HTMLElement;
	onMount(() => {
		container = document.documentElement;
	});
</script>

{#snippet Button()}
	<div class="h-full w-10 bg-white"></div>
{/snippet}

{#snippet HoverStuff()}
	<div
		class="h-full w-full rounded-md border-2 border-white bg-black bg-opacity-25 p-1 text-center text-white"
	>
		<p>LigmaBallz</p>
	</div>
{/snippet}

<TooltipTrigger
	triggerSnippet={Button}
	tooltipContent={HoverStuff}
	cursorOffset={{ x: 20, y: 0 }}
	containerElement={container}
	tooltipWidth={300}
/>
