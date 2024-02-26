<script>
	export let item, showName, atlanteanAttribute, showOnlyAtlanteanStat; //importing the item that was selected cos thats the only thing thats needed
	import { get } from "svelte/store";

	// This document is a tooltip for the items

	let itemStats = {
		power: { name: 'POWER', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
		defense: { name: 'DEFENSE', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
		agility: { name: 'AGILITY', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
		attackSpeed: { name: 'ATTACK SPEED', fillColor: '#FFFFFF', strokeColor: '#0077ff', suffix: '' },
		attackSize: { name: 'ATTACK SIZE', fillColor: '#00FF00', strokeColor: '#471559', suffix: '' },
		intensity: { name: 'INTENSITY', fillColor: '#FFF200', strokeColor: '#712402', suffix: '' },
		insanity: { name: 'INSANITY', fillColor: '#8B27DB', strokeColor: '#DB0C45', suffix: '' },
		drawback: { name: 'DRAWBACK', fillColor: '#DC4040', strokeColor: '#000000', suffix: '' },
		warding: { name: 'WARDING', fillColor: '#FFFFFF', strokeColor: '#CBCB55', suffix: '' },
		stability: { name: 'STABILITY', fillColor: '#6297C1', strokeColor: '#124975', suffix: '%' },
		durability: { name: 'DURABILITY', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
		magicStorage: { name: 'MAGIC STORAGE', fillColor: '#BA70EB', strokeColor: '#000000', suffix: ''},
		turning: { name: 'TURNING', fillColor: '#FFFFFF', strokeColor: '#584A8C', suffix: '' },
		speed: { name: 'SPEED', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
		resilience: { name: 'RESILIENCE', fillColor: '#FFFFFF', strokeColor: '#AF2230', suffix: '%' },
		ramStrength: { name: 'RAM STRENGTH', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
		ramDefense: { name: 'RAM DEFENSE', fillColor: '#FFFFFF', strokeColor: '#6B6BD7', suffix: '' }
	};

	if (atlanteanAttribute != undefined && !showOnlyAtlanteanStat){
		itemStats[atlanteanAttribute]["fillColor"] = '#8B27DB'
		itemStats[atlanteanAttribute]["strokeColor"] = '#DB0C45'
	
	}

	let efficiencyPoints = 0;

    $: {
        efficiencyPoints = (item["power"]*3)+item["attackSpeed"]+item["attackSize"]+item["intensity"]+item["agility"]+(item["defense"]/3)+(item["warding"]*18)-(item["insanity"]*36)-(item["drawback"]*18)
    }
</script>

<div class="text-center z-30">
	<!-- Only show the stat if its value is more than zero -->
	{#if !showOnlyAtlanteanStat}
	{#each Object.keys(itemStats) as stat}
		{#if item[stat] && item[stat] != 0}
			<div class="flex items-center justify-center">
				<img class="h-6" src="assets/images/stats/{stat}.png" alt={stat} />
				<p
					style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[stat].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[stat].strokeColor}; text-align: center;"
				>
					{#if showName && item[stat] > 0}
						+
					{/if}{item[stat]}
					{#if showName}{itemStats[stat].name}{/if}
				</p>
			</div>
		{/if}
	{/each}
		{#if efficiencyPoints > 0}
			<div class="pb-2"></div>
			<div class="flex items-center justify-center py-2" style="border-top: 2px solid white;">
				<p
					style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; text-align: center; -webkit-text-fill-color: white"
				>
					EP: {Math.round((efficiencyPoints + Number.EPSILON) * 100) / 100}
				</p>
			</div>
		{/if}
	{:else}
	<div class="flex items-center justify-center">
		<img class="h-6" src="assets/images/stats/{atlanteanAttribute}.png" alt={atlanteanAttribute} />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[atlanteanAttribute].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[atlanteanAttribute].strokeColor}; text-align: center;"
		>
			{#if showName && item[atlanteanAttribute] > 0}
				+
			{/if}{item[atlanteanAttribute]}
			{#if showName}{itemStats[atlanteanAttribute].name}{/if}
		</p>
	</div>
	<div class="flex items-center justify-center">
		<img class="h-6" src="assets/images/stats/insanity.png" alt="insanity" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats["insanity"].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats["insanity"].strokeColor}; text-align: center;"
		>
			{#if showName && item["insanity"] > 0}
				+
			{/if}{item["insanity"]}
			{#if showName}{itemStats["insanity"].name}{/if}
		</p>
	</div>


	{/if}
</div>
