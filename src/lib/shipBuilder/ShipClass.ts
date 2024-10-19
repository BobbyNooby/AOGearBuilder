import { filterData } from '$lib/utils/filterData';
import type {
	anyItem,
	EnchantItem,
	EnchantMainTypes,
	MainShip,
	ShipPartItem,
	ShipStats
} from '$lib/utils/itemTypes';
import { ships } from './shipList';
import { ShipItemSlot } from './ShipItemSlot';
import { joinObjects } from '$lib/utils/joinObject';
import { isLegacyShipBuild, loadOldShipCode } from './buildCodeHandling/legacyShipCode';
import { isShipBuildv1, loadShipBuildv1 } from './buildCodeHandling/shipBuildV1';

export class CurrentShipBuild {
	database: anyItem[];
	ship: MainShip;
	slots: {
		hullArmorSlot: ShipItemSlot[];
		quartermasterSlot: ShipItemSlot[];
		cannonSlot: ShipItemSlot[];
		siegeWeaponSlot: ShipItemSlot[];
		sailMaterialSlot: ShipItemSlot[];
		shipCrewSlot: ShipItemSlot[];
		ramSlot: ShipItemSlot[];
		deckhandSlot: ShipItemSlot[];
	};
	noneItems: {
		hullArmorSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
		quartermasterSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
		cannonSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
		siegeWeaponSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
		sailMaterialSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
		shipCrewSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
		ramSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
		deckhandSlot: { base: ShipPartItem; enchant: EnchantItem | undefined };
	};
	constructor(database: anyItem[]) {
		this.database = database;

		this.ship = database.find((ship): ship is MainShip => ship.name === 'Rowboat') as MainShip;

		this.slots = {
			hullArmorSlot: [],
			quartermasterSlot: [],
			cannonSlot: [],
			siegeWeaponSlot: [],
			sailMaterialSlot: [],
			shipCrewSlot: [],
			ramSlot: [],
			deckhandSlot: []
		};

		const noneHullArmor = database.find(
			(item) => item.name === 'None' && item.mainType === 'Hull Armor'
		) as ShipPartItem;
		const noneQuartermaster = database.find(
			(item) => item.name === 'None' && item.mainType === 'Quartermaster'
		) as ShipPartItem;
		const noneCannon = database.find(
			(item) => item.name === 'None' && item.mainType === 'Cannon'
		) as ShipPartItem;
		const noneRam = database.find(
			(item) => item.name === 'None' && item.mainType === 'Ram'
		) as ShipPartItem;
		const noneSailMaterial = database.find(
			(item) => item.name === 'None' && item.mainType === 'Sail Material'
		) as ShipPartItem;
		const noneSiegeWeapon = database.find(
			(item) => item.name === 'None' && item.mainType === 'Siege Weapon'
		) as ShipPartItem;
		const noneShipCrew = database.find(
			(item) => item.name === 'None' && item.mainType === 'Ship Crew'
		) as ShipPartItem;
		const noneDeckhand = database.find(
			(item) => item.name === 'None' && item.mainType === 'Deckhand'
		) as ShipPartItem;
		const noneEnchant = database.find(
			(item) => item.name === 'None' && item.mainType === 'Enchant'
		) as EnchantItem;

		this.noneItems = {
			hullArmorSlot: { base: noneHullArmor, enchant: noneEnchant },
			quartermasterSlot: { base: noneQuartermaster, enchant: undefined },
			cannonSlot: { base: noneCannon, enchant: undefined },
			siegeWeaponSlot: { base: noneSiegeWeapon, enchant: undefined },
			sailMaterialSlot: { base: noneSailMaterial, enchant: noneEnchant },
			shipCrewSlot: { base: noneShipCrew, enchant: undefined },
			ramSlot: { base: noneRam, enchant: noneEnchant },
			deckhandSlot: { base: noneDeckhand, enchant: undefined }
		};

		this.fixShipSlots();
	}

	resetBuild() {
		this.slots = {
			hullArmorSlot: [],
			quartermasterSlot: [],
			cannonSlot: [],
			siegeWeaponSlot: [],
			sailMaterialSlot: [],
			shipCrewSlot: [],
			ramSlot: [],
			deckhandSlot: []
		};

		this.fixShipSlots();
	}

	setShip(ship: MainShip) {
		this.ship = ship;
		this.fixShipSlots();
	}

