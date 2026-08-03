<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let {
		title,
		color = '#ffffff',
		defaultOpen = false,
		children
	}: {
		title: string;
		color?: string;
		defaultOpen?: boolean;
		children: any;
	} = $props();

	// svelte-ignore state_referenced_locally
	let open = $state(defaultOpen);
</script>

<div class="overflow-hidden rounded border border-white/10 bg-black/30" style="border-left: 3px solid {color}">
	<button
		onclick={() => open = !open}
		class="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-white/5"
	>
		<span class="text-sm font-medium text-gray-200" style="font-family:Merriweather,serif">{title}</span>
		{#if open}
			<ChevronUp class="h-4 w-4 text-gray-400" />
		{:else}
			<ChevronDown class="h-4 w-4 text-gray-400" />
		{/if}
	</button>
	{#if open}
		<div class="border-t border-white/10 p-3" transition:slide={{ duration: 200 }}>
			{@render children()}
		</div>
	{/if}
</div>
