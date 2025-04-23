import type {
	AnyItemDetails,
	ArmorDetails,
	EnchantDetails,
	GearStats,
	GemDetails,
	MainTypes,
	ModifierDetails,
	SubTypes
} from '$lib/types/itemTypes';
import type { Player } from './Player';
import { PlayerBuildSlot } from './PlayerBuildSlot';

export class PlayerBuild {
	database: AnyItemDetails[] = [];

	player: Player;

	slots: {
		accessory1: PlayerBuildSlot;
		accessory2: PlayerBuildSlot;
		accessory3: PlayerBuildSlot;
		chestplate: PlayerBuildSlot;
		pants: PlayerBuildSlot;
	};

	constructor(player: Player) {
		this.database = player.database;
		this.player = player;

		const noneAccessory = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Accessory'
		) as ArmorDetails;
		const noneChestplate = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Chestplate'
		) as ArmorDetails;
		const nonePants = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Pants'
		) as ArmorDetails;
		const noneEnchant = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Enchant'
		) as EnchantDetails;
		const noneGem = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Gem'
		) as GemDetails;
		const noneModifier = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Modifier'
		) as ModifierDetails;

		this.slots = {
			accessory1: new PlayerBuildSlot(this, noneAccessory, noneEnchant, noneModifier),
			accessory2: new PlayerBuildSlot(this, noneAccessory, noneEnchant, noneModifier),
			accessory3: new PlayerBuildSlot(this, noneAccessory, noneEnchant, noneModifier),
			chestplate: new PlayerBuildSlot(this, noneChestplate, noneEnchant, noneModifier),
			pants: new PlayerBuildSlot(this, nonePants, noneEnchant, noneModifier)
		};
	}

	resetBuild() {
		for (const slot in this.slots) {
			this.slots[slot as keyof typeof this.slots].resetSlot();
		}
	}

	fixBuildLevels() {
		for (const slot in this.slots) {
			this.slots[slot as keyof typeof this.slots].fixSlotItems();
		}
	}

	fixBuildItems() {
		for (const slot in this.slots) {
			this.slots[slot as keyof typeof this.slots].fixSlotItems();
		}
	}

	getBuildStats(): GearStats {
		let finalBuildStats = {
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
		for (const slotKey of Object.keys(this.slots) as Array<keyof typeof this.slots>) {
			const slotClass = this.slots[slotKey];

			const slotStats = slotClass.getSlotStats();
			for (const statKey of Object.keys(finalBuildStats) as Array<keyof GearStats>) {
				finalBuildStats[statKey] += slotStats[statKey];
			}
		}

		return finalBuildStats;
	}

	validateItem(item: AnyItemDetails, inputSlotKey: keyof typeof this.slots) {
		let badConditions: Array<(item: AnyItemDetails, slot: PlayerBuildSlot) => boolean> = [];

		//Full build item checking
		for (const slotKey of Object.keys(this.slots) as Array<keyof typeof this.slots>) {
			const slot = this.slots[slotKey];

			if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
				//Gears validation

				const strictlySingleSubtypes: SubTypes[] = ['Amulet', 'Helmet'];

				badConditions = [
					(item, slot) => item.id === slot.armor.id && inputSlotKey !== slotKey,
					(item, slot) =>
						strictlySingleSubtypes.includes(item.subType!) &&
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

		// Single slot item checking

		const slot: PlayerBuildSlot = this.slots[inputSlotKey];

		if (['Enchant', 'Modifier'].includes(item.mainType)) {
			//Enchant / modifier validaton

			badConditions = [
				(item, slot) => item.name == 'Virtuous' && slot.modifier.name == 'Atlantean Essence',
				(item, slot) => item.name == 'Atlantean Essence' && slot.enchant.name == 'Virtuous',
				(item, slot) =>
					item.mainType === 'Modifier' && !slot.armor.validModifiers.includes(item.name),
				(item, slot) => item.mainType === 'Enchant' && !item.enchantTypes.gear
			];

			if (badConditions.some((condition) => condition(item, slot))) {
				return false;
			}
		}

		//Magic validation handling
		if (item.statType && ['Magic', 'Strength'].includes(item.statType)) {
			badConditions = [
				(item, slot) =>
					item.statType == 'Magic' &&
					!this.player.statBuild.magics.some((magic) => magic == item.imbueType),
				(item, slot) =>
					item.statType == 'Strength' &&
					!this.player.statBuild.fightingStyles.some((style) => style == item.imbueType)
			];
			if (badConditions.some((condition) => condition(item, slot))) {
				return false;
			}
		}

		return true;
	}

	setGear(item: AnyItemDetails, slotKey: keyof typeof this.slots, gemIndex: number | null = null) {
		if (this.validateItem(item, slotKey) || item.name == 'None') {
			if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
				this.slots[slotKey].setArmor(item as ArmorDetails);
			} else if (item.mainType == 'Enchant') {
				this.slots[slotKey].setEnchant(item as EnchantDetails);
			} else if (item.mainType == 'Modifier') {
				this.slots[slotKey].setModifier(item as ModifierDetails);
			} else if (item.mainType == 'Gem' && gemIndex !== null) {
				if (typeof gemIndex == 'number') {
					if ((gemIndex as number) < this.slots[slotKey].armor.gemNo) {
						this.slots[slotKey].setGem(item as GemDetails, gemIndex as number);
					}
				} else {
					this.slots[slotKey].setGem(item as GemDetails, 0);
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
