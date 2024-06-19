import { filterData } from '$lib/utils/filterData';
import type { anyItem, EnchantItemData, ShipItemData } from '$lib/utils/itemTypes';
import { joinObjects } from '$lib/utils/joinObject';

export class ShipItemSlot {
	base: ShipItemData;
	enchant: EnchantItemData | null = null;
	constructor(base: ShipItemData, enchant: EnchantItemData | null = null) {
		this.base = base;
		this.enchant = enchant;
	}

	setBase(base: ShipItemData) {
		this.base = base;
	}

	setEnchant(enchant: EnchantItemData) {
		this.enchant = enchant;
	}

	getSlotStats(): {} {
		const baseStats = filterData(this.base);
		const enchantStats =
			filterData(
				this.enchant,
				...[
					'powerIncrement',
					'defenseIncrement',
					'agilityIncrement',
					'attackSpeedIncrement',
					'attackSizeIncrement',
					'intensityIncrement',
					'regenerationIncrement',
					'piercingIncrement',
					'resistanceIncrement'
				]
			) || {};

		return joinObjects(baseStats, enchantStats) || {};
	}
}
