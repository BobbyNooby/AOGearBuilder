import { getData } from './dataManager';

const modifiersData = [
	{
		id: 0,
		name: 'None',
		legend: 'Nothing Lol',
		defense: 0,
		power: 0,
		agility: 0,
		attackSize: 0,
		attackSpeed: 0,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 0,
		gemNo: 0,
		mainType: 'None',
		subType: 'None',
		rarity: 'None',
		rarityColor: '#FFFFFF',
		imageId: 'https://i.imgur.com/iKfI8Cp.jpg'
	},

	{
		id: 1,
		name: 'Atlantean Essence',
		legend:
			'Gives stats per 10 levels rounded down in the following order depending on if your item has the stat or not: Power -> Defense -> Attack Size -> Attack Speed -> Agility -> Intensity -> Power',
		defense: 8.83, // Defense Changed?
		power: 1,
		agility: 3,
		attackSize: 3,
		attackSpeed: 3,
		intensity: 3,
		insanity: 1,
		drawback: 0,
		warding: 0,
		maxLevel: 0,
		gemNo: 0,
		mainType: 'Modifier',
		subType: 'None',
		rarity: 'Exotic',
		rarityColor: '#ED120E',
		imageId: 'https://i.imgur.com/JvqDmI1.jpg'
	}
];

export const modifiers = getData(modifiersData);
