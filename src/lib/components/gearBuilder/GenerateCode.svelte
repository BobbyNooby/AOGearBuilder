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
	import { playCorrect } from '$lib/utils/sound';

	function generateCode() {
		let code =
			$accessory1.id +
			'.' +
			$accessory1Gem1.id +
			'.' +
			$accessory1Gem2.id +
			'.' +
			$accessory1Gem3.id +
			'.' +
			$accessory1Enchant.id +
			'.' +
			$accessory1Modifier.id +
			"'" +
			$accessory2.id +
			'.' +
			$accessory2Gem1.id +
			'.' +
			$accessory2Gem2.id +
			'.' +
			$accessory2Gem3.id +
			'.' +
			$accessory2Enchant.id +
			'.' +
			$accessory2Modifier.id +
			"'" +
			$accessory3.id +
			'.' +
			$accessory3Gem1.id +
			'.' +
			$accessory3Gem2.id +
			'.' +
			$accessory3Gem3.id +
			'.' +
			$accessory3Enchant.id +
			'.' +
			$accessory3Modifier.id +
			"'" +
			$chestplate1.id +
			'.' +
			$chestplate1Gem1.id +
			'.' +
			$chestplate1Gem2.id +
			'.' +
			$chestplate1Gem3.id +
			'.' +
			$chestplate1Enchant.id +
			'.' +
			$chestplate1Modifier.id +
			"'" +
			$pants1.id +
			'.' +
			$pants1Gem1.id +
			'.' +
			$pants1Gem2.id +
			'.' +
			$pants1Gem3.id +
			'.' +
			$pants1Enchant.id +
			'.' +
			$pants1Modifier.id;

		const clipBoard = document.createElement('textarea'); // Use 'textarea' instead of 'clipBoard'
		clipBoard.value = code;
		document.body.appendChild(clipBoard);
		clipBoard.select();
		document.execCommand('copy');
		document.body.removeChild(clipBoard);
		playCorrect();
	}
</script>

<div>
	<button
		class=" bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
		style="font-family: Merriweather;"
		on:click={generateCode}
	>
		Generate Build
	</button>
</div>
