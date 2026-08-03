<script lang="ts">
	import GearSlot from '$lib/components/Builder/GearSlot.svelte';
	import BuildStats from '$lib/components/Builder/BuildStats.svelte';
	import PlayerStatMenu from '$lib/components/Builder/PlayerStatMenu.svelte';
	import { BuildManager } from '$lib/builder/BuildManager.svelte';
	import { saveLocalBuild } from '$lib/buildStorage';
	import { apiClient } from '$lib/api/client';
	import { authClient } from '$lib/auth/client';
	import { Share2, Download, Upload, Link } from 'lucide-svelte';

	let { data }: { data: Record<string, any> } = $props();

	// svelte-ignore state_referenced_locally
	const bm = new BuildManager(data);
	const session = authClient.useSession();
	// svelte-ignore state_referenced_locally
	const shortId = data.shortId;

	let toast = $state('');

	// svelte-ignore state_referenced_locally
	if (data.initialBuild) {
		bm.applyBuildObject(data.initialBuild);
	}

	function notify(msg: string) {
		toast = msg;
		setTimeout(() => (toast = ''), 2500);
	}

	async function shareBuild() {
		const code = bm.encodeBuild();
		const url = `${window.location.origin}/builder?code=${encodeURIComponent(code)}`;
		await navigator.clipboard.writeText(url);
		notify('Share URL copied to clipboard');
	}

	async function copyCode() {
		const code = bm.encodeBuild();
		await navigator.clipboard.writeText(code);
		notify('Build code copied');
	}

	function loadFromCode() {
		const code = prompt('Paste build code');
		if (!code) return;
		const result = bm.decodeBuildCode(code);
		notify(result.ok ? 'Build loaded' : 'Invalid build code');
	}

	function saveLocal() {
		const name = prompt('Build name');
		if (!name) return;
		const saved = {
			id: crypto.randomUUID(),
			name,
			version: '2026.1',
			build: bm.toBuildObject(),
			savedAt: new Date().toISOString(),
			source: 'local' as const
		};
		saveLocalBuild(saved);
		notify('Saved to this browser');
	}

	async function saveOnline() {
		if (!$session.data) {
			notify('Sign in to save online');
			return;
		}
		const name = prompt('Build name');
		if (!name) return;
		try {
			if (shortId) {
				await apiClient(`/api/builds/${encodeURIComponent(shortId)}`, {
					method: 'PATCH',
					body: JSON.stringify({ name, build: bm.toBuildObject(), isPublic: true })
				});
				notify('Online build updated');
			} else {
				const res = await apiClient('/api/builds', {
					method: 'POST',
					body: JSON.stringify({ type: 'gear', name, build: bm.toBuildObject(), isPublic: true })
				});
				const shortUrl = `${window.location.origin}/b/${res.shortId}`;
				await navigator.clipboard.writeText(shortUrl);
				notify('Saved online — short link copied');
			}
		} catch (e: any) {
			notify('Save failed: ' + e.message);
		}
	}
</script>

<svelte:head><title>Gear Builder — AO Tools</title></svelte:head>

<div class="flex flex-col items-center p-4">
	{#if toast}
		<div class="fixed right-4 top-16 z-50 rounded border border-white/30 bg-black px-4 py-2 text-sm text-white shadow-lg">
			{toast}
		</div>
	{/if}

	<div id="title" class="mb-5">
		<p class="text-7xl text-white" style="font-family:Merriweather,serif">Gear Builder</p>
	</div>

	<div class="mb-5 flex flex-row flex-wrap justify-center gap-3">
		<button onclick={() => bm.randomize()} class="w-56 border border-white bg-black px-4 py-2 text-lg font-bold text-white" style="font-family:Merriweather,serif">Random Build</button>
		<button onclick={() => bm.reset()} class="w-56 border border-white bg-black px-4 py-2 text-lg font-bold text-white" style="font-family:Merriweather,serif">Reset</button>
		<button onclick={shareBuild} class="flex w-56 items-center justify-center gap-2 border border-white bg-black px-4 py-2 text-lg font-bold text-white" style="font-family:Merriweather,serif"><Share2 class="h-4 w-4" /> Share</button>
		<button onclick={copyCode} class="flex w-56 items-center justify-center gap-2 border border-white bg-black px-4 py-2 text-lg font-bold text-white" style="font-family:Merriweather,serif"><Link class="h-4 w-4" /> Copy Code</button>
		<button onclick={loadFromCode} class="flex w-56 items-center justify-center gap-2 border border-white bg-black px-4 py-2 text-lg font-bold text-white" style="font-family:Merriweather,serif"><Download class="h-4 w-4" /> Load Code</button>
		<button onclick={saveLocal} class="flex w-56 items-center justify-center gap-2 border border-white bg-black px-4 py-2 text-lg font-bold text-white" style="font-family:Merriweather,serif"><Download class="h-4 w-4" /> Save Local</button>
		<button onclick={saveOnline} class="flex w-56 items-center justify-center gap-2 border border-white bg-black px-4 py-2 text-lg font-bold text-white" style="font-family:Merriweather,serif"><Upload class="h-4 w-4" /> Save Online</button>
	</div>

	<div class="flex flex-row space-x-10">
		<!-- Accessories -->
		<div>
			{#each bm.slots.slice(0, 3) as slot, i (slot.key)}
				<GearSlot slotIndex={i} {bm} />
			{/each}
		</div>

		<!-- Chestplate / Pants -->
		<div>
			{#each bm.slots.slice(3, 5) as slot, i (slot.key)}
				<GearSlot slotIndex={i + 3} {bm} />
			{/each}
		</div>

		<!-- Build stats -->
		<div class="flex flex-col space-y-5">
			<div class="m-10 h-auto w-80 rounded border-2 border-white bg-black bg-opacity-40 p-2">
				<BuildStats stats={bm.buildStats} player={bm.player} config={bm.config} />
			</div>
		</div>
	</div>

	<!-- Build settings -->
	<div class="mt-6 w-full max-w-6xl">
		<PlayerStatMenu {bm} />
	</div>
</div>
