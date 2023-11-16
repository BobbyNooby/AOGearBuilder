<script>
	import {
		accessory1,
		accessory1Gem1,
		accessory1Gem2,
		accessory1Gem3,
		accessory1Enchant,
		accessory1Modifier,
		accessory2,
		accessory2Gem1,
		accessory2Gem2,
		accessory2Gem3,
		accessory2Enchant,
		accessory2Modifier,
		accessory3,
		accessory3Gem1,
		accessory3Gem2,
		accessory3Gem3,
		accessory3Enchant,
		accessory3Modifier,
		chestplate1,
		chestplate1Gem1,
		chestplate1Gem2,
		chestplate1Gem3,
		chestplate1Enchant,
		chestplate1Modifier,
		pants1,
		pants1Gem1,
		pants1Gem2,
		pants1Gem3,
		pants1Enchant,
		pants1Modifier,
		finalPower,
		finalDefense,
		finalAttackSpeed,
		finalIntensity,
		finalAttackSize,
		finalAgility,
		finalInsanity,
		finalDrawback,
		finalWarding
	} from '$lib/utils/statsStore';

	//Used this reactive method of calculating. Reason for this change was mentioned in statsStore.js
	$: {
		// Initialize / update gears
		const gears = {
			accessory1: {
				base: $accessory1,
				gem1: $accessory1Gem1,
				gem2: $accessory1Gem2,
				gem3: $accessory1Gem3,
				enchant: $accessory1Enchant,
				modifier: $accessory1Modifier
			},
			accessory2: {
				base: $accessory2,
				gem1: $accessory2Gem1,
				gem2: $accessory2Gem2,
				gem3: $accessory2Gem3,
				enchant: $accessory2Enchant,
				modifier: $accessory2Modifier
			},
			accessory3: {
				base: $accessory3,
				gem1: $accessory3Gem1,
				gem2: $accessory3Gem2,
				gem3: $accessory3Gem3,
				enchant: $accessory3Enchant,
				modifier: $accessory3Modifier
			},
			chestplate1: {
				base: $chestplate1,
				gem1: $chestplate1Gem1,
				gem2: $chestplate1Gem2,
				gem3: $chestplate1Gem3,
				enchant: $chestplate1Enchant,
				modifier: $chestplate1Modifier
			},
			pants1: {
				base: $pants1,
				gem1: $pants1Gem1,
				gem2: $pants1Gem2,
				gem3: $pants1Gem3,
				enchant: $pants1Enchant,
				modifier: $pants1Modifier
			}
		};

		//Initialize temp variables

		let finalPowerTemp = 0;
		let finalDefenseTemp = 0;
		let finalAgilityTemp = 0;
		let finalAttackSpeedTemp = 0;
		let finalAttackSizeTemp = 0;
		let finalIntensityTemp = 0;
		let finalInsanityTemp = 0;
		let finalDrawbackTemp = 0;
		let finalWardingTemp = 0;

		// Loop adding each item to a final count
		for (const item in gears) {
			const attributes = [
				'power',
				'defense',
				'agility',
				'attackSpeed',
				'attackSize',
				'intensity',
				'insanity',
				'drawback',
				'warding'
			];

			const tempItem = {
				power: 0,
				defense: 0,
				agility: 0,
				attackSize: 0,
				attackSpeed: 0,
				intensity: 0,
				insanity: 0,
				drawback: 0,
				warding: 0
			};
			//Pre modifiers calculation.
			for (const attribute of attributes) {
				// Run through each stat and calculate their value
				tempItem[attribute] =
					gears[item].base[attribute] +
					gears[item].gem1[attribute] +
					gears[item].gem2[attribute] +
					gears[item].gem3[attribute] +
					(attribute === 'warding' || attribute === 'insanity' || attribute === 'drawback' // Test if the attribute is any of these 3
						? gears[item].enchant[attribute] // Add value directly if it is
						: Math.floor(gears[item].enchant[attribute] * (gears[item].base.maxLevel / 10))); // Else multiply by maxLevel / 10
			}

			//Modifier Calculations
			const atlantenOrder = [
				'power',
				'defense',
				'attackSize',
				'attackSpeed',
				'agility',
				'intensity'
			];

			if (gears[item].modifier.name == 'Atlantean Essence') {
				//Calculations for Atlantean
				if (
					//If all is more than zero add power
					tempItem.power > 0 &&
					tempItem.defense > 0 &&
					tempItem.agility > 0 &&
					tempItem.attackSize > 0 &&
					tempItem.attackSpeed > 0 &&
					tempItem.intensity > 0
				) {
					tempItem.power += Math.floor(
						gears[item].modifier.power * (gears[item].base.maxLevel / 10)
					);
					tempItem.insanity += gears[item].modifier.insanity;
				} else {
					// Else do normal atlantean calc
					for (let index = 0; index < atlantenOrder.length; index++) {
						let currentStat = atlantenOrder[index];
						let prevStat = atlantenOrder[index - 1];

						if (tempItem[currentStat] == 0 && (prevStat === undefined || tempItem[prevStat] > 0)) {
							tempItem[currentStat] += Math.floor(
								gears[item].modifier[currentStat] * (gears[item].base.maxLevel / 10)
							);
							tempItem.insanity += gears[item].modifier.insanity;
							break;
						}
					}
				}
			} else {
				// Treat the rest of the modifiers as enchants.
				for (const attribute of attributes) {
					tempItem[attribute] += Math.floor(
						gears[item].modifier[attribute] * (gears[item].base.maxLevel / 10)
					);
				}
			}

			//Add the values to temp
			finalPowerTemp += tempItem.power;
			finalDefenseTemp += tempItem.defense;
			finalAgilityTemp += tempItem.agility;
			finalAttackSpeedTemp += tempItem.attackSpeed;
			finalAttackSizeTemp += tempItem.attackSize;
			finalIntensityTemp += tempItem.intensity;
			finalInsanityTemp += tempItem.insanity;
			finalDrawbackTemp += tempItem.drawback;
			finalWardingTemp += tempItem.warding;
		}
		//Set the final stats.
		finalPower.set(finalPowerTemp);
		finalDefense.set(finalDefenseTemp);
		finalAgility.set(finalAgilityTemp);
		finalAttackSpeed.set(finalAttackSpeedTemp);
		finalAttackSize.set(finalAttackSizeTemp);
		finalIntensity.set(finalIntensityTemp);
		finalInsanity.set(finalInsanityTemp);
		finalDrawback.set(finalDrawbackTemp);
		finalWarding.set(finalWardingTemp);
	}
