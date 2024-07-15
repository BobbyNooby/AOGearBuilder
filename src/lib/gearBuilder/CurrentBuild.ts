import { filterData } from '$lib/utils/filterData';
import type {
	ArmorItem,
	GemItem,
	EnchantItem,
	ModifierItem,
	anyItem,
	GearStats
} from '../utils/itemTypes';
import type { Player } from './playerClasses';

import { ArmorSlot } from './ArmorSlot';
import { noneModifier } from './defaultGears';
//Move to frontend to handle

export class CurrentBuild {
	database: anyItem[] = [];

	parentPlayer: Player;
	slots: {
		accessory1: ArmorSlot;
		accessory2: ArmorSlot;
		accessory3: ArmorSlot;
		chestplate: ArmorSlot;
		pants: ArmorSlot;
	};

	constructor(parentPlayer: Player) {
		//Establish two way interation between player and build
		this.parentPlayer = parentPlayer;
		this.database = parentPlayer.database;

		const noneAccessory = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Accessory'
		);
		const noneChestplate = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Chestplate'
		);
		const nonePants = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Pants'
		);

		const noneEnchant = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Enchant'
		);

		const noneModifier = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Modifier'
		);

		this.slots = {
			accessory1: new ArmorSlot(
				this,
				noneAccessory as ArmorItem,
				noneEnchant as EnchantItem,
				noneModifier as ModifierItem
			),
			accessory2: new ArmorSlot(
				this,
				noneAccessory as ArmorItem,
				noneEnchant as EnchantItem,
				noneModifier as ModifierItem
			),
			accessory3: new ArmorSlot(
				this,
				noneAccessory as ArmorItem,
				noneEnchant as EnchantItem,
				noneModifier as ModifierItem
			),
			chestplate: new ArmorSlot(
				this,
				noneChestplate as ArmorItem,
				noneEnchant as EnchantItem,
				noneModifier as ModifierItem
			),
			pants: new ArmorSlot(
				this,
				nonePants as ArmorItem,
				noneEnchant as EnchantItem,
				noneModifier as ModifierItem
			)
		};
	}

	resetBuild() {
		for (const slot in this.slots) {
			this.slots[slot as keyof typeof this.slots].resetSlot();
		}
	}

	fixBuildLevels() {
		for (const slot of Object.values(this.slots)) {
			slot.fixSlotLevel();
		}
	}

	fixBuildItems() {
		for (const slot of Object.values(this.slots)) {
			slot.fixSlotItems();
		}
	}

	getBuildStats(): GearStats {
		let finalBuildStats: any = {
			power: 0,
			defense: 0,
			agility: 0,
			attackSpeed: 0,
			attackSize: 0,
			intensity: 0,
			regeneration: 0,
			piercing: 0,
			resistance: 0,
			insanity: 0,
			warding: 0,
			drawback: 0
		};

		const currentGearSlotStats: any = [
			this.slots.accessory1.getSlotStats(),
			this.slots.accessory2.getSlotStats(),
			this.slots.accessory3.getSlotStats(),
			this.slots.chestplate.getSlotStats(),
			this.slots.pants.getSlotStats()
		];

		for (const slotStats of currentGearSlotStats) {
			for (const stat in slotStats) {
				finalBuildStats[stat] += slotStats[stat];
			}
		}

		return finalBuildStats;
	}

	validateItem(item: anyItem, inputSlotKey: string): boolean {
		let badConditions: Array<(item: anyItem, slot: ArmorSlot) => boolean> = [];

		// Full build item checking
		for (const slotKey of Object.keys(this.slots)) {
			const slot: ArmorSlot = this.slots[slotKey as keyof typeof this.slots];

			if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
				//Gears validation handling

				const strictlySingleSubtypes: string[] = ['Amulet', 'Helmet'];

				badConditions = [
					(item, slot) => item.id === slot.armor.id && inputSlotKey !== slotKey,
					(item, slot) =>
						strictlySingleSubtypes.includes(item.subType) &&
						item.subType == slot.armor.subType &&
						inputSlotKey !== slotKey,
					(item, slot) =>
						item.name.includes('Arcsphere') &&
						slot.armor.name.includes('Arcsphere') &&
						inputSlotKey !== slotKey
					// (item, slot) => item.subType == 'Magic' && !item.name.includes(this.parentPlayer.magic)
				];
			}

			if (badConditions.some((condition) => condition(item, slot))) {
				return false;
			}
		}

		// Single slot build checking
		const slot: ArmorSlot = this.slots[inputSlotKey as keyof typeof this.slots];

		if (['Enchant', 'Modifier'].includes(item.mainType)) {
			//Enchant / modifier validation handling

			badConditions = [
				(item, slot) => item.name == 'Virtuous' && slot.modifier.name == 'Atlantean Essence',
				(item, slot) => item.name == 'Atlantean Essence' && slot.enchant.name == 'Virtuous',
				(item, slot) =>
					item.mainType === 'Modifier' && !slot.armor.validModifiers.includes(item.name),
				(item, slot) => item.mainType === 'Enchant' && !item.enchantTypes.gear
			];

			// console.log(item.mainType == 'Modifier' && !slot.armor.validModifiers.includes(item.name));
			if (badConditions.some((condition) => condition(item, slot))) {
				return false;
			}
		}

		//Magic validation handling
		if (item.statType && ['Magic', 'Strength'].includes(item.statType)) {
			badConditions = [
				(item, slot) =>
					item.statType == 'Magic' &&
					(!this.parentPlayer.magics.some((magic) => item.name.includes(magic)) ||
						(this.parentPlayer.magics.includes('Light') && item.name.includes('Lightning'))),
				(item, slot) =>
					item.statType == 'Strength' &&
					!this.parentPlayer.fightingStyles.some(
						(strength) =>
							(strength != 'Sailor Fist' && item.name.includes(strength)) ||
							(strength == 'Sailor Fist' && item.name.includes('Sailor Style'))
					)
			];
			if (badConditions.some((condition) => condition(item, slot))) {
				return false;
			}
		}

		return true;
	}

	setGear(item: anyItem, slotKey: keyof typeof this.slots, gemIndex: number | boolean = false) {
		if (this.validateItem(item, slotKey) || item.name == 'None') {
			if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
				this.slots[slotKey].setArmor(item as ArmorItem);
			} else if (item.mainType == 'Enchant') {
				this.slots[slotKey].setEnchant(item as EnchantItem);
			} else if (item.mainType == 'Modifier') {
				this.slots[slotKey].setModifier(item as ModifierItem);
			} else if (item.mainType == 'Gem' && gemIndex !== false) {
				if (typeof gemIndex == 'number') {
					if ((gemIndex as number) < this.slots[slotKey].armor.gemNo) {
						this.slots[slotKey].setGem(gemIndex as number, item as GemItem);
					}
				} else {
					this.slots[slotKey].setGem(0, item as GemItem);
				}
			}
			return true;
		} else {
			return false;
		}
	}

	getBuildCode() {
		let codeArray = [];
		for (const slot of Object.values(this.slots)) {
			codeArray.push(slot.getSlotCode());
		}
		return codeArray.join('|');
	}
}
