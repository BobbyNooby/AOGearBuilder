<script lang="ts">
	import { X } from 'lucide-svelte';

	interface Props {
		label: string;
		onRemove: () => void;
	}

	let { label, onRemove }: Props = $props();
</script>

<span class="inline-flex items-center gap-1 rounded border border-white/30 bg-black px-2 py-1 text-xs text-white">
	{label}
	<button
		type="button"
		onclick={onRemove}
		class="inline-flex items-center justify-center rounded p-0.5 text-gray-400 hover:bg-white/10 hover:text-white"
		aria-label="Remove filter"
	>
		<X class="h-3 w-3" />
	</button>
</span>
