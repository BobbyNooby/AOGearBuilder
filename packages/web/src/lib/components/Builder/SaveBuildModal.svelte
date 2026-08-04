<script lang="ts">
	import { fade } from 'svelte/transition';
	import BuildPreviewCard from './BuildPreviewCard.svelte';
	import { saveLocalBuild } from '$lib/buildStorage';
	import { apiClient } from '$lib/api/client';
	import { authClient } from '$lib/auth/client';
	import type { BuildManager } from '$lib/builder/BuildManager.svelte';
	import type { SavedBuild } from '@aotools/shared';

	let {
		show, mode, bm, shortId, onClose, onSaved
	}: {
		show: boolean;
		mode: 'local' | 'online';
		bm: BuildManager;
		shortId?: string;
		onClose: () => void;
		onSaved: (msg: string) => void;
	} = $props();

	const session = authClient.useSession();
	let name = $state('');
	let saving = $state(false);
	let error = $state('');

	function reset() {
		name = '';
		saving = false;
		error = '';
	}

	async function handleSave() {
		if (!name.trim()) { error = 'Enter a name'; return; }
		saving = true;
		error = '';

		try {
			if (mode === 'local') {
				const saved: SavedBuild = {
					id: crypto.randomUUID(),
					name: name.trim(),
					version: '2026.1',
					build: bm.toBuildObject(),
					savedAt: new Date().toISOString(),
					source: 'local'
				};
				saveLocalBuild(saved);
				onSaved('Saved to this browser');
			} else {
				if (!$session.data) {
					error = 'Sign in to save online';
					saving = false;
					return;
				}
				if (shortId) {
					await apiClient(`/api/builds/${encodeURIComponent(shortId)}`, {
						method: 'PATCH',
						body: JSON.stringify({ name: name.trim(), build: bm.toBuildObject(), isPublic: true })
					});
					onSaved('Online build updated');
				} else {
					const res = await apiClient('/api/builds', {
						method: 'POST',
						body: JSON.stringify({ type: 'gear', name: name.trim(), build: bm.toBuildObject(), isPublic: true })
					});
					const shortUrl = `${window.location.origin}/b/${res.shortId}`;
					await navigator.clipboard.writeText(shortUrl);
					onSaved('Saved online — short link copied');
				}
			}
			close();
		} catch (e: any) {
			error = e.message || 'Save failed';
		} finally {
			saving = false;
		}
	}

	function close() {
		reset();
		onClose();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
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
			class="w-full max-w-md rounded border border-white/30 bg-zinc-950 p-6"
			onclick={(e) => e.stopPropagation()}
			transition:fade={{ duration: 150 }}
		>
			<h2 class="mb-4 text-xl font-bold text-white" style="font-family:Merriweather,serif">
				Save Build — {mode === 'local' ? 'Browser' : 'Online'}
			</h2>

			<div class="mb-4">
				<BuildPreviewCard
					name="Current Build"
					build={bm.toBuildObject()}
					allItems={bm.allItems}
					modifiers={bm.modifiers}
					config={bm.config}
					savedAt={new Date().toISOString()}
					source={mode}
					compact
				/>
			</div>

			<div class="mb-4">
				<label
					for="save-build-name"
					class="mb-1 block text-sm text-white/70"
					style="font-family:'Open Sans',sans-serif"
				>Build Name</label>
				<input
					id="save-build-name"
					type="text"
					bind:value={name}
					placeholder="My Build"
					class="w-full border border-white/30 bg-black px-3 py-2 text-sm text-white outline-none focus:border-white/60"
					style="font-family:'Open Sans',sans-serif"
					onkeydown={(e) => { if (e.key === 'Enter') handleSave(); }}
				/>
			</div>

			{#if mode === 'online' && !$session.data}
				<p class="mb-4 text-sm text-yellow-400" style="font-family:'Open Sans',sans-serif">
					Sign in required to save online
				</p>
			{/if}

			{#if error}
				<p class="mb-4 text-sm text-red-400" style="font-family:'Open Sans',sans-serif">{error}</p>
			{/if}

			<div class="flex justify-end gap-3">
				<button
					onclick={close}
					class="border border-white/30 bg-black px-4 py-2 text-sm text-white/70"
					style="font-family:'Open Sans',sans-serif"
				>Cancel</button>
				<button
					onclick={handleSave}
					disabled={saving || !name.trim() || (mode === 'online' && !$session.data)}
					class="border border-white bg-black px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
					style="font-family:Merriweather,serif"
				>{saving ? 'Saving...' : 'Save'}</button>
			</div>
		</div>
	</div>
{/if}
