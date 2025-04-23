<script lang="ts">
	import type { navigationRoute } from '$lib/components/sidebar/navigationRoutes';
	import HorizontalNavButton from './HorizontalNavButton.svelte';

	let { routes }: { routes: navigationRoute[] } = $props();
</script>

<div class="flex flex-row space-x-5">
	{#each routes as route}
		<HorizontalNavButton item={route} />
	{/each}
</div>