	fixShipSlots() {
		for (const key of Object.keys(this.slots)) {
			const noneItem = this.noneItems[key as keyof typeof this.noneItems];
			// console.log(this.slots[key]);

			const keyValue = key in this.ship ? this.ship[key] : 0;

			const difference = keyValue - this.slots[key as keyof typeof this.slots].length;

			if (difference > 0) {
				for (let i = 0; i < difference; i++) {
					this.slots[key as keyof typeof this.slots].push(
						new ShipItemSlot(noneItem.base, noneItem.enchant)
					);
				}
			} else if (difference < 0) {
				this.slots[key as keyof typeof this.slots].splice(keyValue);
			}
		}
	}

	setShipPart(
		item: ShipPartItem,
		slotKey: keyof typeof this.slots,
		slotIndex: number | boolean = false,
		shipPartType: 'base' | 'enchant' | undefined = undefined
	) {
		if (slotKey == 'Ship') {
			this.setShip(item as MainShip);
			return true;
		}

		console.log(slotKey, slotIndex);
		if (slotIndex !== false) {
			if (this.slots[slotKey][slotIndex as number].base.id != undefined) {
				if (shipPartType === 'base') {
					this.slots[slotKey][slotIndex as number].setBase(item);
				} else if (shipPartType === 'enchant') {
					this.slots[slotKey][slotIndex as number].setEnchant(item);
				}

				return true;
			} else {
				return false;
			}
		}
	}

	getShipPart(slotKey: keyof typeof this.slots, slotIndex: number) {
		return this.slots[slotKey][slotIndex];
	}

	getShipBuildStats() {
		let finalStats = filterData(this.ship);

		for (const slotKey of Object.keys(this.slots)) {
			for (const slot of this.slots[slotKey as keyof typeof this.slots]) {
				finalStats = joinObjects(finalStats, slot.getSlotStats());
			}
		}

		return finalStats;
	}

	validateItem(
		item: anyItem,
		slotKey: keyof typeof this.slots,
		slotIndex: number | boolean = false
	) {
		if (slotKey == 'MainShip') {
			return true;
		}

		const partRelations = {
			Ram: 'ram',
			'Hull Armor': 'hull',
			'Sail Material': 'sail'
		};

		let badConditions: Array<
			(item: anyItem, slotKey: keyof typeof this.slots, slotIndex: number | boolean) => boolean
		> = [];

		//Full Slot Checking (Warship)

		for (const slotArrayKey in this.slots) {
			for (const slot of this.slots[slotArrayKey as keyof typeof this.slots]) {
				const slotArrayIndex = this.slots[slotArrayKey as keyof typeof this.slots].indexOf(slot);

				badConditions = [
					(item, slotKey, slotIndex) =>
						slotArrayKey !== slotKey &&
						item.mainType == 'Enchant' &&
						item.name == 'Warship' &&
						slot.enchant != null &&
						slot.enchant.name == 'Warship',
					(item, slotKey, slotIndex) =>
						slotArrayKey == slotKey &&
						slotArrayIndex != slotIndex &&
						item.mainType == 'Quartermaster' &&
						slot.base.id == item.id
				];

				try {
					if (badConditions.some((condition) => condition(item, slotKey, slotIndex))) {
						return false;
					}
				} catch (e) {
					return false;
				}
			}
		}

		badConditions = [
			(item, slotKey, slotIndex) =>
				item.mainType == 'Enchant' &&
				!item.enchantTypes.ship[partRelations[this.getShipPart(slotKey, slotIndex).base.mainType]]
		];

		try {
			if (badConditions.some((condition) => condition(item, slotKey, slotIndex))) {
				return false;
			}
		} catch (e) {
			return false;
		}

		return true;
	}

	getBuildCode() {
		let codeArray = [];
		codeArray.push(this.ship.id);
		for (const slot of Object.values(this.slots)) {
			let slotArray = [];
			for (const part of slot) {
				slotArray.push(part.getSlotCode());
			}
			codeArray.push(slotArray.join(','));
		}
		return codeArray.join('-');
	}

	loadBuildCode(database: any[], codeString: string) {
		try {
			codeString = decodeURI(codeString);
			if (isLegacyShipBuild(codeString)) {
				codeString = loadOldShipCode(codeString);
				loadShipBuildv1(this, database, codeString);
			} else if (isShipBuildv1(codeString)) {
				loadShipBuildv1(this, database, codeString);
			}
		} catch (error) {
			console.log(error);
			this.resetBuild();
			return false;
		}
	}
}
