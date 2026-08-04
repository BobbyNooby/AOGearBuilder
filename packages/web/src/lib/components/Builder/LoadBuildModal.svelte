<script lang="ts">
	import { fade } from 'svelte/transition';
	import BuildPreviewCard from './BuildPreviewCard.svelte';
	import { loadLocalBuildsRaw, deleteLocalBuild } from '$lib/buildStorage';
	import { apiClient } from '$lib/api/client';
	import { authClient } from '$lib/auth/client';
	import type { BuildObject, GameConfig } from '@aotools/shared';

	let {
		show, tab: initialTab, allItems, modifiers, config, onClose, onLoad
	}: {
		show: boolean;
		tab: 'local' | 'online';
		allItems: Record<string, any>[];
		modifiers: Record<string, any>[];
		config: GameConfig;
		onClose: () => void;
		onLoad: (build: BuildObject) => void;
	} = $props();

	const session = authClient.useSession();
	let activeTab = $state<'local' | 'online'>('local');
	let localBuilds = $state<any[]>([]);
	let onlineBuilds = $state<any[]>([]);
	let loading = $state(false);
	let error = $state('');

	$effect(() => {
		activeTab = initialTab;
	});

	function loadLocal() {
		localBuilds = loadLocalBuildsRaw();
	}

	function loadOnline() {
		if (!$session.data) {
			error = 'Sign in to load online builds';
			return;
		}
		loading = true;
		error = '';
		apiClient('/api/builds/me')
			.then((builds) => {
				onlineBuilds = builds.map((b: any) => ({
					...b,
					savedAt: b.updatedAt || b.createdAt,
					source: 'online',
					id: b.shortId
				}));
			})
			.catch((e) => { error = e.message || 'Failed to load online builds'; })
			.finally(() => { loading = false; });
	}

	$effect(() => {
		if (show) {
			loadLocal();
			if (activeTab === 'online') loadOnline();
		}
	});

	function switchTab(t: 'local' | 'online') {
		activeTab = t;
		error = '';
		if (t === 'online' && onlineBuilds.length === 0) loadOnline();
	}

	function handleLoad(build: BuildObject) {
		onLoad(build);
		close();
	}

	function handleDeleteLocal(id: string) {
		deleteLocalBuild(id);
		localBuilds = localBuilds.filter((b: any) => b.id !== id);
	}

	function handleDeleteOnline(shortId: string) {
		if (typeof window !== 'undefined' && !confirm('Delete this build from the server?')) return;
		apiClient(`/api/builds/${encodeURIComponent(shortId)}`, { method: 'DELETE' })
			.then(() => {
				onlineBuilds = onlineBuilds.filter((b: any) => b.shortId !== shortId);
			})
			.catch((e) => { error = e.message || 'Delete failed'; });
	}

	function close() {
		error = '';
		onClose();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	const builds = $derived(activeTab === 'local' ? localBuilds : onlineBuilds);
	const empty = $derived(builds.length === 0 && !loading);
</script>

{#if show}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
		onclick={close}
		onkeydown={onKeydown}
		role="dialog"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex h-[90vh] w-full max-w-3xl flex-col rounded border border-white/30 bg-zinc-950 p-6"
			onclick={(e) => e.stopPropagation()}
			transition:fade={{ duration: 150 }}
		>
			<h2 class="mb-4 text-xl font-bold text-white" style="font-family:Merriweather,serif">
				Load Builds
			</h2>

			<div class="mb-4 flex gap-1">
				<button
					onclick={() => switchTab('local')}
					class="border px-4 py-1.5 text-sm {activeTab === 'local' ? 'border-white bg-white/10 text-white' : 'border-white/30 text-white/60'}"
					style="font-family:'Open Sans',sans-serif"
				>Local</button>
				<button
					onclick={() => switchTab('online')}
					class="border px-4 py-1.5 text-sm {activeTab === 'online' ? 'border-white bg-white/10 text-white' : 'border-white/30 text-white/60'}"
					style="font-family:'Open Sans',sans-serif"
				>Online</button>
			</div>

			{#if error}
				<p class="mb-4 text-sm text-red-400" style="font-family:'Open Sans',sans-serif">{error}</p>
			{/if}

			<div class="flex-1 overflow-y-auto">
				{#if loading}
					<p class="py-8 text-center text-sm text-white/40" style="font-family:'Open Sans',sans-serif">Loading...</p>
				{:else if activeTab === 'online' && !$session.data}
					<p class="py-8 text-center text-sm text-white/40" style="font-family:'Open Sans',sans-serif">Sign in to see online builds</p>
				{:else if empty}
					<p class="py-8 text-center text-sm text-white/40" style="font-family:'Open Sans',sans-serif">No saved builds</p>
				{:else}
					<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{#each builds as build (build.id || build.shortId)}
							{@const buildData = build.build || build}
							<div class="relative">
								<button
									onclick={() => activeTab === 'local' ? handleDeleteLocal(build.id) : handleDeleteOnline(build.shortId)}
									class="absolute right-2 top-2 z-10 text-lg text-white/40 hover:text-red-400"
									title="Delete">&times;</button>
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div
									onclick={() => handleLoad(buildData)}
									onkeydown={(e) => { if (e.key === 'Enter') handleLoad(buildData); }}
									class="cursor-pointer transition-colors hover:[&>*]:border-white/50"
									role="button"
									tabindex="0"
								>
									<BuildPreviewCard
										name={build.name || 'Untitled'}
										build={buildData}
										{allItems}
										{modifiers}
										{config}
										savedAt={build.savedAt || ''}
										source={activeTab}
										compact
									/>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="mt-4 flex justify-end">
				<button
					onclick={close}
					class="border border-white/30 px-4 py-2 text-sm text-white/70"
					style="font-family:'Open Sans',sans-serif"
				>Close</button>
			</div>
		</div>
	</div>
{/if}
