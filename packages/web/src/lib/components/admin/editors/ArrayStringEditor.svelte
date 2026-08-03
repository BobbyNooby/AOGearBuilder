<script lang="ts">
	let { value = [], onChange }: { value: string[]; onChange: (v: string[]) => void } = $props();
	let input = $state('');

	function add() {
		const raw = input.split(',').map((s) => s.trim()).filter(Boolean);
		const next = [...new Set([...value, ...raw])];
		onChange(next);
		input = '';
	}

	function remove(item: string) {
		onChange(value.filter((v) => v !== item));
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			add();
		}
	}
</script>

<div class="flex flex-wrap items-center gap-2">
	{#each value as item (item)}
		<span class="inline-flex items-center gap-1 rounded border border-white/30 bg-black px-2 py-1 text-xs">
			{item}
			<button onclick={() => remove(item)} class="text-gray-400 hover:text-white">×</button>
		</span>
	{/each}
	<input
		bind:value={input}
		onkeydown={keydown}
		placeholder="Add..."
		class="min-w-[8rem] flex-1 rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white focus:border-white focus:outline-none"
	/>
	<button type="button" onclick={add} class="rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10">Add</button>
</div>
