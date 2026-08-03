<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let {
		open = false,
		title = 'Are you sure?',
		message = 'This action cannot be undone.',
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		onConfirm,
		onCancel
	}: {
		open?: boolean;
		title?: string;
		message?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		onConfirm: () => void;
		onCancel?: () => void;
	} = $props();
</script>

{#if open}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
		transition:fade={{ duration: 150 }}
	>
		<div
			class="w-full max-w-sm rounded border border-white bg-[#26262b] p-6 shadow-lg"
			transition:scale={{ duration: 150, start: 0.95 }}
		>
			<h3 class="mb-2 text-xl" style="font-family:Merriweather,serif">{title}</h3>
			<p class="mb-6 text-sm text-gray-300">{message}</p>
			<div class="flex justify-end gap-3">
				<button
					onclick={() => onCancel?.()}
					class="rounded border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10"
				>
					{cancelLabel}
				</button>
				<button
					onclick={() => onConfirm()}
					class="rounded bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}
