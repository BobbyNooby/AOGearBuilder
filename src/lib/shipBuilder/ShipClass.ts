import type { anyItem, MainShip, ShipItemData } from '$lib/utils/itemTypes';
import { ships } from './shipList';

export class CurrentShipBuild {
	database: anyItem[];
	ship: MainShip;
	slots: {
		hullArmorSlot: ShipItemData[];
		quartermasterSlot: ShipItemData[];
		cannonSlot: ShipItemData[];
		siegeWeaponSlot: ShipItemData[];
		sailMaterialSlot: ShipItemData[];
		shipCrewSlot: ShipItemData[];
		ramSlot: ShipItemData[];
		deckhandSlot: ShipItemData[];
	};
	noneItems: {
		hullArmorSlot: ShipItemData;
		quartermasterSlot: ShipItemData;
		cannonSlot: ShipItemData;
		siegeWeaponSlot: ShipItemData;
		sailMaterialSlot: ShipItemData;
		shipCrewSlot: ShipItemData;
		ramSlot: ShipItemData;
		deckhandSlot: ShipItemData;
	};
	constructor(database: anyItem[]) {
		this.database = database;

		this.ship = ships.find((ship): ship is MainShip => ship.name === 'Brig') as MainShip;

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

		this.noneItems = {
			hullArmorSlot: noneHullArmor,
			quartermasterSlot: noneQuartermaster,
			cannonSlot: noneCannon,
			siegeWeaponSlot: noneSiegeWeapon,
			sailMaterialSlot: noneSailMaterial,
			shipCrewSlot: noneShipCrew,
			ramSlot: noneRam,
			deckhandSlot: noneDeckhand
		};

		this.fixShipSlots();
	}

	setShip(ship: MainShip) {
		this.ship = ship;
	}

	fixShipSlots() {
		for (const key of Object.keys(this.slots)) {
			const noneItem = this.noneItems[key as keyof typeof this.noneItems];
			// console.log(this.slots[key]);
			if (this.slots[key as keyof typeof this.slots].length < this.ship[key]) {
				const difference = this.ship[key] - this.slots[key as keyof typeof this.slots].length;
				for (let i = 0; i < difference; i++) {
					this.slots[key as keyof typeof this.slots].push(noneItem);
				}
			} else if (this.slots[key as keyof typeof this.slots].length > this.ship[key]) {
				{
					this.slots[key as keyof typeof this.slots].splice(this.ship[key] - 1);
				}
			}
		}
	}
}
