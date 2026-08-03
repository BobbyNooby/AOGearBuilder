<script lang="ts">
	import { page } from '$app/state';
	import { Home, Cog, KeyRound, Package, FileJson, Users, Server, Shield, List, Settings } from 'lucide-svelte';
	import { hasAnyPermission, PERMISSIONS } from '@aotools/shared';

	let { permissions, onNavigate }: { permissions: string[]; onNavigate?: () => void } = $props();

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	const appLinks = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/builder', label: 'Gear Builder', icon: Cog },
		{ href: '/itemlist', label: 'Item List', icon: List }
	];

	const gameAdminLink = { href: '/admin', label: 'Game Data', icon: Package };
	const platformAdminLink = { href: '/admin/platform', label: 'Platform', icon: Settings };

	const canAccessGameAdmin = $derived(
		hasAnyPermission(permissions, [
			PERMISSIONS.ITEMS_READ,
			PERMISSIONS.MODIFIERS_READ,
			PERMISSIONS.CONFIG_READ,
			PERMISSIONS.FORMULAS_READ
		])
	);

	const canAccessPlatformAdmin = $derived(
		hasAnyPermission(permissions, [
			PERMISSIONS.ADMIN_PANEL,
			PERMISSIONS.USERS_READ,
			PERMISSIONS.ROLES_READ,
			PERMISSIONS.KEYS_READ,
			PERMISSIONS.INTERNAL_KEYS_READ,
			PERMISSIONS.ADMIN_IDS_READ
		])
	);

	const showAdminSection = $derived(canAccessGameAdmin || canAccessPlatformAdmin);
</script>

<nav class="p-3">
	<p class="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">App</p>
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
			{#if canAccessGameAdmin}
				<li>
					<a
						href={gameAdminLink.href}
						onclick={onNavigate}
						class="flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors {isActive(gameAdminLink.href) ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
					>
						<gameAdminLink.icon class="h-4 w-4" />
						{gameAdminLink.label}
					</a>
				</li>
			{/if}
			{#if canAccessPlatformAdmin}
				<li>
					<a
						href={platformAdminLink.href}
						onclick={onNavigate}
						class="flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors {isActive(platformAdminLink.href) ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
					>
						<platformAdminLink.icon class="h-4 w-4" />
						{platformAdminLink.label}
					</a>
				</li>
			{/if}
		</ul>
	{/if}
</nav>