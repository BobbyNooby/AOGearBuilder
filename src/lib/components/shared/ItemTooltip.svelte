<script>
	export let item, showName; //importing the item that was selected cos thats the only thing thats needed

	// This document is a tooltip for the items

	const itemStats = {
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
</script>

<div class="text-center z-30">
	<!-- Only show the stat if its value is more than zero -->

	{#each Object.keys(itemStats) as stat}
		{#if item[stat] && item[stat] != 0}
			<div class="flex items-center justify-center">
				<img class="h-6" src="assets/images/stats/{stat}.png" alt={stat} />
				<p
					style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[stat].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[stat].strokeColor}; text-align: center;"
				>
					{#if showName && item[stat] > 0}
						+
					{/if}{item[stat]}{itemStats[stat].suffix}
					{#if showName}{itemStats[stat].name}{/if}
				</p>
			</div>
		{/if}
	{/each}
</div>
