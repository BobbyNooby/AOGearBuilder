import { filterData } from '$lib/utils/filterData';
import type {
	anyItem,
	EnchantItemData,
	EnchantMainTypes,
	MainShip,
	ShipItemData,
	ShipStats
} from '$lib/utils/itemTypes';
import { ships } from './shipList';
import { ShipItemSlot } from './ShipItemSlot';
import { joinObjects } from '$lib/utils/joinObject';

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
		hullArmorSlot: ShipItemSlot;
		quartermasterSlot: ShipItemSlot;
		cannonSlot: ShipItemSlot;
		siegeWeaponSlot: ShipItemSlot;
		sailMaterialSlot: ShipItemSlot;
		shipCrewSlot: ShipItemSlot;
		ramSlot: ShipItemSlot;
		deckhandSlot: ShipItemSlot;
	};
	constructor(database: anyItem[]) {
		this.database = database;

		this.ship = ships.find((ship): ship is MainShip => ship.name === 'Rowboat') as MainShip;

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
		) as ShipItemData;
		const noneQuartermaster = database.find(
			(item) => item.name === 'None' && item.mainType === 'Quartermaster'
		) as ShipItemData;
		const noneCannon = database.find(
			(item) => item.name === 'None' && item.mainType === 'Cannon'
		) as ShipItemData;
		const noneRam = database.find(
			(item) => item.name === 'None' && item.mainType === 'Ram'
		) as ShipItemData;
		const noneSailMaterial = database.find(
			(item) => item.name === 'None' && item.mainType === 'Sail Material'
		) as ShipItemData;
		const noneSiegeWeapon = database.find(
			(item) => item.name === 'None' && item.mainType === 'Siege Weapon'
		) as ShipItemData;
		const noneShipCrew = database.find(
			(item) => item.name === 'None' && item.mainType === 'Ship Crew'
		) as ShipItemData;
		const noneDeckhand = database.find(
			(item) => item.name === 'None' && item.mainType === 'Deckhand'
		) as ShipItemData;
		const noneEnchant = database.find(
			(item) => item.name === 'None' && item.mainType === 'Enchant'
		) as EnchantItemData;

		this.noneItems = {
			hullArmorSlot: new ShipItemSlot(noneHullArmor, noneEnchant),
			quartermasterSlot: new ShipItemSlot(noneQuartermaster),
			cannonSlot: new ShipItemSlot(noneCannon, noneEnchant),
			siegeWeaponSlot: new ShipItemSlot(noneSiegeWeapon, noneEnchant),
			sailMaterialSlot: new ShipItemSlot(noneSailMaterial, noneEnchant),
			shipCrewSlot: new ShipItemSlot(noneShipCrew),
			ramSlot: new ShipItemSlot(noneRam, noneEnchant),
			deckhandSlot: new ShipItemSlot(noneDeckhand)
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

			const difference = this.ship[key] - this.slots[key as keyof typeof this.slots].length;

			if (difference > 0) {
				for (let i = 0; i < difference; i++) {
					this.slots[key as keyof typeof this.slots].push(noneItem);
				}
			} else if (difference < 0) {
				this.slots[key as keyof typeof this.slots].splice(this.ship[key]);
			}
		}

		console.log(this.slots);
	}

	setShipPart(
		item: ShipItemData,
		slotKey: keyof typeof this.slots,
		slotIndex: number | boolean = false,
		shipPartType: 'base' | 'enchant' | undefined = undefined
	) {
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

	getShipBuildStats() {
		let finalStats = filterData(this.ship);

		for (const slotKey of Object.keys(this.slots)) {
			for (const slot of this.slots[slotKey as keyof typeof this.slots]) {
				finalStats = joinObjects(finalStats, slot.getSlotStats());
			}
		}

		return finalStats;
	}
}
