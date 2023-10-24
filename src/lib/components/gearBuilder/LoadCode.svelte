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

	import {
		getAccessoryById,
		getChestplateById,
		getPantsById,
		getGemById,
		getEnchantById,
		getModifierById
	} from '$lib/utils/getItemById';

	import { playCorrect, playWrong } from '$lib/utils/sound';

	let inputString = '';

	async function loadCode() {
		try {
			// Read text from the clipboard
			inputString = await navigator.clipboard.readText();

			// Parse the input string
			const rows = inputString.split("'");
			const accessory1Row = rows[0].split('.');
			const accessory2Row = rows[1].split('.');
			const accessory3Row = rows[2].split('.');
			const chestplate1Row = rows[3].split('.');
			const pants1Row = rows[4].split('.');

			$accessory1 = getAccessoryById(parseInt(accessory1Row[0]));
			$accessory1Gem1 = getGemById(parseInt(accessory1Row[1]));
			$accessory1Gem2 = getGemById(parseInt(accessory1Row[2]));
			$accessory1Gem3 = getGemById(parseInt(accessory1Row[3]));
			$accessory1Enchant = getEnchantById(parseInt(accessory1Row[4]));
			$accessory1Modifier = getModifierById(parseInt(accessory1Row[5]));

			$accessory2 = getAccessoryById(parseInt(accessory2Row[0]));
			$accessory2Gem1 = getGemById(parseInt(accessory2Row[1]));
			$accessory2Gem2 = getGemById(parseInt(accessory2Row[2]));
			$accessory2Gem3 = getGemById(parseInt(accessory2Row[3]));
			$accessory2Enchant = getEnchantById(parseInt(accessory2Row[4]));
			$accessory2Modifier = getModifierById(parseInt(accessory2Row[5]));

			$accessory3 = getAccessoryById(parseInt(accessory3Row[0]));
			$accessory3Gem1 = getGemById(parseInt(accessory3Row[1]));
			$accessory3Gem2 = getGemById(parseInt(accessory3Row[2]));
			$accessory3Gem3 = getGemById(parseInt(accessory3Row[3]));
			$accessory3Enchant = getEnchantById(parseInt(accessory3Row[4]));
			$accessory3Modifier = getModifierById(parseInt(accessory3Row[5]));

			$chestplate1 = getChestplateById(parseInt(chestplate1Row[0]));
			$chestplate1Gem1 = getGemById(parseInt(chestplate1Row[1]));
			$chestplate1Gem2 = getGemById(parseInt(chestplate1Row[2]));
			$chestplate1Gem3 = getGemById(parseInt(chestplate1Row[3]));
			$chestplate1Enchant = getEnchantById(parseInt(chestplate1Row[4]));
			$chestplate1Modifier = getModifierById(parseInt(chestplate1Row[5]));

			$pants1 = getPantsById(parseInt(pants1Row[0]));
			$pants1Gem1 = getGemById(parseInt(pants1Row[1]));
			$pants1Gem2 = getGemById(parseInt(pants1Row[2]));
			$pants1Gem3 = getGemById(parseInt(pants1Row[3]));
			$pants1Enchant = getEnchantById(parseInt(pants1Row[4]));
			$pants1Modifier = getModifierById(parseInt(pants1Row[5]));

			playCorrect();
		} catch (error) {
			playWrong();
		}
	}
</script>

<div>
	<button
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
		style="font-family: Merriweather;"
		on:click={loadCode}
	>
		Load Build
	</button>
</div>
