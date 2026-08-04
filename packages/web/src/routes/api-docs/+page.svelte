<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ChevronDown, ChevronRight, Play, LoaderCircle } from 'lucide-svelte';

	interface EndpointDoc {
		method: string;
		path: string;
		description: string;
		queryParams?: { name: string; type: string; description: string }[];
		pathParams?: { name: string; type: string; description: string }[];
		responseExample: string;
	}

	const endpoints: EndpointDoc[] = [
		{
			method: 'GET',
			path: '/api/public/items',
			description: 'List all items. Supports optional filters.',
			queryParams: [
				{ name: 'ids', type: 'string', description: 'Comma-separated item IDs' },
				{ name: 'types', type: 'string', description: 'Comma-separated item types (armor, weapon, shipPart, accessory, gem, magic, enchant, modifier)' },
				{ name: 'names', type: 'string', description: 'Comma-separated item names' }
			],
			responseExample: `[
  {
    "id": "zIN",
    "name": "Merchant's Coat",
    "type": "armor",
    "equipType": "chestpiece",
    "rarity": "Common",
    "minLevel": 1,
    "maxLevel": 50,
    "scaling": { "defense": 0.25 },
    "jewelSlots": 0,
    "statType": "Normal",
    "imageUrl": "https://static.wikia.nocookie.net/..."
  }
]`
		},
		{
			method: 'GET',
			path: '/api/public/items/:id',
			description: 'Get a single item by its unique ID.',
			pathParams: [
				{ name: 'id', type: 'string', description: 'The item ID' }
			],
			responseExample: `{
  "id": "zIN",
  "name": "Merchant's Coat",
  "type": "armor",
  "equipType": "chestpiece",
  "rarity": "Common",
  "minLevel": 1,
  "maxLevel": 50,
  "scaling": { "defense": 0.25 },
  "jewelSlots": 0,
  "statType": "Normal",
  "imageUrl": "https://static.wikia.nocookie.net/..."
}`
		},
		{
			method: 'GET',
			path: '/api/public/magics',
			description: 'List all magics with damage/size/speed multipliers, status effects, and synergies.',
			responseExample: `[
  {
    "id": "fire-magic",
    "name": "Fire",
    "type": "magic",
    "color": "#BD6300",
    "stats": {
      "magicSize": { "value": 1.1 },
      "magicSpeed": { "value": 1 },
      "magicDamage": { "value": 0.85 }
    },
    "statusEffect": { "name": "BURNING", "description": "Deals high damage over time for 5 seconds" }
  }
]`
		},
		{
			method: 'GET',
			path: '/api/public/magics/:id',
			description: 'Get a single magic by its ID.',
			pathParams: [
				{ name: 'id', type: 'string', description: 'The magic ID (e.g. fire-magic, lightning-magic)' }
			],
			responseExample: `{
  "id": "fire-magic",
  "name": "Fire",
  "type": "magic",
  "color": "#BD6300",
  "stats": {
    "magicSize": { "value": 1.1 },
    "magicSpeed": { "value": 1 },
    "magicDamage": { "value": 0.85 }
  },
  "statusEffect": { "name": "BURNING", "description": "Deals high damage over time for 5 seconds" }
}`
		},
		{
			method: 'GET',
			path: '/api/public/fighting-styles',
			description: 'List all fighting styles with damage/speed/size multipliers and passives.',
			responseExample: `[
  {
    "id": "basic-combat",
    "name": "Basic Combat",
    "type": "fighting-style",
    "stats": {
      "fightingStyleDamage": { "value": 0.9 },
      "fightingStyleSpeed": { "value": 1 },
      "fightingStyleSize": { "value": 1 }
    },
    "passives": []
  }
]`
		},
		{
			method: 'GET',
			path: '/api/public/fighting-styles/:id',
			description: 'Get a single fighting style by its ID.',
			pathParams: [
				{ name: 'id', type: 'string', description: 'The fighting style ID (e.g. basic-combat, boxing)' }
			],
			responseExample: `{
  "id": "basic-combat",
  "name": "Basic Combat",
  "type": "fighting-style",
  "stats": {
    "fightingStyleDamage": { "value": 0.9 },
    "fightingStyleSpeed": { "value": 1 },
    "fightingStyleSize": { "value": 1 }
  },
  "passives": []
}`
		},
		{
			method: 'GET',
			path: '/api/public/modifiers',
			description: 'List all modifiers — stat effects applied to gear including enchants, modifiers, factions, and imbues. Does not include gems (gems are in the items endpoint).',
			responseExample: `[
  {
    "id": "Xjp",
    "name": "Strong",
    "type": "enchant",
    "tier": "rare",
    "applicableTo": ["armor", "accessory", "weapon"],
    "effects": [
      { "type": "steppedStat", "stat": "powerIncrement", "per10": 0.45 }
    ]
  }
]`
		},
		{
			method: 'GET',
			path: '/api/public/modifiers/:id',
			description: 'Get a single modifier by its ID.',
			pathParams: [
				{ name: 'id', type: 'string', description: 'The modifier ID' }
			],
			responseExample: `{
  "id": "Xjp",
  "name": "Strong",
  "type": "enchant",
  "tier": "rare",
  "applicableTo": ["armor", "accessory", "weapon"],
  "effects": [
    { "type": "steppedStat", "stat": "powerIncrement", "per10": 0.45 }
  ]
}`
		},
		{
			method: 'GET',
			path: '/api/public/config',
			description: 'Get game configuration (max level, stat registry, build types, player constraints, arcanium attunements) and runtime formulas (health calculation, vitality scaling, substat efficiency).',
			responseExample: `{
  "config": {
    "maxLevel": 175,
    "scalings": { "power": 0.315, "defense": 2.7 },
    "statRegistry": { ... },
    "buildTypes": [ ... ],
    "arcaniumAttunements": { ... }
  },
  "formulas": {
    "healthFormula": "93 + level * 7 + defense + spirit * 4",
    "vitalityScaling": { ... },
    "substatEfficiency": { ... }
  }
}`
		},
		{
			method: 'GET',
			path: '/api/health',
			description: 'Health check endpoint. Returns 200 if the API is running.',
			responseExample: `{ "status": "ok" }`
		}
	];

	const methodColors: Record<string, string> = {
		GET: 'bg-green-600 text-white',
		POST: 'bg-blue-600 text-white',
		PUT: 'bg-yellow-600 text-white',
		PATCH: 'bg-orange-600 text-white',
		DELETE: 'bg-red-600 text-white'
	};

	let expandedEndpoint = $state<number | null>(null);
	let expandedTry = $state<number | null>(null);
	let tryLoading = $state<number | null>(null);
	let tryResponses: Record<number, string> = $state({});
	let tryInputs: Record<string, string> = $state({});

	function toggleExpand(index: number) {
		expandedEndpoint = expandedEndpoint === index ? null : index;
	}

	function startTry(index: number) {
		expandedTry = expandedTry === index ? null : index;
		if (expandedTry !== null) {
			tryResponses[index] = '';
			tryInputs = {};
		}
	}

	function getTryUrl(endpoint: EndpointDoc): string {
		let url = endpoint.path;
		Object.entries(tryInputs).forEach(([key, value]) => {
			if (value) {
				const sep = url.includes('?') ? '&' : '?';
				url += `${sep}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
			}
		});
		return url;
	}

	async function executeTry(index: number, endpoint: EndpointDoc) {
		if (endpoint.pathParams) {
			for (const param of endpoint.pathParams) {
				if (!tryInputs[param.name]) {
					tryResponses[index] = `Error: "${param.name}" path parameter is required.`;
					return;
				}
			}
		}

		tryLoading = index;
		tryResponses[index] = '';

		try {
			let url = endpoint.path;
			if (endpoint.pathParams) {
				endpoint.pathParams.forEach((param) => {
					url = url.replace(`:${param.name}`, encodeURIComponent(tryInputs[param.name]));
				});
			}
			const queryParams = endpoint.queryParams
				?.filter((p) => tryInputs[p.name])
				.map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(tryInputs[p.name])}`)
				.join('&');
			if (queryParams) url += `?${queryParams}`;

			const res = await fetch(url);
			const data = await res.json();
			const status = `${res.status} ${res.statusText}`;
			tryResponses[index] = [status, '', JSON.stringify(data, null, 2)].join('\n');
		} catch (err: any) {
			tryResponses[index] = `Error: ${err.message}`;
		} finally {
			tryLoading = null;
		}
	}
</script>

<svelte:head>
	<title>API Docs — Arcane Odyssey Tools</title>
	<meta name="description" content="Public API documentation for Arcane Odyssey build tools." />
</svelte:head>

<div in:fade={{ duration: 300 }} class="min-h-[calc(100vh-3.5rem)] p-4 text-white md:p-8">
	<div class="mx-auto max-w-3xl">
		<h1 class="mb-2 text-3xl font-bold" style="font-family:Merriweather,serif">Public API</h1>
		<p class="mb-8 text-gray-400">
			Programmatic access to Arcane Odyssey game data. All endpoints are read-only and require no authentication.
			Add an <code class="text-gray-300">X-API-Key</code> header to increase your rate limit.
		</p>

		<div class="mb-8 rounded-lg border border-white/10 bg-white/5 p-5">
			<h2 class="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Authentication & Rate Limits</h2>
			<div class="space-y-3 text-sm">
				<div>
					<p class="font-semibold text-white mb-1">No auth</p>
					<p class="text-gray-300">6 requests per minute per IP. Suitable for casual use and testing.</p>
				</div>
				<div>
					<p class="font-semibold text-white mb-1">API key</p>
					<p class="text-gray-300">
						Add <code class="text-gray-400 text-xs">X-API-Key: ao_xxx</code> to your request headers. 
						Default limit is 60 requests per minute (configurable per key).
					</p>
				</div>
				<p class="text-gray-500 text-xs mt-2">
					Rate limits reset every 60 seconds. Requests exceeding the limit receive a <code class="text-gray-400">429</code> response with a <code class="text-gray-400">Retry-After</code> header.
				</p>
			</div>
		</div>

		<div class="space-y-4">
			{#each endpoints as endpoint, i}
				<div class="rounded-lg border {expandedEndpoint === i ? 'border-white/20 bg-white/10' : 'border-white/10 bg-white/5'}">
					<!-- Header row -->
					<button
						onclick={() => toggleExpand(i)}
						class="flex w-full items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors {expandedEndpoint === i ? 'rounded-t-lg' : 'rounded-lg'}"
					>
						<span class="shrink-0 rounded px-2 py-0.5 text-xs font-bold font-mono {methodColors[endpoint.method]}">
							{endpoint.method}
						</span>
						<code class="text-sm font-medium text-white">{endpoint.path}</code>
						<span class="ml-auto shrink-0 text-gray-500">
							{#if expandedEndpoint === i}
								<ChevronDown class="h-4 w-4" />
							{:else}
								<ChevronRight class="h-4 w-4" />
							{/if}
						</span>
					</button>

					{#if expandedEndpoint === i}
						<div class="border-t border-white/10 p-4 space-y-4">
							<p class="text-sm text-gray-300">{endpoint.description}</p>

							{#if endpoint.pathParams}
								<div>
									<h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Path Parameters</h3>
									<div class="overflow-x-auto rounded border border-white/10">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b border-white/10 bg-white/5 text-left">
													<th class="px-3 py-2 font-medium text-gray-400">Name</th>
													<th class="px-3 py-2 font-medium text-gray-400">Type</th>
													<th class="px-3 py-2 font-medium text-gray-400">Description</th>
												</tr>
											</thead>
											<tbody>
												{#each endpoint.pathParams as param}
													<tr class="border-b border-white/5">
														<td class="px-3 py-2 font-mono text-white">{param.name}</td>
														<td class="px-3 py-2 text-gray-400">{param.type}</td>
														<td class="px-3 py-2 text-gray-400">{param.description}</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								</div>
							{/if}

							{#if endpoint.queryParams}
								<div>
									<h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Query Parameters</h3>
									<div class="overflow-x-auto rounded border border-white/10">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b border-white/10 bg-white/5 text-left">
													<th class="px-3 py-2 font-medium text-gray-400">Name</th>
													<th class="px-3 py-2 font-medium text-gray-400">Type</th>
													<th class="px-3 py-2 font-medium text-gray-400">Description</th>
												</tr>
											</thead>
											<tbody>
												{#each endpoint.queryParams as param}
													<tr class="border-b border-white/5">
														<td class="px-3 py-2 font-mono text-white">{param.name}</td>
														<td class="px-3 py-2 text-gray-400">{param.type}</td>
														<td class="px-3 py-2 text-gray-400">{param.description}</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								</div>
							{/if}

							<div>
								<h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Example Response</h3>
								<pre class="overflow-x-auto rounded border border-white/10 bg-black/50 p-3 text-xs text-gray-300"><code>{endpoint.responseExample}</code></pre>
							</div>

							<div>
								<button
									onclick={() => startTry(i)}
									class="flex items-center gap-2 rounded border border-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
								>
									<Play class="h-4 w-4" />
									Try it
								</button>

								{#if expandedTry === i}
									<div class="mt-3 rounded border border-white/10 bg-black/30 p-4">
										{#if endpoint.pathParams}
											<div class="mb-3 space-y-2">
												{#each endpoint.pathParams as param}
													<div>
														<label for="try-path-{i}-{param.name}" class="mb-1 block text-xs text-gray-400">
															<span class="font-mono text-white">{param.name}</span>
															<span class="ml-1 opacity-50">{param.type}</span>
														</label>
														<input
															id="try-path-{i}-{param.name}"
															type="text"
															placeholder={param.description}
															oninput={(e) => (tryInputs = { ...tryInputs, [param.name]: e.currentTarget.value })}
															class="w-full rounded border border-white/10 bg-black/50 px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:border-white/30 focus:outline-none"
														/>
													</div>
												{/each}
											</div>
										{/if}
										{#if endpoint.queryParams}
											<div class="mb-3 space-y-2">
												{#each endpoint.queryParams as param}
													<div>
														<label for="try-query-{i}-{param.name}" class="mb-1 block text-xs text-gray-400">
															<span class="font-mono text-white">{param.name}</span>
															<span class="ml-1 opacity-50">{param.type}</span>
														</label>
														<input
															id="try-query-{i}-{param.name}"
															type="text"
															placeholder={param.description}
															oninput={(e) => (tryInputs = { ...tryInputs, [param.name]: e.currentTarget.value })}
															class="w-full rounded border border-white/10 bg-black/50 px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:border-white/30 focus:outline-none"
														/>
													</div>
												{/each}
											</div>
										{/if}
										<button
											onclick={() => executeTry(i, endpoint)}
											disabled={tryLoading === i}
											class="flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 disabled:opacity-50"
										>
											{#if tryLoading === i}
												<LoaderCircle class="h-4 w-4 animate-spin" />
												Sending...
											{:else}
												Send Request
											{/if}
										</button>
										{#if tryResponses[i] !== undefined}
											<pre class="mt-3 max-h-96 overflow-auto rounded bg-black/50 p-3 text-xs text-gray-300"><code>{tryResponses[i]}</code></pre>
										{/if}
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
