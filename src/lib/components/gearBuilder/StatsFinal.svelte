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

			const baseValues = {};

			for (const attribute of attributes) {
				baseValues[attribute] =
					gears[item].base[attribute] +
					gears[item].gem1[attribute] +
					gears[item].gem2[attribute] +
					gears[item].gem3[attribute] +
					(attribute === 'warding' || attribute === 'insanity' || attribute === 'drawback'
						? gears[item].enchant[attribute] // Add value directly
						: Math.floor(gears[item].enchant[attribute] * (gears[item].base.maxLevel / 10))); // Multiply by maxLevel / 10
			}

			const {
				power,
				defense,
				agility,
				attackSpeed,
				attackSize,
				intensity,
				insanity,
				drawback,
				warding
			} = baseValues;

			//Add the values
			finalPowerTemp += power;
			finalDefenseTemp += defense;
			finalAgilityTemp += agility;
			finalAttackSpeedTemp += attackSpeed;
			finalAttackSizeTemp += attackSize;
			finalIntensityTemp += intensity;
			finalInsanityTemp += insanity;
			finalDrawbackTemp += drawback;
			finalWardingTemp += warding;

			//Atlantean calcs
			if (
				power == 0 ||
				(power > 0 &&
					defense > 0 &&
					agility > 0 &&
					attackSpeed > 0 &&
					attackSize > 0 &&
					intensity > 0)
			) {
				finalPowerTemp += Math.floor(gears[item].modifier.power * (gears[item].base.maxLevel / 10));
				finalInsanityTemp += insanity + gears[item].modifier.insanity;
			} else if (power > 0 && defense == 0) {
				finalDefenseTemp += Math.floor(
					gears[item].modifier.defense * (gears[item].base.maxLevel / 10)
				);
				finalInsanityTemp += insanity + gears[item].modifier.insanity;
			} else if (power > 0 && defense > 0 && attackSize == 0) {
				finalAttackSizeTemp += Math.floor(
					gears[item].modifier.attackSize * (gears[item].base.maxLevel / 10)
				);
				finalInsanityTemp += insanity + gears[item].modifier.insanity;
			} else if (power > 0 && defense > 0 && attackSize > 0 && attackSpeed == 0) {
				finalAttackSpeedTemp += Math.floor(
					gears[item].modifier.attackSpeed * (gears[item].base.maxLevel / 10)
				);
				finalInsanityTemp += insanity + gears[item].modifier.insanity;
			} else if (power > 0 && defense > 0 && attackSize > 0 && attackSpeed > 0 && agility == 0) {
				finalAgilityTemp += Math.floor(
					gears[item].modifier.agility * (gears[item].base.maxLevel / 10)
				);
				finalInsanityTemp += insanity + gears[item].modifier.insanity;
			} else if (
				power > 0 &&
				defense > 0 &&
				attackSize > 0 &&
				attackSpeed > 0 &&
				agility > 0 &&
				intensity == 0
			) {
				finalIntensityTemp += Math.floor(
					gears[item].modifier.intensity * (gears[item].base.maxLevel / 10)
				);
				finalInsanityTemp += insanity + gears[item].modifier.insanity;
			}
		}
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
