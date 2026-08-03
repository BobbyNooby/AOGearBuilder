<script lang="ts">
	let { value = {}, onChange }: { value: Record<string, number>; onChange: (v: Record<string, number>) => void } = $props();
	let newKey = $state('');
	let newValue = $state('');

	function update() {
		onChange({ ...value });
	}

	function add() {
		if (!newKey.trim()) return;
		value[newKey.trim()] = Number(newValue) || 0;
		update();
		newKey = '';
		newValue = '';
	}

	function remove(key: string) {
		const next = { ...value };
		delete next[key];
		onChange(next);
	}

	function updateValue(key: string, raw: string) {
		value[key] = Number(raw) || 0;
		update();
	}
</script>

<div class="space-y-2">
	{#each Object.entries(value) as [key, val] (key)}
		<div class="flex items-center gap-2">
			<input
				value={key}
				readonly
				class="flex-1 rounded border border-gray-700 bg-black/50 px-2 py-1 text-sm text-gray-400"
			/>
			<input
				type="number"
				value={val}
				oninput={(e) => updateValue(key, (e.target as HTMLInputElement).value)}
				class="w-28 rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
			/>
			<button type="button" onclick={() => remove(key)} class="rounded px-2 py-1 text-red-400 hover:bg-red-900/20">×</button>
		</div>
	{/each}
	<div class="flex items-center gap-2">
		<input
			bind:value={newKey}
			placeholder="stat"
			class="flex-1 rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
		/>
		<input
			bind:value={newValue}
			type="number"
			placeholder="value"
			class="w-28 rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
		/>
		<button type="button" onclick={add} class="rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10">Add</button>
	</div>
</div>
