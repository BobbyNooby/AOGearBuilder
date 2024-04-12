<script lang="ts">
	import { Player } from '$lib/playerClasses';
	import { listOfMagics } from '$lib/dataConstants';
	import PlayerStatIncrementor from './PlayerStatIncrementor.svelte';
	import PlayerStatBar from './PlayerStatBar.svelte';
	import { incrementNumber, testNumber } from '$lib/playerUtils';
	import { hexToRGB } from '$lib/utils/hexToRGB';
	import { writable } from 'svelte/store';

	export let player: Player, updatePage: any;

	let maximumPlayerStatPoints = player.level * 2;
	let availablePlayerStatPoints =
		maximumPlayerStatPoints -
		player.vitalityPoints -
		player.magicPoints -
		player.strengthPoints -
		player.weaponPoints;
	let baseHealth = 93 + player.level * 7;
	player.health = baseHealth + player.build.getBuildStats().defense;

	function incrementStat(
		statPoint: 'vitalityPoints' | 'magicPoints' | 'strengthPoints' | 'weaponPoints',
		amount: number
	) {
		// Initializing
		maximumPlayerStatPoints = player.level * 2;
		availablePlayerStatPoints =
			maximumPlayerStatPoints -
			player.vitalityPoints -
			player.magicPoints -
			player.strengthPoints -
			player.weaponPoints;

		// Deciding
		if (availablePlayerStatPoints > 0 && amount >= availablePlayerStatPoints) {
			player[statPoint] += availablePlayerStatPoints;
		} else if ((amount < 0 || availablePlayerStatPoints > 0) && player[statPoint] + amount >= 0) {
			player[statPoint] += amount;
		}
	}

	$: {
		// Level restraints
		if (player.level > player.maxLevel) {
			player.level = player.maxLevel;
		} else if (player.level < player.minLevel) {
			player.level = player.minLevel;
		}

		// Stat restraints
		maximumPlayerStatPoints = player.level * 2;

		// Restricting stat values
		let currentPlayerStatPoints =
			player.vitalityPoints + player.magicPoints + player.strengthPoints + player.weaponPoints;

		if (currentPlayerStatPoints > maximumPlayerStatPoints) {
			for (let i = 0; i < currentPlayerStatPoints - maximumPlayerStatPoints; i++) {
				let highestStat = Math.max(
					player.vitalityPoints,
					player.magicPoints,
					player.strengthPoints,
					player.weaponPoints
				);
				let statToModify = '';
				if (player.vitalityPoints === highestStat) {
					statToModify = 'vitalityPoints';
				} else if (player.magicPoints === highestStat) {
					statToModify = 'magicPoints';
				} else if (player.strengthPoints === highestStat) {
					statToModify = 'strengthPoints';
				} else {
					statToModify = 'weaponPoints';
				}
				player[statToModify] -= 1;
			}

			// updatePage();
		}

		availablePlayerStatPoints =
			maximumPlayerStatPoints -
			player.vitalityPoints -
			player.magicPoints -
			player.strengthPoints -
			player.weaponPoints;

		const playerStats: ('vitalityPoints' | 'magicPoints' | 'strengthPoints' | 'weaponPoints')[] = [
			'vitalityPoints',
			'magicPoints',
			'strengthPoints',
			'weaponPoints'
		];

		for (const stat of playerStats) {
			if (player[stat] > maximumPlayerStatPoints) {
				player[stat] = maximumPlayerStatPoints;
			} else if (player[stat] < 0) {
				player[stat] = 0;
			}
		}

		baseHealth = 93 + player.level * 7;
		player.health = baseHealth + player.build.getBuildStats().defense;
		player.build.fixSlotLevels();
	}

	function handleLevelChange(amount: number) {
		const newLevel = player.level + amount;
		if (player.minLevel <= newLevel && newLevel <= player.maxLevel) {
			player.level = newLevel;
		}
	}

	function resetAllPlayerStats() {
		player.vitalityPoints = 0;
		player.magicPoints = 0;
		player.strengthPoints = 0;
		player.weaponPoints = 0;
	}

	const keyStore = writable(false);

	function updateComponent() {
		updatePage();
		player.build.fixSlotLevels();
		keyStore.update((value) => !value);
	}
</script>

