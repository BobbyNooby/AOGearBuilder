<script lang="ts">
	import { Save, Trash2 } from 'lucide-svelte';

	let {
		value,
		onSave,
		onDelete,
		saving = false,
		readOnly = false
	}: {
		value: any;
		onSave: (v: any) => void | Promise<void>;
		onDelete?: () => void | Promise<void>;
		saving?: boolean;
		readOnly?: boolean;
	} = $props();

	let text = $state('');
	let error = $state('');
	let current: any = $state(undefined);

	$effect(() => {
		if (value !== current) {
			current = value;
			text = JSON.stringify(value, null, 2);
			error = '';
		}
	});

	async function save() {
		let parsed: any;
		try {
			parsed = JSON.parse(text);
		} catch (e: any) {
			error = `Invalid JSON: ${e.message}`;
			return;
		}
		error = '';
		try {
			await onSave(parsed);
			current = parsed;
		} catch (e: any) {
			error = e.message || 'Save failed';
		}
	}

	async function del() {
		if (!onDelete) return;
		if (!confirm('Delete this record?')) return;
		try {
			await onDelete();
		} catch (e: any) {
			error = e.message || 'Delete failed';
		}
	}
</script>

<div class="flex flex-col gap-2">
	<textarea
		bind:value={text}
		readonly={readOnly}
		class="h-96 w-full rounded border border-gray-600 bg-black p-3 font-mono text-sm text-white"
		spellcheck={false}
	></textarea>

	{#if error}
		<p class="text-sm text-red-400">{error}</p>
	{/if}

	{#if !readOnly}
		<div class="flex gap-2">
			<button
				onclick={save}
				disabled={saving}
				class="flex items-center gap-1 rounded border border-white bg-black px-3 py-1 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
			>
				<Save class="h-4 w-4" />
				{saving ? 'Saving...' : 'Save'}
			</button>
			{#if onDelete}
				<button
					onclick={del}
					disabled={saving}
					class="flex items-center gap-1 rounded border border-red-500 bg-black px-3 py-1 text-sm text-red-400 hover:bg-red-900/30 disabled:opacity-50"
				>
					<Trash2 class="h-4 w-4" />
					Delete
				</button>
			{/if}
		</div>
	{/if}
</div>
