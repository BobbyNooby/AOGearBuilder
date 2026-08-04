<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { Cog, Library, Package, Settings } from 'lucide-svelte';
	import { hasAnyPermission, PERMISSIONS } from '@aotools/shared';

	const permissions: string[] = $derived(page.data.permissions ?? []);

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

	const appLinks = [
		{ href: '/builder', label: 'Gear Builder', icon: Cog, desc: 'Design and share your gear builds' },
		{ href: '/atlas', label: 'Atlas', icon: Library, desc: 'Browse and search all items' }
	];

	const adminLinks = $derived(
		[
			...(canAccessGameAdmin
				? [{ href: '/admin', label: 'Game Data', icon: Package, desc: 'Manage items, modifiers, and config' }]
				: []),
			...(canAccessPlatformAdmin
				? [
						{
							href: '/admin/platform',
							label: 'Platform',
							icon: Settings,
							desc: 'Manage users, roles, and API keys'
						}
					]
				: [])
		]
	);
</script>

<svelte:head>
	<title>Arcane Odyssey Tools</title>
	<meta name="title" content="Arcane Odyssey Tools" />
	<meta name="description" content="Various Tools for Arcane Odyssey by BobbyNooby" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Arcane Odyssey Tools" />
	<meta property="og:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="og:image" content="https://i.imgur.com/c6n3LP1.png" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Arcane Odyssey Tools" />
	<meta property="twitter:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="https://i.imgur.com/c6n3LP1.png" />
</svelte:head>

<div
	in:fade={{ duration: 1000 }}
	class="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-6 p-4 text-white"
>
	<img src="/logo.png" alt="Arcane Odyssey Tools" class="h-64 w-64" />

	<p class="text-6xl" style="font-family:Merriweather,serif">Arcane Odyssey Tools</p>

	<div class="w-full max-w-xl px-3">
		<div class="h-[1px] w-full bg-white"></div>
	</div>

	<div class="w-full max-w-2xl space-y-8">
		<section>
			<p class="mb-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500">App</p>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each appLinks as link}
					<a
						href={link.href}
						class="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 hover:border-white/20"
					>
						<link.icon class="h-8 w-8 text-white" />
						<span class="text-lg font-semibold text-white">{link.label}</span>
						<span class="text-sm text-gray-400">{link.desc}</span>
					</a>
				{/each}
			</div>
		</section>

		{#if showAdminSection}
			<div class="h-[1px] w-full bg-white/10"></div>
			<section>
				<p class="mb-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Admin</p>
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{#each adminLinks as link}
						<a
							href={link.href}
							class="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 hover:border-white/20"
						>
							<link.icon class="h-8 w-8 text-white" />
							<span class="text-lg font-semibold text-white">{link.label}</span>
							<span class="text-sm text-gray-400">{link.desc}</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>
