import { getData } from '../dataManager';

const shipCrewData = [
	{
		id: 0,
		name: 'None',
		legend: 'Nothing Lol',
		durability: 0,
		magicStorage: 0,
		ramDefense: 0,
		ramStrength: 0,
		resilience: 0,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 0,
		mainType: 'Ship Crew',
		subType: 'None',
		rarity: 'Common',
		rarityColor: '#FFFFFF',
		imageId: 'https://i.imgur.com/z3oMkap.jpg'
	},
	{
		id: 1,
		name: 'Redwake Warriors',
		legend:
			"A group of trained warriors armed with shark-bone swords that you hired on Redwake in the Bronze Sea. They aren't the greatest crew, but they do their jobs well enough.",
		durability: 0,
		magicStorage: 0,
		ramDefense: 0,
		ramStrength: 0,
		resilience: 0,
		speed: 0,
		stability: 5,
		turning: 0,
		maxLevel: 10,
		mainType: 'Ship Crew',
		subType: 'None',
		rarity: 'Common',
		rarityColor: '#7D7D7F',
		imageId: 'https://i.imgur.com/c4KxmHA.jpg'
	},
	{
		id: 2,
		name: 'Sailors',
		legend:
			"A group of skilled sailors with cutlasses that you hired in Sailor's Lodge in the Bronze Sea. They aren't a particularly strong crew, but they have fair knowledge of the sea and the workings of a ship, increasing the strength of its sails and reinforcing the ship to take less damage when ramming.",
		durability: 0,
		magicStorage: 0,
		ramDefense: 300,
		ramStrength: 0,
		resilience: 10,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 60,
		mainType: 'Ship Crew',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/uwSKytl.jpg'
	},
	{
		id: 3,
		name: 'Ravenna Deserters',
		legend:
			'A batallion of former Bronze Legion warriors that you saved in the Shining Plains of Ravenna, in the Bronze Sea. They deserted the kingdom after being forced by their superiors to execute innocent people. They are a somewhat strong crew with scraps of armor and rugged weapons, and have fair knowledge of the sea and the workings of a ship.',
		durability: 300,
		magicStorage: 0,
		ramDefense: 0,
		ramStrength: 0,
		resilience: 5,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 80,
		mainType: 'Ship Crew',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/UHEcSDs.jpg'
	}
];

export const shipCrews = getData(shipCrewData);
