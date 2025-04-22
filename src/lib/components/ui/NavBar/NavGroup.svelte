<script lang="ts">
	import type { navigationRoute } from '$lib/components/sidebar/navigationRoutes';
	import NavButton from './NavButton.svelte';

	let { routes, label }: { routes: navigationRoute[]; label: string } = $props();

	const colors = {
		default: 'text-white',
		admin: 'text-yellow-200'
	};
</script>

<div class="flex w-full flex-col px-2">
	<p class="text-lg">{label}</p>
	<div class="w-full space-y-2">
		{#each routes as route}
			<NavButton item={route} />
		{/each}
	</div>
</div>