{#key $keyStore}
	<div
		class="w-3/4 bg-black bg-opacity-60 border-white border-2 rounded flex flex-col items-center mb-24"
	>
		<div class="h-full w-full flex flex-row">
			<div class="flex flex-col w-1/3 h-full items-center">
				<div class="m-3">
					<select bind:value={player.magic}>
						{#each listOfMagics as magicOption}
							<option class="text-black" value={magicOption}>{magicOption}</option>
						{/each}
					</select>
					<div class="flex flex-row items-center">
						<p style="font-family: Merriweather;" class=" text-white text-3xl m-3">Level</p>
						<div class="flex items-center">
							<button
								on:click={() => {
									handleLevelChange(-1);
									updatePage();
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">-</button
							>
							<input
								type="number"
								class="text-black m-2 p-2"
								min={player.minLevel}
								max={player.maxLevel}
								on:change={updateComponent}
								bind:value={player.level}
							/>
							<button
								on:click={() => {
									handleLevelChange(1);
									updatePage();
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">+</button
							>
						</div>
					</div>
					<div class="flex flex-row text-white">
						<p style="font-family: Merriweather;" class="text-xl m-3">Health :</p>
						<p style="font-family: Merriweather;" class=" text-green-500 text-xl m-3">
							{player.health}
						</p>
					</div>
					<div class="flex flex-row text-white">
						<p style="font-family: Merriweather;" class="text-xl m-3">Base Health :</p>
						<p style="font-family: Merriweather;" class=" text-green-200 text-xl m-3">
							{baseHealth}
						</p>
					</div>
				</div>
			</div>
			<div class="w-full h-full items-center m-2">
				<div class="w-full justify-between flex flex-row">
					<div class="flex items-center text-left">
						<p class="text-4xl my-2" style="color : #9c95ea; font-family : Merriweather;">
							Maximum Points : <span style="color : #c3bef3">{maximumPlayerStatPoints}</span> |
							Available Points : <span style="color : #c3bef3">{availablePlayerStatPoints}</span>
						</p>
					</div>
					<div class="flex items-center text-right">
						<button
							style="
								color: #AFA9EE; 
								border-color: #AFA9EE; 
								background-color: 
								rgba({hexToRGB('#AFA9EE').r}, {hexToRGB('#AFA9EE').g}, {hexToRGB('#AFA9EE').b}, 0.2); "
							class="border-2 h-fit px-4 rounded items-center justify-center"
							on:click={resetAllPlayerStats}><p class="text-l">Reset Stats</p></button
						>
					</div>
				</div>

				<p class="text-4xl my-4" style="color : #FFFFFF; font-family : Merriweather;">
					Stat Build : <span style="color : {player.getStatBuild().color}"
						>{player.getStatBuild().type}</span
					>
				</p>
				<div>
					<PlayerStatBar
						statName={'Vitality'}
						statColor={'#22c55e'}
						statLegend={'Increases your maximum health, but reduces your damage output slightly. In turn, having high vitality allows you to use spirit weapons.'}
						statKey={'vitalityPoints'}
						{player}
						{maximumPlayerStatPoints}
						barColor={'#22c55e'}
						buttonColor={'#AFA9EE'}
						incrementorFunction={incrementStat}
					/>

					<PlayerStatBar
						statName={'Magic'}
						statColor={'#3b82f6'}
						statLegend={'Increases your knowledge of magic, allowing you to use stronger spells, master multiple magics, and more.'}
						statKey={'magicPoints'}
						{player}
						{maximumPlayerStatPoints}
						barColor={'#3b82f6'}
						buttonColor={'#AFA9EE'}
						incrementorFunction={incrementStat}
					/>

					<PlayerStatBar
						statName={'Strength'}
						statColor={'#f87171'}
						statLegend={'Increases your atheleticism, allowing you to use stronger melee attacks, master multiple fighting styles and more.'}
						statKey={'strengthPoints'}
						{player}
						{maximumPlayerStatPoints}
						barColor={'#f87171'}
						buttonColor={'#AFA9EE'}
						incrementorFunction={incrementStat}
					/>

					<PlayerStatBar
						statName={'Weapons'}
						statColor={'#FACC15'}
						statLegend={'Increases your experience in using weapons, allowing you to use stronger weapon abilities, master high level weapons, and more.'}
						statKey={'weaponPoints'}
						{player}
						{maximumPlayerStatPoints}
						barColor={'#FACC15'}
						buttonColor={'#AFA9EE'}
						incrementorFunction={incrementStat}
					/>
				</div>
			</div>
		</div>
	</div>
{/key}
