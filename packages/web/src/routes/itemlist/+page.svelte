<script lang="ts">
	import MenuItem from '$lib/components/MenuItem.svelte';
	let { data }: { data: { items: any[] } } = $props();
	let search = $state('');

	let filtered = $derived(
		data.items.filter((i: any) =>
			!search || (i.name || '').toLowerCase().includes(search.toLowerCase())
		)
	);
</script>

<svelte:head><title>Items — AO Tools</title></svelte:head>

<div class="p-4">
	<h1 class="mb-4 text-xl font-bold text-white" style="font-family:Merriweather,serif">Item List</h1>

	<input
		type="text"
		placeholder="Search {data.items.length} items..."
		bind:value={search}
		class="mb-4 w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-[#c9d1d9] outline-none focus:border-[#58a6ff]"
	/>

	<p class="mb-3 text-xs text-[#8b949e]">{filtered.length} / {data.items.length} items</p>

	<div class="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
		{#each filtered as item}
			<MenuItem {item} />
		{/each}
	</div>

	{#if filtered.length === 0 && data.items.length > 0}
		<p class="mt-4 text-center text-sm text-[#8b949e]">No items match "{search}"</p>
	{/if}
</div>
