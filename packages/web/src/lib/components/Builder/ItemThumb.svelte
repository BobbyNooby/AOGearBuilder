<script lang="ts">
	let {
		item, fallback
	}: {
		item: Record<string, any> | null;
		fallback: string;
	} = $props();

	const imgUrl = $derived(item ? (item.image || item.imageUrl || item.imageId || '') : '');
	const label = $derived(item ? (item.name || '?') : fallback);

	let loaded = $state(false);
	let failed = $state(false);
	let currentUrl = $state('');

	$effect(() => {
		const url = imgUrl;
		currentUrl = url;
		loaded = false;
		failed = false;
		if (!url) { failed = true; return; }
		const img = new Image();
		img.src = url;
		img.onload = () => { if (currentUrl === url) loaded = true; };
		img.onerror = () => { if (currentUrl === url) failed = true; };
	});
</script>

{#if loaded}
	<img class="h-full w-full object-contain" src={imgUrl} alt={item?.name || ''} />
{:else if failed}
	<span class="flex h-full w-full items-center justify-center break-words px-0.5 text-center text-[5px] leading-tight font-bold text-white" style="font-family:Merriweather,serif">{label}</span>
{/if}
