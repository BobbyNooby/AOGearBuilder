<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let {
		title,
		icon: Icon,
		defaultOpen = false,
		children
	}: {
		title: string;
		icon: any;
		defaultOpen?: boolean;
		children: any;
	} = $props();

	// svelte-ignore state_referenced_locally
	let open = $state(defaultOpen);
</script>

<div class="rounded border border-white/30 bg-black/40">
	<button
		onclick={() => open = !open}
		class="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/5"
	>
		<div class="flex items-center gap-2">
			<Icon class="h-4 w-4 text-gray-300" />
			<span class="font-medium" style="font-family:Merriweather,serif">{title}</span>
		</div>
		{#if open}
			<ChevronUp class="h-4 w-4 text-gray-300" />
		{:else}
			<ChevronDown class="h-4 w-4 text-gray-300" />
		{/if}
	</button>
	{#if open}
		<div class="border-t border-white/10 p-4" transition:slide={{ duration: 200 }}>
			{@render children()}
		</div>
	{/if}
</div>