<script>
	import {
		currentShip,
		hullArmor1,
		hullArmor1Enchant,
		sailMaterial1,
		sailMaterial1Enchant,
		quartermaster1,
		quartermaster2,
		cannon1,
		siegeWeapon1,
		shipCrew1,
		ram1,
		ram1Enchant,
		deckhand1,
		deckhand2,
		deckhand3,
		deckhand4,
		finalDurability,
		finalMagicStorage,
		finalRamDefense,
		finalResilience,
		finalSpeed,
		finalStability,
		finalTurning,
		finalRamStrength
	} from '$lib/utils/shipStatsStore';

	$: {
		const currentShipParts = {
			ship: {
				base: $currentShip
			},
			hull: {
				base: $hullArmor1,
				enchant: $hullArmor1Enchant
			},
			quartermasters: {
				quartermaster1: $quartermaster1,
				quartermaster2: $quartermaster2
			},
			weapons: {
				cannon: $cannon1,
				siegeWeapon: $siegeWeapon1
			},
			sails: {
				base: $sailMaterial1,
				enchant: $sailMaterial1Enchant
			},
			rams: {
				base: $ram1,
				enchant: $ram1Enchant
			},
			crew: {
				shipCrew1: $shipCrew1
			},
			deckhands: {
				deckhand1: $deckhand1,
				deckhand2: $deckhand2,
				deckhand3: $deckhand3,
				deckhand4: $deckhand4
			}
		};

		let finalShipStatsTemp = {
			durability: 0,
			magicStorage: 0,
			ramDefense: 0,
			ramStrength: 0,
			resilience: 0,
			speed: 0,
			stability: 0,
			turning: 0
		};

		const attributes = [
			'durability',
			'magicStorage',
			'ramDefense',
			'ramStrength',
			'resilience',
			'speed',
			'stability',
			'turning'
		];

		for (const category in currentShipParts) {
			for (const item in currentShipParts[category]) {
				if (
					item != 'enchant' ||
					(item == 'enchant' && currentShipParts[category]['base'].name != 'None')
				) {
					for (const attribute of attributes) {
						finalShipStatsTemp[attribute] += currentShipParts[category][item][attribute];
					}
				}
			}
		}

		finalDurability.set(finalShipStatsTemp.durability);
		finalMagicStorage.set(finalShipStatsTemp.magicStorage);
		finalRamDefense.set(finalShipStatsTemp.ramDefense);
		finalRamStrength.set(finalShipStatsTemp.ramStrength);
		finalResilience.set(finalShipStatsTemp.resilience);
		finalSpeed.set(finalShipStatsTemp.speed);
		finalStability.set(finalShipStatsTemp.stability);
		finalTurning.set(finalShipStatsTemp.turning);
	}
</script>

<div>
	{#if $finalStability > 0 && $finalStability <= 100}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/stability.png" alt="Stability" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #6297C1; -webkit-text-stroke: 1px; -webkit-text-stroke-color : #124975; text-align: center;"
			>
				<span>{$finalStability}%</span>
				STABILITY
			</p>
		</div>
	{/if}
	{#if $finalStability > 100}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/stability.png" alt="Stability" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #6297C1; -webkit-text-stroke: 1px; -webkit-text-stroke-color : #124975; text-align: center;"
			>
				<span
					>100%<span
						style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FF0000; -webkit-text-stroke: 1px; -webkit-text-stroke-color : #000000; text-align: center;"
						>(+{$finalStability - 100}%)</span
					></span
				>
				STABILITY
			</p>
		</div>
	{/if}

	{#if $finalDurability >= 100}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/durability.png" alt="Durability" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #737373; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color : #000000; text-align: center;"
			>
				<span>{$finalDurability}</span>
				DURABILITY
			</p>
		</div>
	{:else}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/durability.png" alt="Durability" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #737373; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color : #000000; text-align: center;"
			>
				<span>100</span>
				DURABILITY
			</p>
		</div>
	{/if}

	{#if $finalMagicStorage != 0}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/magicStorage.png" alt="Magic Storage" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #BA70EB; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color : #000000; text-align: center;"
			>
				<span>{$finalMagicStorage}</span>
				MAGIC STORAGE
			</p>
		</div>
	{/if}

	{#if $finalTurning != 0}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/turning.png" alt="Turning" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1px; -webkit-text-stroke-color : #584A8C; text-align: center;"
			>
				<span>{$finalTurning}</span>
				TURNING
			</p>
		</div>
	{/if}

	{#if $finalSpeed != 0}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/speed.png" alt="Speed" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #00ffff; text-align: center;"
			>
				<span>{$finalSpeed}</span>
				SPEED
			</p>
		</div>
	{/if}

	{#if $finalResilience > 0 && $finalResilience <= 100}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/resilience.png" alt="Resilience" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #AF2230; text-align: center;"
			>
				<span>{$finalResilience}%</span>
				RESILIENCE
			</p>
		</div>
	{/if}
	{#if $finalResilience > 100}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/resilience.png" alt="Resilience" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #AF2230; text-align: center;"
			>
				<span
					>100%<span
						style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FF0000; -webkit-text-stroke: 1px; -webkit-text-stroke-color : #000000; text-align: center;"
						>(+{$finalResilience - 100}%)</span
					></span
				>
				RESILIENCE
			</p>
		</div>
	{/if}

	{#if $finalRamStrength != 0}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/ramStrength.png" alt="Ram Strength" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FF8400; -webkit-text-stroke: 1.5px; text-align: center;"
			>
				<span>{$finalRamStrength}</span>
				RAM STRENGTH
			</p>
		</div>
	{/if}

	{#if $finalRamDefense != 0}
		<div class="flex $currentShips-center">
			<img class="h-6" src="/assets/images/stats/ramDefense.png" alt="Ram Defense" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #6B6BD7; text-align: center;"
			>
				<span>{$finalRamDefense}</span>
				RAM DEFENSE
			</p>
		</div>
	{/if}
</div>
