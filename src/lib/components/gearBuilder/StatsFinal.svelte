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
		pants1Modifier
	} from '$lib/utils/statsStore';
</script>

<div>
	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/power.png" alt="Power"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FF8400; -webkit-text-stroke: 1.5px; text-align: center;">
		+
		<span>{
			$accessory1.power + Math.floor(($accessory1.maxLevel / 10) * $accessory1Enchant.power) + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power + ((($accessory1.power + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power) == 0) || ((($accessory1.power + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power) > 0) && (($accessory1.defense + $accessory1Gem1.defense + $accessory1Gem2.defense + $accessory1Gem3.defense) > 0) && (($accessory1.attackSize + $accessory1Gem1.attackSize + $accessory1Gem2.attackSize + $accessory1Gem3.attackSize) > 0) && (($accessory1.attackSpeed + $accessory1Gem1.attackSpeed + $accessory1Gem2.attackSpeed + $accessory1Gem3.attackSpeed) > 0) && (($accessory1.agility + $accessory1Gem1.agility + $accessory1Gem2.agility + $accessory1Gem3.agility) > 0) && (($accessory1.intensity + $accessory1Gem1.intensity + $accessory1Gem2.intensity + $accessory1Gem3.intensity) > 0)) ? (Math.floor($accessory1Modifier.power * ($accessory1.maxLevel / 10))) : 0) +
			$accessory2.power + Math.floor(($accessory2.maxLevel / 10) * $accessory2Enchant.power) + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power + ((($accessory2.power + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power) == 0) || ((($accessory2.power + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power) > 0) && (($accessory2.defense + $accessory2Gem1.defense + $accessory2Gem2.defense + $accessory2Gem3.defense) > 0) && (($accessory2.attackSize + $accessory2Gem1.attackSize + $accessory2Gem2.attackSize + $accessory2Gem3.attackSize) > 0) && (($accessory2.attackSpeed + $accessory2Gem1.attackSpeed + $accessory2Gem2.attackSpeed + $accessory2Gem3.attackSpeed) > 0) && (($accessory2.agility + $accessory2Gem1.agility + $accessory2Gem2.agility + $accessory2Gem3.agility) > 0) && (($accessory2.intensity + $accessory2Gem1.intensity + $accessory2Gem2.intensity + $accessory2Gem3.intensity) > 0)) ? (Math.floor($accessory2Modifier.power * ($accessory2.maxLevel / 10))) : 0) +
			$accessory3.power + Math.floor(($accessory3.maxLevel / 10) * $accessory3Enchant.power) + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power + ((($accessory3.power + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power) == 0) || ((($accessory3.power + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power) > 0) && (($accessory3.defense + $accessory3Gem1.defense + $accessory3Gem2.defense + $accessory3Gem3.defense) > 0) && (($accessory3.attackSize + $accessory3Gem1.attackSize + $accessory3Gem2.attackSize + $accessory3Gem3.attackSize) > 0) && (($accessory3.attackSpeed + $accessory3Gem1.attackSpeed + $accessory3Gem2.attackSpeed + $accessory3Gem3.attackSpeed) > 0) && (($accessory3.agility + $accessory3Gem1.agility + $accessory3Gem2.agility + $accessory3Gem3.agility) > 0) && (($accessory3.intensity + $accessory3Gem1.intensity + $accessory3Gem2.intensity + $accessory3Gem3.intensity) > 0)) ? (Math.floor($accessory3Modifier.power * ($accessory3.maxLevel / 10))) : 0) +
			$chestplate1.power + Math.floor(($chestplate1.maxLevel / 10) * $chestplate1Enchant.power) + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power + ((($chestplate1.power + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power) == 0) || ((($chestplate1.power + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power) > 0) && (($chestplate1.defense + $chestplate1Gem1.defense + $chestplate1Gem2.defense + $chestplate1Gem3.defense) > 0) && (($chestplate1.attackSize + $chestplate1Gem1.attackSize + $chestplate1Gem2.attackSize + $chestplate1Gem3.attackSize) > 0) && (($chestplate1.attackSpeed + $chestplate1Gem1.attackSpeed + $chestplate1Gem2.attackSpeed + $chestplate1Gem3.attackSpeed) > 0) && (($chestplate1.agility + $chestplate1Gem1.agility + $chestplate1Gem2.agility + $chestplate1Gem3.agility) > 0) && (($chestplate1.intensity + $chestplate1Gem1.intensity + $chestplate1Gem2.intensity + $chestplate1Gem3.intensity) > 0)) ? (Math.floor($chestplate1Modifier.power * ($chestplate1.maxLevel / 10))) : 0) +
			$pants1.power + Math.floor(($pants1.maxLevel / 10) * $pants1Enchant.power) + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power + ((($pants1.power + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power) == 0) || ((($pants1.power + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power) > 0) && (($pants1.defense + $pants1Gem1.defense + $pants1Gem2.defense + $pants1Gem3.defense) > 0) && (($pants1.attackSize + $pants1Gem1.attackSize + $pants1Gem2.attackSize + $pants1Gem3.attackSize) > 0) && (($pants1.attackSpeed + $pants1Gem1.attackSpeed + $pants1Gem2.attackSpeed + $pants1Gem3.attackSpeed) > 0) && (($pants1.agility + $pants1Gem1.agility + $pants1Gem2.agility + $pants1Gem3.agility) > 0) && (($pants1.intensity + $pants1Gem1.intensity + $pants1Gem2.intensity + $pants1Gem3.intensity) > 0)) ? (Math.floor($pants1Modifier.power * ($pants1.maxLevel / 10))) : 0)
		  }
		</span>
		POWER</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/defense.png" alt="Defense"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #737373; -webkit-text-stroke: 1.5px; text-align: center;">
		+
		<span>{
			$accessory1.defense + Math.floor(($accessory1.maxLevel / 10) * $accessory1Enchant.defense) + $accessory1Gem1.defense + $accessory1Gem2.defense + $accessory1Gem3.defense + (((($accessory1.power + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power) > 0) && (($accessory1.defense + $accessory1Gem1.defense + $accessory1Gem2.defense + $accessory1Gem3.defense) == 0))  ? (Math.floor($accessory1Modifier.defense * ($accessory1.maxLevel / 10))) : 0) +
			$accessory2.defense + Math.floor(($accessory2.maxLevel / 10) * $accessory2Enchant.defense) + $accessory2Gem1.defense + $accessory2Gem2.defense + $accessory2Gem3.defense + (((($accessory2.power + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power) > 0) && (($accessory2.defense + $accessory2Gem1.defense + $accessory2Gem2.defense + $accessory2Gem3.defense) == 0))  ? (Math.floor($accessory2Modifier.defense * ($accessory2.maxLevel / 10))) : 0) +
			$accessory3.defense + Math.floor(($accessory3.maxLevel / 10) * $accessory3Enchant.defense) + $accessory3Gem1.defense + $accessory3Gem2.defense + $accessory3Gem3.defense + (((($accessory3.power + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power) > 0) && (($accessory3.defense + $accessory3Gem1.defense + $accessory3Gem2.defense + $accessory3Gem3.defense) == 0))  ? (Math.floor($accessory3Modifier.defense * ($accessory3.maxLevel / 10))) : 0) +
			$chestplate1.defense + Math.floor(($chestplate1.maxLevel / 10) * $chestplate1Enchant.defense) + $chestplate1Gem1.defense + $chestplate1Gem2.defense + $chestplate1Gem3.defense + (((($chestplate1.power + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power) > 0) && (($chestplate1.defense + $chestplate1Gem1.defense + $chestplate1Gem2.defense + $chestplate1Gem3.defense) == 0))  ? (Math.floor($chestplate1Modifier.defense * ($chestplate1.maxLevel / 10))) : 0) +
			$pants1.defense + Math.floor(($pants1.maxLevel / 10) * $pants1Enchant.defense) + $pants1Gem1.defense + $pants1Gem2.defense + $pants1Gem3.defense + (((($pants1.power + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power) > 0) && (($pants1.defense + $pants1Gem1.defense + $pants1Gem2.defense + $pants1Gem3.defense) == 0))  ? (Math.floor($pants1Modifier.defense * ($pants1.maxLevel / 10))) : 0) 
		  }
		</span>
		DEFENSE</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/agility.png" alt="Agility"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF;  -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #00ffff; text-align: center;">
		+
		<span>{
			$accessory1.agility + Math.floor(($accessory1.maxLevel / 10) * $accessory1Enchant.agility) + $accessory1Gem1.agility + $accessory1Gem2.agility + $accessory1Gem3.agility + (((($accessory1.power + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power) > 0) && (($accessory1.defense + $accessory1Gem1.defense + $accessory1Gem2.defense + $accessory1Gem3.defense) > 0) && (($accessory1.attackSize + $accessory1Gem1.attackSize + $accessory1Gem2.attackSize + $accessory1Gem3.attackSize) > 0) && (($accessory1.attackSpeed + $accessory1Gem1.attackSpeed + $accessory1Gem2.attackSpeed + $accessory1Gem3.attackSpeed) > 0) && (($accessory1.agility + $accessory1Gem1.agility + $accessory1Gem2.agility + $accessory1Gem3.agility) == 0)) ? (Math.floor($accessory1Modifier.agility * ($accessory1.maxLevel / 10))) : 0) +
			$accessory2.agility + Math.floor(($accessory2.maxLevel / 10) * $accessory2Enchant.agility) + $accessory2Gem1.agility + $accessory2Gem2.agility + $accessory2Gem3.agility + (((($accessory2.power + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power) > 0) && (($accessory2.defense + $accessory2Gem1.defense + $accessory2Gem2.defense + $accessory2Gem3.defense) > 0) && (($accessory2.attackSize + $accessory2Gem1.attackSize + $accessory2Gem2.attackSize + $accessory2Gem3.attackSize) > 0) && (($accessory2.attackSpeed + $accessory2Gem1.attackSpeed + $accessory2Gem2.attackSpeed + $accessory2Gem3.attackSpeed) > 0) && (($accessory2.agility + $accessory2Gem1.agility + $accessory2Gem2.agility + $accessory2Gem3.agility) == 0)) ? (Math.floor($accessory2Modifier.agility * ($accessory2.maxLevel / 10))) : 0) +
			$accessory3.agility + Math.floor(($accessory3.maxLevel / 10) * $accessory3Enchant.agility) + $accessory3Gem1.agility + $accessory3Gem2.agility + $accessory3Gem3.agility + (((($accessory3.power + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power) > 0) && (($accessory3.defense + $accessory3Gem1.defense + $accessory3Gem2.defense + $accessory3Gem3.defense) > 0) && (($accessory3.attackSize + $accessory3Gem1.attackSize + $accessory3Gem2.attackSize + $accessory3Gem3.attackSize) > 0) && (($accessory3.attackSpeed + $accessory3Gem1.attackSpeed + $accessory3Gem2.attackSpeed + $accessory3Gem3.attackSpeed) > 0) && (($accessory3.agility + $accessory3Gem1.agility + $accessory3Gem2.agility + $accessory3Gem3.agility) == 0)) ? (Math.floor($accessory3Modifier.agility * ($accessory3.maxLevel / 10))) : 0) +
			$chestplate1.agility + Math.floor(($chestplate1.maxLevel / 10) * $chestplate1Enchant.agility) + $chestplate1Gem1.agility + $chestplate1Gem2.agility + $chestplate1Gem3.agility + (((($chestplate1.power + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power) > 0) && (($chestplate1.defense + $chestplate1Gem1.defense + $chestplate1Gem2.defense + $chestplate1Gem3.defense) > 0) && (($chestplate1.attackSize + $chestplate1Gem1.attackSize + $chestplate1Gem2.attackSize + $chestplate1Gem3.attackSize) > 0) && (($chestplate1.attackSpeed + $chestplate1Gem1.attackSpeed + $chestplate1Gem2.attackSpeed + $chestplate1Gem3.attackSpeed) > 0) && (($chestplate1.agility + $chestplate1Gem1.agility + $chestplate1Gem2.agility + $chestplate1Gem3.agility) == 0)) ? (Math.floor($chestplate1Modifier.agility * ($chestplate1.maxLevel / 10))) : 0) +
			$pants1.agility + Math.floor(($pants1.maxLevel / 10) * $pants1Enchant.agility) + $pants1Gem1.agility + $pants1Gem2.agility + $pants1Gem3.agility + (((($pants1.power + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power) > 0) && (($pants1.defense + $pants1Gem1.defense + $pants1Gem2.defense + $pants1Gem3.defense) > 0) && (($pants1.attackSize + $pants1Gem1.attackSize + $pants1Gem2.attackSize + $pants1Gem3.attackSize) > 0) && (($pants1.attackSpeed + $pants1Gem1.attackSpeed + $pants1Gem2.attackSpeed + $pants1Gem3.attackSpeed) > 0) && (($pants1.agility + $pants1Gem1.agility + $pants1Gem2.agility + $pants1Gem3.agility) == 0)) ? (Math.floor($pants1Modifier.agility * ($pants1.maxLevel / 10))) : 0) 
		  }
		</span>
		AGILITY</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/attackspeed.png" alt="Attack Speed"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF;  -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #0077ff; text-align: center;">
		+
		<span>{
			$accessory1.attackSpeed + Math.floor(($accessory1.maxLevel / 10) * $accessory1Enchant.attackSpeed) + $accessory1Gem1.attackSpeed + $accessory1Gem2.attackSpeed + $accessory1Gem3.attackSpeed + (((($accessory1.power + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power) > 0) && (($accessory1.defense + $accessory1Gem1.defense + $accessory1Gem2.defense + $accessory1Gem3.defense) > 0) && (($accessory1.attackSize + $accessory1Gem1.attackSize + $accessory1Gem2.attackSize + $accessory1Gem3.attackSize) > 0) && (($accessory1.attackSpeed + $accessory1Gem1.attackSpeed + $accessory1Gem2.attackSpeed + $accessory1Gem3.attackSpeed) == 0)) ? (Math.floor($accessory1Modifier.attackSpeed * ($accessory1.maxLevel / 10))) : 0) +
			$accessory2.attackSpeed + Math.floor(($accessory2.maxLevel / 10) * $accessory2Enchant.attackSpeed) + $accessory2Gem1.attackSpeed + $accessory2Gem2.attackSpeed + $accessory2Gem3.attackSpeed + (((($accessory2.power + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power) > 0) && (($accessory2.defense + $accessory2Gem1.defense + $accessory2Gem2.defense + $accessory2Gem3.defense) > 0) && (($accessory2.attackSize + $accessory2Gem1.attackSize + $accessory2Gem2.attackSize + $accessory2Gem3.attackSize) > 0) && (($accessory2.attackSpeed + $accessory2Gem1.attackSpeed + $accessory2Gem2.attackSpeed + $accessory2Gem3.attackSpeed) == 0)) ? (Math.floor($accessory2Modifier.attackSpeed * ($accessory2.maxLevel / 10))) : 0) +
			$accessory3.attackSpeed + Math.floor(($accessory3.maxLevel / 10) * $accessory3Enchant.attackSpeed) + $accessory3Gem1.attackSpeed + $accessory3Gem2.attackSpeed + $accessory3Gem3.attackSpeed + (((($accessory3.power + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power) > 0) && (($accessory3.defense + $accessory3Gem1.defense + $accessory3Gem2.defense + $accessory3Gem3.defense) > 0) && (($accessory3.attackSize + $accessory3Gem1.attackSize + $accessory3Gem2.attackSize + $accessory3Gem3.attackSize) > 0) && (($accessory3.attackSpeed + $accessory3Gem1.attackSpeed + $accessory3Gem2.attackSpeed + $accessory3Gem3.attackSpeed) == 0)) ? (Math.floor($accessory3Modifier.attackSpeed * ($accessory3.maxLevel / 10))) : 0) +
			$chestplate1.attackSpeed + Math.floor(($chestplate1.maxLevel / 10) * $chestplate1Enchant.attackSpeed) + $chestplate1Gem1.attackSpeed + $chestplate1Gem2.attackSpeed + $chestplate1Gem3.attackSpeed + (((($chestplate1.power + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power) > 0) && (($chestplate1.defense + $chestplate1Gem1.defense + $chestplate1Gem2.defense + $chestplate1Gem3.defense) > 0) && (($chestplate1.attackSize + $chestplate1Gem1.attackSize + $chestplate1Gem2.attackSize + $chestplate1Gem3.attackSize) > 0) && (($chestplate1.attackSpeed + $chestplate1Gem1.attackSpeed + $chestplate1Gem2.attackSpeed + $chestplate1Gem3.attackSpeed) == 0)) ? (Math.floor($chestplate1Modifier.attackSpeed * ($chestplate1.maxLevel / 10))) : 0) +
			$pants1.attackSpeed + Math.floor(($pants1.maxLevel / 10) * $pants1Enchant.attackSpeed) + $pants1Gem1.attackSpeed + $pants1Gem2.attackSpeed + $pants1Gem3.attackSpeed + (((($pants1.power + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power) > 0) && (($pants1.defense + $pants1Gem1.defense + $pants1Gem2.defense + $pants1Gem3.defense) > 0) && (($pants1.attackSize + $pants1Gem1.attackSize + $pants1Gem2.attackSize + $pants1Gem3.attackSize) > 0) && (($pants1.attackSpeed + $pants1Gem1.attackSpeed + $pants1Gem2.attackSpeed + $pants1Gem3.attackSpeed) == 0)) ? (Math.floor($pants1Modifier.attackSpeed * ($pants1.maxLevel / 10))) : 0)
		  }
		</span>
		ATTACK SPEED</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/attacksize.png" alt="Attack Size"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #00FF00; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #471559; text-align: center;">
		+
		<span>{
			$accessory1.attackSize + Math.floor(($accessory1.maxLevel / 10) * $accessory1Enchant.attackSize) + $accessory1Gem1.attackSize + $accessory1Gem2.attackSize + $accessory1Gem3.attackSize + (((($accessory1.power + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power) > 0) && (($accessory1.defense + $accessory1Gem1.defense + $accessory1Gem2.defense + $accessory1Gem3.defense) > 0) && (($accessory1.attackSize + $accessory1Gem1.attackSize + $accessory1Gem2.attackSize + $accessory1Gem3.attackSize) == 0)) ? (Math.floor($accessory1Modifier.attackSize * ($accessory1.maxLevel / 10 ))) : 0) +
			$accessory2.attackSize + Math.floor(($accessory2.maxLevel / 10) * $accessory2Enchant.attackSize) + $accessory2Gem1.attackSize + $accessory2Gem2.attackSize + $accessory2Gem3.attackSize + (((($accessory2.power + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power) > 0) && (($accessory2.defense + $accessory2Gem1.defense + $accessory2Gem2.defense + $accessory2Gem3.defense) > 0) && (($accessory2.attackSize + $accessory2Gem1.attackSize + $accessory2Gem2.attackSize + $accessory2Gem3.attackSize) == 0)) ? (Math.floor($accessory2Modifier.attackSize * ($accessory2.maxLevel / 10 ))) : 0) +
			$accessory3.attackSize + Math.floor(($accessory3.maxLevel / 10) * $accessory3Enchant.attackSize) + $accessory3Gem1.attackSize + $accessory3Gem2.attackSize + $accessory3Gem3.attackSize + (((($accessory3.power + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power) > 0) && (($accessory3.defense + $accessory3Gem1.defense + $accessory3Gem2.defense + $accessory3Gem3.defense) > 0) && (($accessory3.attackSize + $accessory3Gem1.attackSize + $accessory3Gem2.attackSize + $accessory3Gem3.attackSize) == 0)) ? (Math.floor($accessory3Modifier.attackSize * ($accessory3.maxLevel / 10 ))) : 0) +
			$chestplate1.attackSize + Math.floor(($chestplate1.maxLevel / 10) * $chestplate1Enchant.attackSize) + $chestplate1Gem1.attackSize + $chestplate1Gem2.attackSize + $chestplate1Gem3.attackSize + (((($chestplate1.power + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power) > 0) && (($chestplate1.defense + $chestplate1Gem1.defense + $chestplate1Gem2.defense + $chestplate1Gem3.defense) > 0) && (($chestplate1.attackSize + $chestplate1Gem1.attackSize + $chestplate1Gem2.attackSize + $chestplate1Gem3.attackSize) == 0)) ? (Math.floor($chestplate1Modifier.attackSize * ($chestplate1.maxLevel / 10 ))) : 0) +
			$pants1.attackSize + Math.floor(($pants1.maxLevel / 10) * $pants1Enchant.attackSize) + $pants1Gem1.attackSize + $pants1Gem2.attackSize + $pants1Gem3.attackSize + (((($pants1.power + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power) > 0) && (($pants1.defense + $pants1Gem1.defense + $pants1Gem2.defense + $pants1Gem3.defense) > 0) && (($pants1.attackSize + $pants1Gem1.attackSize + $pants1Gem2.attackSize + $pants1Gem3.attackSize) == 0)) ? (Math.floor($pants1Modifier.attackSize * ($pants1.maxLevel / 10 ))) : 0)
		  }
		</span>
		ATTACK SIZE</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/intensity.png" alt="Intensity"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFF200; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #712402; text-align: center;">
		+
		<span>{
			$accessory1.intensity + Math.floor(($accessory1.maxLevel / 10) * $accessory1Enchant.intensity) + $accessory1Gem1.intensity + $accessory1Gem2.intensity + $accessory1Gem3.intensity + (((($accessory1.power + $accessory1Gem1.power + $accessory1Gem2.power + $accessory1Gem3.power) > 0) && (($accessory1.defense + $accessory1Gem1.defense + $accessory1Gem2.defense + $accessory1Gem3.defense) > 0) && (($accessory1.attackSize + $accessory1Gem1.attackSize + $accessory1Gem2.attackSize + $accessory1Gem3.attackSize) > 0) && (($accessory1.attackSpeed + $accessory1Gem1.attackSpeed + $accessory1Gem2.attackSpeed + $accessory1Gem3.attackSpeed) > 0) && (($accessory1.agility + $accessory1Gem1.agility + $accessory1Gem2.agility + $accessory1Gem3.agility) > 0) && (($accessory1.intensity + $accessory1Gem1.intensity + $accessory1Gem2.intensity + $accessory1Gem3.intensity) == 0)) ? (Math.floor($accessory1Modifier.intensity * ($accessory1.maxLevel / 10))) : 0) +
			$accessory2.intensity + Math.floor(($accessory2.maxLevel / 10) * $accessory2Enchant.intensity) + $accessory2Gem1.intensity + $accessory2Gem2.intensity + $accessory2Gem3.intensity + (((($accessory2.power + $accessory2Gem1.power + $accessory2Gem2.power + $accessory2Gem3.power) > 0) && (($accessory2.defense + $accessory2Gem1.defense + $accessory2Gem2.defense + $accessory2Gem3.defense) > 0) && (($accessory2.attackSize + $accessory2Gem1.attackSize + $accessory2Gem2.attackSize + $accessory2Gem3.attackSize) > 0) && (($accessory2.attackSpeed + $accessory2Gem1.attackSpeed + $accessory2Gem2.attackSpeed + $accessory2Gem3.attackSpeed) > 0) && (($accessory2.agility + $accessory2Gem1.agility + $accessory2Gem2.agility + $accessory2Gem3.agility) > 0) && (($accessory2.intensity + $accessory2Gem1.intensity + $accessory2Gem2.intensity + $accessory2Gem3.intensity) == 0)) ? (Math.floor($accessory2Modifier.intensity * ($accessory2.maxLevel / 10))) : 0) +
			$accessory3.intensity + Math.floor(($accessory3.maxLevel / 10) * $accessory3Enchant.intensity) + $accessory3Gem1.intensity + $accessory3Gem2.intensity + $accessory3Gem3.intensity + (((($accessory3.power + $accessory3Gem1.power + $accessory3Gem2.power + $accessory3Gem3.power) > 0) && (($accessory3.defense + $accessory3Gem1.defense + $accessory3Gem2.defense + $accessory3Gem3.defense) > 0) && (($accessory3.attackSize + $accessory3Gem1.attackSize + $accessory3Gem2.attackSize + $accessory3Gem3.attackSize) > 0) && (($accessory3.attackSpeed + $accessory3Gem1.attackSpeed + $accessory3Gem2.attackSpeed + $accessory3Gem3.attackSpeed) > 0) && (($accessory3.agility + $accessory3Gem1.agility + $accessory3Gem2.agility + $accessory3Gem3.agility) > 0) && (($accessory3.intensity + $accessory3Gem1.intensity + $accessory3Gem2.intensity + $accessory3Gem3.intensity) == 0)) ? (Math.floor($accessory3Modifier.intensity * ($accessory3.maxLevel / 10))) : 0) +
			$chestplate1.intensity + Math.floor(($chestplate1.maxLevel / 10) * $chestplate1Enchant.intensity) + $chestplate1Gem1.intensity + $chestplate1Gem2.intensity + $chestplate1Gem3.intensity + (((($chestplate1.power + $chestplate1Gem1.power + $chestplate1Gem2.power + $chestplate1Gem3.power) > 0) && (($chestplate1.defense + $chestplate1Gem1.defense + $chestplate1Gem2.defense + $chestplate1Gem3.defense) > 0) && (($chestplate1.attackSize + $chestplate1Gem1.attackSize + $chestplate1Gem2.attackSize + $chestplate1Gem3.attackSize) > 0) && (($chestplate1.attackSpeed + $chestplate1Gem1.attackSpeed + $chestplate1Gem2.attackSpeed + $chestplate1Gem3.attackSpeed) > 0) && (($chestplate1.agility + $chestplate1Gem1.agility + $chestplate1Gem2.agility + $chestplate1Gem3.agility) > 0) && (($chestplate1.intensity + $chestplate1Gem1.intensity + $chestplate1Gem2.intensity + $chestplate1Gem3.intensity) == 0)) ? (Math.floor($chestplate1Modifier.intensity * ($chestplate1.maxLevel / 10))) : 0) +
			$pants1.intensity + Math.floor(($pants1.maxLevel / 10) * $pants1Enchant.intensity) + $pants1Gem1.intensity + $pants1Gem2.intensity + $pants1Gem3.intensity + (((($pants1.power + $pants1Gem1.power + $pants1Gem2.power + $pants1Gem3.power) > 0) && (($pants1.defense + $pants1Gem1.defense + $pants1Gem2.defense + $pants1Gem3.defense) > 0) && (($pants1.attackSize + $pants1Gem1.attackSize + $pants1Gem2.attackSize + $pants1Gem3.attackSize) > 0) && (($pants1.attackSpeed + $pants1Gem1.attackSpeed + $pants1Gem2.attackSpeed + $pants1Gem3.attackSpeed) > 0) && (($pants1.agility + $pants1Gem1.agility + $pants1Gem2.agility + $pants1Gem3.agility) > 0) && (($pants1.intensity + $pants1Gem1.intensity + $pants1Gem2.intensity + $pants1Gem3.intensity) == 0)) ? (Math.floor($pants1Modifier.intensity * ($pants1.maxLevel / 10))) : 0) 
		  }
		</span>
		INTENSITY</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/insanity.png" alt="Insanity"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #8B27DB; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: ##DB0C45; text-align: center;">
		+
		<span>{
			$accessory1.insanity + (($accessory1.maxLevel / 10) > 0 ? $accessory1Enchant.insanity + $accessory1Modifier.insanity : 0) + $accessory1Gem1.insanity + $accessory1Gem2.insanity + $accessory1Gem3.insanity +
            $accessory2.insanity + (($accessory2.maxLevel / 10) > 0 ? $accessory2Enchant.insanity + $accessory2Modifier.insanity : 0) + $accessory2Gem1.insanity + $accessory2Gem2.insanity + $accessory2Gem3.insanity +
            $accessory3.insanity + (($accessory3.maxLevel / 10) > 0 ? $accessory3Enchant.insanity + $accessory3Modifier.insanity : 0) + $accessory3Gem1.insanity + $accessory3Gem2.insanity + $accessory3Gem3.insanity +
            $chestplate1.insanity + (($chestplate1.maxLevel / 10) > 0 ? $chestplate1Enchant.insanity + $chestplate1Modifier.insanity : 0) + $chestplate1Gem1.insanity + $chestplate1Gem2.insanity + $chestplate1Gem3.insanity +
            $pants1.insanity + (($pants1.maxLevel / 10) > 0 ? $pants1Enchant.insanity + $pants1Modifier.insanity : 0) + $pants1Gem1.insanity + $pants1Gem2.insanity + $pants1Gem3.insanity
        }
		</span>
		INSANITY</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/drawback.png" alt="Drawback"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #DC4040; -webkit-text-stroke: 1.5px; text-align: center;">
		+
		<span>{
			$accessory1.drawback + (($accessory1.maxLevel / 10) > 0 ? $accessory1Enchant.drawback : 0) + $accessory1Gem1.drawback + $accessory1Gem2.drawback + $accessory1Gem3.drawback +
            $accessory2.drawback + (($accessory2.maxLevel / 10) > 0 ? $accessory2Enchant.drawback : 0) + $accessory2Gem1.drawback + $accessory2Gem2.drawback + $accessory2Gem3.drawback +
            $accessory3.drawback + (($accessory3.maxLevel / 10) > 0 ? $accessory3Enchant.drawback : 0) + $accessory3Gem1.drawback + $accessory3Gem2.drawback + $accessory3Gem3.drawback +
            $chestplate1.drawback + (($chestplate1.maxLevel / 10) > 0 ? $chestplate1Enchant.drawback + $chestplate1Modifier.drawback : 0) + $chestplate1Gem1.drawback + $chestplate1Gem2.drawback + $chestplate1Gem3.drawback +
            $pants1.drawback + (($pants1.maxLevel / 10) > 0 ? $pants1Enchant.drawback + $pants1Modifier.drawback : 0) + $pants1Gem1.drawback + $pants1Gem2.drawback + $pants1Gem3.drawback
        }
		</span>
		DRAWBACK</p>
	</div>

	<div class=" flex items-center">
		<img class=" h-6" src="assets/images/itemstat/warding.png" alt="Warding"/>
		<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #CBCB55; text-align: center;">
		+
		<span>{
			$accessory1.warding + (($accessory1.maxLevel / 10) > 0 ? $accessory1Enchant.warding : 0) + $accessory1Gem1.warding + $accessory1Gem2.warding + $accessory1Gem3.warding +
            $accessory2.warding + (($accessory2.maxLevel / 10) > 0 ? $accessory2Enchant.warding : 0) + $accessory2Gem1.warding + $accessory2Gem2.warding + $accessory2Gem3.warding +
            $accessory3.warding + (($accessory3.maxLevel / 10) > 0 ? $accessory3Enchant.warding : 0) + $accessory3Gem1.warding + $accessory3Gem2.warding + $accessory3Gem3.warding +
            $chestplate1.warding + (($chestplate1.maxLevel / 10) > 0 ? $chestplate1Enchant.warding + $chestplate1Modifier.warding : 0) + $chestplate1Gem1.warding + $chestplate1Gem2.warding + $chestplate1Gem3.warding +
            $pants1.warding + (($pants1.maxLevel / 10) > 0 ? $pants1Enchant.warding + $pants1Modifier.warding : 0) + $pants1Gem1.warding + $pants1Gem2.warding + $pants1Gem3.warding
    	}
		</span>
		WARDING</p>
	</div>

</div>
