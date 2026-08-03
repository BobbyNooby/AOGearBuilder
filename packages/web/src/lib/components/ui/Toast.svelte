<script lang="ts">
	import { fade } from 'svelte/transition';

	export type Toast = { id: string; message: string; type: 'success' | 'error' };

	let { toasts }: { toasts: Toast[] } = $props();
</script>

<div class="pointer-events-none fixed right-4 top-16 z-[90] flex flex-col gap-2">
	{#each toasts as toast (toast.id)}
		<div
			transition:fade={{ duration: 200 }}
			class="pointer-events-auto rounded border px-4 py-3 text-sm shadow-lg {toast.type === 'error' ? 'border-red-500 bg-red-900/80 text-red-100' : 'border-green-500 bg-green-900/80 text-green-100'}"
		>
			{toast.message}
		</div>
	{/each}
</div>
