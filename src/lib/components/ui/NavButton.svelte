<script lang="ts">
	import { goto } from '$app/navigation';

	let { item }: { item: { icon: any; title: string; url: string } } = $props();

	function navigate(url: string) {
		console.log(url);
		goto(url);
	}
</script>

<button
	class="flex w-full flex-row items-center space-x-1 rounded-md p-1 text-gray-300 transition-colors duration-150 hover:bg-gray-700 hover:text-white"
	onclick={() => navigate(item.url)}
	><item.icon class="h-4" /><span class="text-sm">{item.title}</span></button
>
