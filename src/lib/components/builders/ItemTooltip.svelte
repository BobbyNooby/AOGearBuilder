<script lang="ts">
	import { calculateEfficiencyPoints } from '$lib/utils/calculateEfficiencyPoints';
	import type {
		ArmorItemData,
		GemItemData,
		EnchantItemData,
		ModifierItemData
	} from '$lib/itemTypes';
	import { filterData } from '$lib/utils/filterData';
	import type { Player } from '$lib/playerClasses';
	import StatWithPercentEffectiveness from './StatWithPercentEffectiveness.svelte';

	export let item: ArmorItemData | GemItemData | EnchantItemData | ModifierItemData | any,
		showName: boolean,
		player: Player,
		slotKey: string,
		isItemMenu: boolean,
		atlanteanAttribute: string,
		showOnlyAtlanteanStat: boolean; //importing the Item that was selected cos thats the only thing thats needed
	console.log(player.level);
	// This document is a tooltip for the items

	let itemStats = {
		power: { name: 'POWER', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
		defense: { name: 'DEFENSE', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
		agility: { name: 'AGILITY', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
		attackSpeed: { name: 'ATTACK SPEED', fillColor: '#FFFFFF', strokeColor: '#0077ff', suffix: '' },
		attackSize: { name: 'ATTACK SIZE', fillColor: '#00FF00', strokeColor: '#471559', suffix: '' },
		intensity: { name: 'INTENSITY', fillColor: '#FFF200', strokeColor: '#712402', suffix: '' },
		regeneration: {
			name: 'REGENERATION',
			fillColor: '#C0FFC0',
			strokeColor: '#35D234',
			suffix: ''
		},
		piercing: { name: 'PIERCING', fillColor: '#FFD6AB', strokeColor: '#E22A1D', suffix: '' },
		resistance: { name: 'RESISTANCE', fillColor: '#89ABC6', strokeColor: '#000000', suffix: '' },

		powerIncrement: { name: 'POWER', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
		defenseIncrement: { name: 'DEFENSE', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
		agilityIncrement: { name: 'AGILITY', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
		attackSpeedIncrement: {
			name: 'ATTACK SPEED',
			fillColor: '#FFFFFF',
			strokeColor: '#0077ff',
			suffix: ''
		},
		attackSizeIncrement: {
			name: 'ATTACK SIZE',
			fillColor: '#00FF00',
			strokeColor: '#471559',
			suffix: ''
		},
		intensityIncrement: {
			name: 'INTENSITY',
			fillColor: '#FFF200',
			strokeColor: '#712402',
			suffix: ''
		},
		regenerationIncrement: {
			name: 'REGENERATION',
			fillColor: '#C0FFC0',
			strokeColor: '#35D234',
			suffix: ''
		},
		piercingIncrement: {
			name: 'PIERCING',
			fillColor: '#FFD6AB',
			strokeColor: '#E22A1D',
			suffix: ''
		},
		resistanceIncrement: {
			name: 'RESISTANCE',
			fillColor: '#89ABC6',
			strokeColor: '#000000',
			suffix: ''
		},

		insanity: { name: 'INSANITY', fillColor: '#8B27DB', strokeColor: '#DB0C45', suffix: '' },
		drawback: { name: 'DRAWBACK', fillColor: '#DC4040', strokeColor: '#000000', suffix: '' },
		warding: { name: 'WARDING', fillColor: '#FFFFFF', strokeColor: '#CBCB55', suffix: '' },

		stability: { name: 'STABILITY', fillColor: '#6297C1', strokeColor: '#124975', suffix: '%' },
		durability: { name: 'DURABILITY', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
		magicStorage: {
			name: 'MAGIC STORAGE',
			fillColor: '#BA70EB',
			strokeColor: '#000000',
			suffix: ''
		},
		turning: { name: 'TURNING', fillColor: '#FFFFFF', strokeColor: '#584A8C', suffix: '' },
		speed: { name: 'SPEED', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
		resilience: { name: 'RESILIENCE', fillColor: '#FFFFFF', strokeColor: '#AF2230', suffix: '%' },
		ramStrength: { name: 'RAM STRENGTH', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
		ramDefense: { name: 'RAM DEFENSE', fillColor: '#FFFFFF', strokeColor: '#6B6BD7', suffix: '' }
	};

	if (atlanteanAttribute != '' && !showOnlyAtlanteanStat) {
		itemStats[atlanteanAttribute]['fillColor'] = '#8B27DB';
		itemStats[atlanteanAttribute]['strokeColor'] = '#DB0C45';
	}

	let minStats = {};
	let maxStats = {};
	let chosenStat = {};
	let efficiencyPointsString: string = '';

	if (isItemMenu) {
		if (
			['Accessory', 'Chestplate', 'Pants'].includes(item.mainType) &&
			item.hasOwnProperty('statsPerLevel')
		) {
			if (item.statsPerLevel.length > 1) {
				minStats = filterData(item.statsPerLevel[0]);
				maxStats = filterData(item.statsPerLevel[item.statsPerLevel.length - 1]);
				efficiencyPointsString =
					calculateEfficiencyPoints(minStats, 1) + ' - ' + calculateEfficiencyPoints(maxStats, 1);

				for (const stat in itemStats) {
					if (minStats.hasOwnProperty(stat) && maxStats.hasOwnProperty(stat)) {
						if (stat == 'warding' || stat == 'insanity') {
							chosenStat[stat] = minStats[stat].toString();
						} else {
							chosenStat[stat] = minStats[stat] + ' ~ ' + maxStats[stat];
						}
					}
				}
			} else if (item.statsPerLevel.length == 1) {
				console.log(item.statsPerLevel);
				chosenStat = filterData(item.statsPerLevel[0]);
				console.log(chosenStat);
				efficiencyPointsString = calculateEfficiencyPoints(chosenStat, player.level).toString();
				console.log(efficiencyPointsString);
			}
		} else if (['Enchant', 'Modifier'].includes(item.mainType)) {
			// Calculatiions to allow to check how much power you get for that armor at that level
			let returnStat = {};
			let increments = filterData(item);

			const statRelations = {
				powerIncrement: 'power',
				defenseIncrement: 'defense',
				agilityIncrement: 'agility',
				attackSpeedIncrement: 'attackSpeed',
				attackSizeIncrement: 'attackSize',
				intensityIncrement: 'intensity',
				regenerationIncrement: 'regeneration',
				piercingIncrement: 'piercing',
				resistanceIncrement: 'resistance'
			};

			//Regular Modifiers / Enchants
			if (item.name !== 'Atlantean Essence') {
				for (const stat in increments) {
					if (['warding', 'insanity', 'drawback'].includes(stat)) {
						//Static stats
						returnStat[stat] = increments[stat];
					} else {
						//Incremental Stats
						returnStat[statRelations[stat]] = Math.floor(
							(increments[stat] * player.build.slots[slotKey].armorLevel) / 10
						);
					}
				}
			} else {
				// Atlantean Calcs
				const statKey = Object.keys(statRelations).find(
					(key) => statRelations[key] === atlanteanAttribute
				);

				returnStat[atlanteanAttribute] = Math.floor(
					(increments[statKey] * player.build.slots[slotKey].armorLevel) / 10
				);
				returnStat['insanity'] = 1;

				chosenStat = returnStat;
			}

			chosenStat = returnStat;
			efficiencyPointsString = calculateEfficiencyPoints(chosenStat, player.level).toString();
		} else {
			chosenStat = filterData(item);
			efficiencyPointsString = calculateEfficiencyPoints(chosenStat, player.level).toString();
		}
	} else {
		chosenStat = filterData(item);
		efficiencyPointsString = calculateEfficiencyPoints(chosenStat, player.level).toString();
	}
</script>

<div class="text-center z-30">
	<!--
		
		
		
		
		NORMAL STAT PREVIEW
	
	
	
	
	-->
	{#if !showOnlyAtlanteanStat}
		{#each Object.keys(itemStats) as stat}
			{#if chosenStat[stat]}
				{#if ['agility', 'attackSpeed', 'attackSize', 'intensity', 'regeneration', 'piercing', 'resistance'].includes(stat)}
					<StatWithPercentEffectiveness {stat} {chosenStat} {itemStats} {showName} {player} />
				{:else}
					<div class="flex items-center justify-center">
						<img class="h-6" src="assets/images/stats/{stat}.png" alt={stat} />
						<p
							style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[
								stat
							].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[stat]
								.strokeColor}; text-align: center;"
						>
							{#if showName && chosenStat[stat] > 0}
								+
							{/if}
							{chosenStat[stat]}
							{#if showName}{itemStats[stat].name}{/if}
						</p>
					</div>
				{/if}
			{/if}
		{/each}
		{#if efficiencyPointsString !== '0'}
			<div class="pb-2"></div>
			<div class="flex items-center justify-center py-2" style="border-top: 2px solid white;">
				<p
					style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; text-align: center; -webkit-text-fill-color: white"
				>
					EP: {efficiencyPointsString}
				</p>
			</div>
		{/if}
	{:else}
		<!-- 
	
	
	
	
	SHOW ONLY ATLANTEAN ATTRIBUTE / FOR ATLANTEAN ESSENCE ITEMTOOLTIP




-->

		<div class="flex items-center justify-center">
			<img
				class="h-6"
				src="assets/images/stats/{atlanteanAttribute}.png"
				alt={atlanteanAttribute}
			/>
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[
					atlanteanAttribute
				].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[
					atlanteanAttribute
				].strokeColor}; text-align: center;"
			>
				{#if showName && chosenStat[atlanteanAttribute] > 0}
					+
				{/if}{chosenStat[atlanteanAttribute]}
				{#if showName}
					{itemStats[atlanteanAttribute].name}
				{/if}
			</p>
		</div>
		<div class="flex items-center justify-center">
			<img class="h-6" src="assets/images/stats/insanity.png" alt="insanity" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[
					'insanity'
				].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats['insanity']
					.strokeColor}; text-align: center;"
			>
				{#if showName && chosenStat['insanity'] > 0}
					+
				{/if}{chosenStat['insanity']}
				{#if showName}{itemStats['insanity'].name}{/if}
			</p>
		</div>

		{#if efficiencyPointsString !== '0'}
			<div class="pb-2"></div>
			<div class="flex items-center justify-center py-2" style="border-top: 2px solid white;">
				<p
					style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; text-align: center; -webkit-text-fill-color: white"
				>
					EP: {efficiencyPointsString}
				</p>
			</div>
		{/if}
	{/if}
</div>
