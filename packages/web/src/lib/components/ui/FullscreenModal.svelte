<script lang="ts">
	import { X } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';

	let {
		open,
		title,
		onClose,
		children
	}: {
		open: boolean;
		title: string;
		onClose: () => void;
		children: any;
	} = $props();
</script>

{#if open}
	<div
		class="fixed inset-0 z-[80] flex flex-col bg-[#26262b] p-4 md:p-8"
		transition:fade={{ duration: 150 }}
	>
		<div
			class="flex flex-1 flex-col overflow-hidden rounded border border-white bg-black/40"
			transition:scale={{ duration: 150, start: 0.98 }}
		>
			<div class="flex items-center justify-between border-b border-white/20 px-4 py-3 md:px-6 md:py-4">
				<h2 class="text-xl md:text-2xl" style="font-family:Merriweather,serif">{title}</h2>
				<button
					onclick={onClose}
					class="rounded p-2 hover:bg-white/10"
					aria-label="Close"
				>
					<X class="h-5 w-5 md:h-6 md:w-6" />
				</button>
			</div>
			<div class="flex-1 overflow-auto p-4 md:px-6 md:py-4">
				{@render children()}
			</div>
		</div>
	</div>
{/if}