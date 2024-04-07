<script lang="ts">
	import { Player } from '$lib/playerClasses';
	import { listOfMagics } from '$lib/dataConstants';

	export let player: Player;

	let maximumPlayerStatPoints = player.level * 2;
	let baseHealth = 93 + player.level * 7;
	player.health = baseHealth + player.build.getBuildStats().defense;

	$: {
		maximumPlayerStatPoints = player.level * 2;

		if (player.level > player.maxLevel) {
			player.level = player.maxLevel;
		} else if (player.level < player.minLevel) {
			player.level = player.minLevel;
		}

		if (player.magicPoints > maximumPlayerStatPoints) {
			player.magicPoints = maximumPlayerStatPoints;
		} else if (player.magicPoints < 0) {
			player.magicPoints = 0;
		}

		if (player.vitalityPoints > maximumPlayerStatPoints) {
			player.vitalityPoints = maximumPlayerStatPoints;
		} else if (player.vitalityPoints < 0) {
			player.vitalityPoints = 0;
		}

		if (player.strengthPoints > maximumPlayerStatPoints) {
			player.strengthPoints = maximumPlayerStatPoints;
		} else if (player.strengthPoints < 0) {
			player.strengthPoints = 0;
		}

		if (player.weaponPoints > maximumPlayerStatPoints) {
			player.weaponPoints = maximumPlayerStatPoints;
		} else if (player.weaponPoints < 0) {
			player.weaponPoints = 0;
		}

		baseHealth = 93 + player.level * 7;
		player.health = baseHealth + player.build.getBuildStats().defense;
	}

	function handleLevelChange(amount: number) {
		const newLevel = player.level + amount;
		if (player.minLevel <= newLevel && newLevel <= player.maxLevel) {
			player.level = newLevel;
		}
	}

	function handleLevelInput() {
		if (player.level > player.maxLevel) {
			player.level = player.maxLevel;
		} else if (player.level < player.minLevel) {
			player.level = player.minLevel;
		}
	}
</script>

<div class="w-3/4 bg-black bg-opacity-70 border-white border-2 rounded flex flex-col items-center">
	<div class="h-10 w-full flex flex-row">
		<div class="flex flex-col bg-red-500 w-1/3 h-full items-center">
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
								player.level -= 1;
							}}
							class="bg-black text-white px-4 py-2 rounded border border-white">-</button
						>
						<input
							type="number"
							class="text-black m-2 p-2"
							min={player.minLevel}
							max={player.maxLevel}
							on:input={handleLevelInput}
							on:change={handleLevelInput}
							bind:value={player.level}
						/>
						<button
							on:click={() => {
								player.level += 1;
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
					<p style="font-family: Merriweather;" class=" text-green-200 text-xl m-3">{baseHealth}</p>
				</div>
			</div>
		</div>
		<div class="bg-blue-500 w-full h-full items-center">
			<div class="m-3 bg-yellow-300">
				<!-- VITALITY -->
				<div class="flex flex-col">
					<div class="flex flex-row">
						<p>Vitality</p>

						<div class="flex items-center">
							<button
								on:click={() => {
									player.vitalityPoints -= 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">-</button
							>
							<input
								type="number"
								class="text-black m-2 p-2"
								min={0}
								max={maximumPlayerStatPoints}
								bind:value={player.vitalityPoints}
							/>
							<button
								on:click={() => {
									player.vitalityPoints += 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">+</button
							>
						</div>
					</div>
					<div class="border-2 border-green-500">
						<div class="border-2 border-gray-800 bg-gray-800">
							<div
								class="bg-green-500 h-2"
								style="width: {(player.vitalityPoints / maximumPlayerStatPoints) * 100}%;"
							></div>
						</div>
					</div>
				</div>

				<!-- MAGIC -->
				<div class="flex flex-col">
					<div class="flex flex-row">
						<p>Magic</p>

						<div class="flex items-center">
							<button
								on:click={() => {
									player.magicPoints -= 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">-</button
							>
							<input
								type="number"
								class="text-black m-2 p-2"
								min={0}
								max={maximumPlayerStatPoints}
								bind:value={player.magicPoints}
							/>
							<button
								on:click={() => {
									player.magicPoints += 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">+</button
							>
						</div>
					</div>
					<div class="border-2 border-blue-500">
						<div class="border-2 border-gray-800 bg-gray-800">
							<div
								class="bg-blue-500 h-2"
								style="width: {(player.magicPoints / maximumPlayerStatPoints) * 100}%;"
							></div>
						</div>
					</div>
				</div>

				<!-- STRENGTH -->
				<div class="flex flex-col">
					<div class="flex flex-row">
						<p>Strength</p>

						<div class="flex items-center">
							<button
								on:click={() => {
									player.strengthPoints -= 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">-</button
							>
							<input
								type="number"
								class="text-black m-2 p-2"
								min={0}
								max={maximumPlayerStatPoints}
								bind:value={player.strengthPoints}
							/>
							<button
								on:click={() => {
									player.strengthPoints += 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">+</button
							>
						</div>
						>
					</div>
					<div class="border-2 border-red-400">
						<div class="border-2 border-gray-800 bg-gray-800">
							<div
								class="bg-red-400 h-2"
								style="width: {(player.strengthPoints / maximumPlayerStatPoints) * 100}%;"
							></div>
						</div>
					</div>
				</div>

				<div class="flex flex-col">
					<div class="flex flex-row">
						<p>Weapons</p>

						<div class="flex items-center">
							<button
								on:click={() => {
									player.weaponPoints -= 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">-</button
							>
							<input
								type="number"
								class="text-black m-2 p-2"
								min={0}
								max={maximumPlayerStatPoints}
								bind:value={player.weaponPoints}
							/>
							<button
								on:click={() => {
									player.weaponPoints += 1;
								}}
								class="bg-black text-white px-4 py-2 rounded border border-white">+</button
							>
						</div>
						>
					</div>
					<div class="border-2 border-yellow-400">
						<div class="border-2 border-gray-800 bg-gray-800">
							<div
								class="bg-yellow-400 h-2"
								style="width: {(player.weaponPoints / maximumPlayerStatPoints) * 100}%;"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
