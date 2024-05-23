import type { MainShip, ShipItemData } from '$lib/utils/itemTypes';
import { ships } from './shipList';

class CurrentShipBuild {
	ship: MainShip;
	hullArmors: ShipItemData[];
	quartermasters: ShipItemData[];
	cannons: ShipItemData[];
	siegeWeapons: ShipItemData[];
	sailMaterials: ShipItemData[];
	shipCrews: ShipItemData[];
	rams: ShipItemData[];
	deckhands: ShipItemData[];
	constructor() {
		try {
			const rowboat = ships.find((ship): ship is MainShip => ship.name === 'Rowboat');

			if (rowboat) {
				this.ship = rowboat;
			} else {
				throw new Error('Rowboat not found in ship list');
			}

            


		} catch (error) {
			console.log(error);
		}
	}
}
