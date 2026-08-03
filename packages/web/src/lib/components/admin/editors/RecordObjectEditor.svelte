<script lang="ts">
	import SchemaForm from '../SchemaForm.svelte';
	import type { SchemaField } from '../schema';

	let {
		value = {},
		valueSchema,
		onChange
	}: {
		value: Record<string, Record<string, any>>;
		valueSchema: SchemaField[];
		onChange: (v: Record<string, Record<string, any>>) => void;
	} = $props();

	let newKey = $state('');

	function add() {
		if (!newKey.trim() || value[newKey.trim()]) return;
		value[newKey.trim()] = {};
		onChange({ ...value });
		newKey = '';
	}

	function update(key: string, next: Record<string, any>) {
		value[key] = next;
		onChange({ ...value });
	}

	function remove(key: string) {
		const next = { ...value };
		delete next[key];
		onChange(next);
	}
</script>

<div class="space-y-4">
	{#each Object.entries(value) as [key, val] (key)}
		<div class="rounded border border-white/10 bg-black/40 p-3">
			<div class="mb-2 flex items-center justify-between">
				<span class="font-mono text-sm font-bold">{key}</span>
				<button type="button" onclick={() => remove(key)} class="text-xs text-red-400 hover:underline">Remove</button>
			</div>
			<SchemaForm schema={valueSchema} value={val} onChange={(next) => update(key, next)} />
		</div>
	{/each}
	<div class="flex gap-2">
		<input
			bind:value={newKey}
			placeholder="New entry key"
			class="flex-1 rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
		/>
		<button type="button" onclick={add} class="rounded border border-white/30 px-3 py-1 text-xs hover:bg-white/10">Add</button>
	</div>
</div>
