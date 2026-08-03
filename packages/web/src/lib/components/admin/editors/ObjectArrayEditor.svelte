<script lang="ts">
	import SchemaForm from '../SchemaForm.svelte';
	import type { SchemaField } from '../schema';

	let {
		value = [],
		itemSchema,
		onChange
	}: {
		value: Record<string, any>[];
		itemSchema: SchemaField[];
		onChange: (v: Record<string, any>[]) => void;
	} = $props();

	function add() {
		onChange([...value, {}]);
	}

	function update(index: number, next: Record<string, any>) {
		const arr = [...value];
		arr[index] = next;
		onChange(arr);
	}

	function remove(index: number) {
		const arr = [...value];
		arr.splice(index, 1);
		onChange(arr);
	}
</script>

<div class="space-y-4">
	{#each value as item, i (i)}
		<div class="rounded border border-white/10 bg-black/40 p-3">
			<div class="mb-2 flex items-center justify-end">
				<button type="button" onclick={() => remove(i)} class="text-xs text-red-400 hover:underline">Remove</button>
			</div>
			<SchemaForm schema={itemSchema} value={item} onChange={(next) => update(i, next)} />
		</div>
	{/each}
	<button type="button" onclick={add} class="w-full rounded border border-dashed border-white/30 py-2 text-xs text-gray-400 hover:bg-white/5">+ Add</button>
</div>
