<script lang="ts">
	import { goto } from '$app/navigation';
	import type { navigationRoute } from '$lib/components/sidebar/navigationRoutes';

	let { item }: { item: navigationRoute } = $props();
</script>

<div>
	<button onclick={() => goto(item.url)}>
		<div
			class=" flex flex-col items-center rounded-md border border-white bg-gray-800 p-2 text-center text-gray-300 transition-colors duration-150 hover:bg-gray-700"
		>
			<item.icon />
			<p>{item.title}</p>
		</div>
	</button>
</div>
