<script lang="ts">
	import { page } from '$app/state';
	import { appLinks, getAdminLinks, hasAdminAccess } from '$lib/navigation';

	let { permissions, onNavigate }: { permissions: string[]; onNavigate?: () => void } = $props();

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	const adminLinks = $derived(getAdminLinks(permissions));
	const showAdminSection = $derived(hasAdminAccess(permissions));
</script>

<nav class="p-3">
	<ul class="space-y-1">
		{#each appLinks as link}
			<li>
				<a
					href={link.href}
					onclick={onNavigate}
					class="flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors {isActive(link.href) ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
				>
					<link.icon class="h-4 w-4" />
					{link.label}
				</a>
			</li>
		{/each}
	</ul>

	{#if showAdminSection}
		<div class="my-4 border-t border-white/10"></div>
		<p class="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">Admin</p>
		<ul class="space-y-1">
			{#each adminLinks as link}
				<li>
					<a
						href={link.href}
						onclick={onNavigate}
						class="flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors {isActive(link.href) ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
					>
						<link.icon class="h-4 w-4" />
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>
