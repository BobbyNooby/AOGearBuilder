<script lang="ts">
	import type { navigationRoute } from '../sidebar/navigationRoutes';
	import NavBarSeperator from './NavBarSeperator.svelte';
	import NavButton from './NavButton.svelte';

	let { routes, label }: { routes: navigationRoute[]; label: string } = $props();
</script>

<div class="flex w-full flex-col px-2">
	<p class="text-lg">{label}</p>
	<div class="w-full space-y-2">
		{#each routes as route}
			<NavButton item={route} />
		{/each}
	</div>
</div>
