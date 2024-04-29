<script lang="ts">
	import { Player } from '$lib/gearBuilder/playerClasses';
	import PlayerStatBar from './PlayerStatBar.svelte';
	import { hexToRGB } from '$lib/utils/hexToRGB';
	import { writable } from 'svelte/store';
	import { isMobile } from '$lib/utils/mobileStore';
	import { clamp } from '$lib/utils/clamp';
	import { magicRecords } from '$lib/data/playerMagics';
	import { fightingStyleRecords } from '$lib/data/playerFightingStyles';
	import MagicFsSelectButton from './MagicFSSelectButton.svelte';

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

		// Deciding
		player.changeStatPoint(statPoint, amount);

		availablePlayerStatPoints =
			maximumPlayerStatPoints -
			player.vitalityPoints -
			player.magicPoints -
			player.strengthPoints -
			player.weaponPoints;

		updateComponent();
	}

	$: {
		player.level = clamp(player.level, player.minLevel, player.maxLevel);

		baseHealth = 93 + player.level * 7;
		player.updateHealth();
		player.build.fixBuildLevels();
	}

	function handleLevelChange(amount: number) {
		player.changePlayerLevel(amount);
	}

	function resetAllPlayerStats() {
		player.resetStatPoints();
		updateComponent();
	}

	const keyStore = writable(false);

	function updateComponent() {
		player.build.fixBuildLevels();
		keyStore.update((value) => !value);
		updatePage();
	}
</script>

{#key $keyStore}
	{#if !$isMobile}
		<div
			class="w-3/4 bg-black bg-opacity-60 border-white border-2 rounded flex flex-col items-center mb-24"
		>
			<div class="h-full w-full flex flex-row">
				<div class="flex flex-col w-1/3 h-full items-center">
					<div class="m-3">
						<div class="flex flex-col items-center justify-center my-5">
							<div class="flex flex-row">
								{#each Array(player.statBuild.magicNo) as _, i}
									<MagicFsSelectButton
										abilityType={'Magic'}
										abilityName={player.magics[i]}
										abilityImageId={magicRecords[player.magics[i]].imageId}
										abilityIndex={i}
										{player}
										{updatePage}
									/>
									<!-- Leave for the future <MagicSelectButton {player} {updatePage}></MagicSelectButton> -->
								{/each}
							</div>
							<div class="flex flex-row">
								{#each Array(player.statBuild.fightingStyleNo) as _, i}
									<MagicFsSelectButton
										abilityType={'Fighting Style'}
										abilityName={player.fightingStyles[i]}
										abilityImageId={fightingStyleRecords[player.fightingStyles[i]].imageId}
										abilityIndex={i}
										{player}
										{updatePage}
									/>
								{/each}
							</div>
						</div>
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
								on:click={() => {
									resetAllPlayerStats();
								}}><p class="text-l">Reset Stats</p></button
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
	{:else}
		<!-- 
		
		
		MOBILE VIEW 
	
	
	
	-->
		<div
			class="w-auto mx-2 p-3 bg-black bg-opacity-60 border-white border-2 rounded flex flex-col items-center mb-24"
		>
			<div class="h-full w-full flex flex-col">
				<div>
					<div class="flex items-center justify-center my-5">
						<div class="flex flex-col">
							<div class="flex flex-row">
								{#each Array(player.statBuild.magicNo) as _, i}
									<MagicFsSelectButton
										abilityType={'Magic'}
										abilityName={player.magics[i]}
										abilityImageId={magicRecords[player.magics[i]].imageId}
										abilityIndex={i}
										{player}
										{updatePage}
									/>
									<!-- Leave for the future <MagicSelectButton {player} {updatePage}></MagicSelectButton> -->
								{/each}
							</div>
							{#each Array(player.statBuild.fightingStyleNo) as _, i}
								<MagicFsSelectButton
									abilityType={'Fighting Style'}
									abilityName={player.fightingStyles[i]}
									abilityImageId={fightingStyleRecords[player.fightingStyles[i]].imageId}
									abilityIndex={i}
									{player}
									{updatePage}
								/>
							{/each}
						</div>
					</div>
					<div class="flex flex-row items-center justify-center">
						<p style="font-family: Merriweather;" class=" text-white text-3xl mr-2">Level</p>
						<div class="flex items-center">
							<button
								on:click={() => {
									handleLevelChange(-1);
									updatePage();
								}}
								class="bg-black text-white px-2 py-1 rounded border border-white">-</button
							>
							<input
								type="number"
								class="text-black m-1 p-1"
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
								class="bg-black text-white px-2 py-1 rounded border border-white">+</button
							>
						</div>
					</div>
					<div class="flex flex-row text-white my-2 items-center justify-center">
						<p style="font-family: Merriweather;" class="text-xl">
							Health :
							<span style="font-family: Merriweather;" class=" text-green-500 text-xl">
								{player.health}</span
							>
						</p>
					</div>
					<div class="flex flex-row text-white my-2 items-center justify-center">
						<p style="font-family: Merriweather;" class="text-xl">
							Base Health :
							<span style="font-family: Merriweather;" class=" text-green-200 text-xl">
								{baseHealth}</span
							>
						</p>
					</div>
				</div>

				<div class="w-full justify-between flex flex-col my-4">
					<div class="flex items-center text-left justify-center">
						<p class="text-xl my-2" style="color : #9c95ea; font-family : Merriweather;">
							Maximum Points : <span style="color : #c3bef3">{maximumPlayerStatPoints}</span><br />
							Available Points : <span style="color : #c3bef3">{availablePlayerStatPoints}</span>
						</p>
					</div>
					<div class="flex items-center text-right justify-center">
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

				<p class="text-4xl my-4 text-center" style="color : #FFFFFF; font-family : Merriweather;">
					Stat Build<br />
					<span style="color : {player.getStatBuild().color}">{player.getStatBuild().type}</span>
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
		</div>{/if}
{/key}