</script>

<div>
	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/Qnt1WCW.png" alt="Power" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FF8400; -webkit-text-stroke: 1.5px; text-align: center;"
		>
			+
			<span>{$finalPower} </span>
			POWER
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/xm6Io7L.png" alt="Defense" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #737373; -webkit-text-stroke: 1.5px; text-align: center;"
		>
			+
			<span>{$finalDefense} </span>
			DEFENSE
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/ul1c2Ta.png" alt="Agility" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF;  -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #00ffff; text-align: center;"
		>
			+
			<span>{$finalAgility} </span>
			AGILITY
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/KWzGEI7.png" alt="Attack Speed" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF;  -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #0077ff; text-align: center;"
		>
			+
			<span>{$finalAttackSpeed} </span>
			ATTACK SPEED
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/TwDybjN.png" alt="Attack Size" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #00FF00; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #471559; text-align: center;"
		>
			+
			<span>{$finalAttackSize} </span>
			ATTACK SIZE
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/Qgqq9fz.png" alt="Intensity" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFF200; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #712402; text-align: center;"
		>
			+
			<span>{$finalIntensity} </span>
			INTENSITY
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/zuPji7I.png" alt="Insanity" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #8B27DB; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: ##DB0C45; text-align: center;"
		>
			+
			<span>{$finalInsanity} </span>
			INSANITY
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/43RZKlz.png" alt="Drawback" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #DC4040; -webkit-text-stroke: 1.5px; text-align: center;"
		>
			+
			<span>{$finalDrawback} </span>
			DRAWBACK
		</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="https://i.imgur.com/ZMoqTvi.png" alt="Warding" />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #CBCB55; text-align: center;"
		>
			+
			<span>{$finalWarding} </span>
			WARDING
		</p>
	</div>
</div>
