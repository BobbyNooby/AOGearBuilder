import { filterData } from '$lib/utils/filterData';
import type { anyItem, EnchantItem, ShipPartItem } from '$lib/utils/itemTypes';
import { joinObjects } from '$lib/utils/joinObject';

export class ShipItemSlot {
	base: ShipPartItem;
	enchant: EnchantItem | undefined = undefined;
	constructor(base: ShipPartItem, enchant: EnchantItem | undefined = undefined) {
		this.base = base;
		this.enchant = enchant;
	}

	setBase(base: ShipPartItem) {
		this.base = base;
	}

	setEnchant(enchant: EnchantItem) {
		this.enchant = enchant;
	}

	getEnchantStats(): {} {
		const partRelations = {
			Ram: 'ram',
			'Hull Armor': 'hull',
			'Sail Material': 'sail'
		};

		try {
			return filterData(this.enchant?.enchantTypes.ship[partRelations[this.base.mainType]]);
		} catch (e) {
			return {};
		}
	}

	getSlotStats(): {} {
		const baseStats = filterData(this.base);

		let enchantStats = this.getEnchantStats() || {};

		try {
			enchantStats =
				filterData(
					enchantStats || {},
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
		} catch (e) {
			console.log(e);
		}

		return joinObjects(baseStats, enchantStats) || {};
	}

	getSlotCode() {
		let slotCode: any[] = [];
		slotCode.push(this.base);
		if (this.enchant != undefined && this.enchant.name != 'None') {
			slotCode.push(this.enchant);
		}
		slotCode = slotCode.map((item) => item.id);
		return slotCode.join("'");
	}
}
