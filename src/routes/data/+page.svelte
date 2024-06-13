<script lang="ts">
	import DataStats from "$lib/components/data/DataStats.svelte";
	import { rarityColors } from "$lib/dataConstants";
	import type { anyItem } from "$lib/utils/itemTypes";


	export let data:any;

	let imageSearchQuery = '';
	let statSearchQuery = '';

	let options:Record<string, Record<string, Record<string, string|boolean>>> = {
		"images": {},
		"stats": {
			"onlyMax":{
				"name": "Only Missing Max Stats",
				"value":false
			}
		}
	}


    $: noImageItems = data.items.filter((item:anyItem) => {
		if (imageSearchQuery != '' && !item.name.toLowerCase().includes(imageSearchQuery.toLowerCase())) {
			return false;
		}

		if (item.imageId == "NO_IMAGE" || item.imageId == "") {
			return true;
		}

		return false;
	});

	$: missingStatsItems = data.items.filter((item:anyItem) => {

		if (item.name.toLowerCase().startsWith("none")) {
			return false
		}

		if (statSearchQuery != '' && !item.name.toLowerCase().includes(statSearchQuery.toLowerCase())) {
			return false;
		}

		if ("statsPerLevel" in item) {
			if (options.stats.onlyMax.value && item.statsPerLevel.at(-1).level == item.maxLevel) {
				return false
			}

			if (item.statsPerLevel.length < ((item.maxLevel-item.minLevel)/10)+1) {
				return true;
			}

			let includedStats = [];
			for (let stat of item.statsPerLevel) {
				for (let [key, value] of Object.entries(stat)) {
					includedStats.push(key);
				}
			}

			for (let stat of item.statsPerLevel) {
				for (let included of includedStats) {
					if (!(included in stat)) {
						return true;
					}
				}
			}
		}

		return false;
	});

</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Gear Builder Data Request</title>
	<meta name="title" content="Gear Builder Data Request" />
	<meta name="description" content="Gear Builder Data Request for Arcane Odyssey by BobbyNooby" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/data" />
	<meta property="og:title" content="Gear Builder Data Request" />
	<meta property="og:description" content="Gear Builder Data Request for Arcane Odyssey by BobbyNooby" />
	<meta property="og:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/data" />
	<meta property="twitter:title" content="Gear Builder Data Request" />
	<meta property="twitter:description" content="Gear Builder Data Request for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

<section class="flex flex-col items-center" style="display: flex;">
    <p class="mt-8 text-7xl text-white merriweather-light" style="font-family: Merriweather;">
        Data Requests
    </p>

    <h6 class="mt-5 text-xl font-bold text-white">No Images</h6>
    <div class="flex flex-wrap justify-center mt-3">
		<div class="w-full pb-2 flex flex-wrap justify-center">
			<input
				type="text"
				bind:value={imageSearchQuery}
				placeholder="Search"
				class="border rounded p-2 m-2 w-1/2"
			/>
		</div>
		{#each noImageItems as item}
			<div class="flex flex-col p-1">
				{#key item.id}
                <button class="w-24 h-24 flex items-center justify-center" style="border-color: {rarityColors[item.rarity]}; border-width: 1px; background-color: #020202;" disabled>
                    <h1 style="color:white;">{item.name || "None"}</h1>
                </button>
				{/key}
			</div>
		{/each}
	</div>

	<h6 class="mt-5 text-xl font-bold text-white">Stats</h6>

	<!--will add nice options menu in the future-->
	<!--{#each Object.entries(options.stats) as [key, value]}
		<input
			id="{key}"
			type="checkbox"
			bind:checked={options.stats[key].value}
		/>
		<label class="text-white" for="{key}">{options.stats[key].name}</label>
	{/each}-->

    <div class="flex flex-wrap justify-center mt-3">
		<div class="w-full pb-2 flex flex-wrap justify-center">
			<input
				type="text"
				bind:value={statSearchQuery}
				placeholder="Search"
				class="border rounded p-2 m-2 w-1/2"
			/>
		</div>
		{#each missingStatsItems as item}
			<div class="flex flex-col p-1">
				{#key item.id}
                	<DataStats config={data.config} {item} />
				{/key}
			</div>
		{/each}
	</div>
	<div class="mb-24"></div>
</section>