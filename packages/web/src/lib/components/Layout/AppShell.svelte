<script lang="ts">
	import { Menu, Shield } from 'lucide-svelte';
	import { authClient } from '$lib/auth/client';
	import Sidebar from './Sidebar.svelte';
	import { hasAnyPermission, PERMISSIONS } from '@aotools/shared';

	let { children, user, permissions } = $props<{
		children: any;
		user: any;
		permissions: string[];
	}>();
	let sidebarOpen = $state(false);
	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
	function closeSidebar() {
		sidebarOpen = false;
	}

	const session = authClient.useSession();
	const isAdmin = $derived(hasAnyPermission(permissions, [PERMISSIONS.ADMIN_PANEL]));
	const canAccessAdminArea = $derived(
		hasAnyPermission(permissions, [
			PERMISSIONS.ADMIN_PANEL,
			PERMISSIONS.ITEMS_READ,
			PERMISSIONS.MODIFIERS_READ,
			PERMISSIONS.CONFIG_READ,
			PERMISSIONS.FORMULAS_READ,
			PERMISSIONS.USERS_READ,
			PERMISSIONS.ROLES_READ,
			PERMISSIONS.KEYS_READ,
			PERMISSIONS.INTERNAL_KEYS_READ,
			PERMISSIONS.ADMIN_IDS_READ
		])
	);
</script>

<div class="flex min-h-screen flex-col bg-[#26262b] text-white">
	<!-- Top header -->
	<header class="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/20 bg-black/60 px-4 backdrop-blur">
		<div class="flex items-center gap-3">
			<button
				onclick={toggleSidebar}
				class="rounded p-1 hover:bg-white/10"
				aria-label="Toggle menu"
				aria-expanded={sidebarOpen}
			>
				<Menu class="h-6 w-6" />
			</button>
			<a href="/" class="flex items-center gap-2">
				<img src="/logo.png" alt="" class="h-8 w-8" />
			</a>
		</div>

		<div class="flex items-center gap-3">
			{#if canAccessAdminArea}
				<a href="/admin" class="hidden items-center gap-1 rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10 md:flex">
					<Shield class="h-3 w-3" />
					Admin
				</a>
			{/if}
			{#if $session.data}
				<span class="text-sm text-gray-300">{$session.data.user.name}</span>
				<button
					onclick={() => authClient.signOut()}
					class="rounded border border-white/30 px-3 py-1 text-xs hover:bg-white/10"
				>
					Sign out
				</button>
			{:else}
				<button
					onclick={() => authClient.signIn.social({ provider: 'discord', callbackURL: `${window.location.origin}/` })}
					class="rounded bg-[#5865F2] px-3 py-1 text-xs font-bold hover:bg-[#4752C4]"
				>
					Sign in
				</button>
			{/if}
		</div>
	</header>

	<div class="flex flex-1 pt-14">
	{#if sidebarOpen}
		<button
			type="button"
			class="fixed inset-0 z-40 cursor-default bg-black/70 md:hidden"
			onclick={closeSidebar}
			aria-label="Close menu"
		></button>
	{/if}

	<!-- Sidebar panel -->
	<aside
		class="fixed bottom-0 left-0 top-14 z-50 w-60 overflow-y-auto border-r border-white/20 bg-black/40 backdrop-blur transition-transform duration-200 md:z-30 {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
		aria-hidden={!sidebarOpen}
		inert={!sidebarOpen}
	>
		<Sidebar {permissions} onNavigate={closeSidebar} />
	</aside>

		<!-- Main content -->
		<main class="flex-1 transition-all duration-200 {sidebarOpen ? 'md:ml-60' : ''}">
			{@render children()}
		</main>
	</div>
</div>
