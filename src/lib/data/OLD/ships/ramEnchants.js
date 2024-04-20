import { getData } from '../dataManager';

const ramEnchantsData = [
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
		gemNo: 0,
		mainType: 'Ram Enchant',
		subType: 'None',
		rarity: 'None',
		rarityColor: '#FFFFFF',
		imageId: 'https://i.imgur.com/PzIWvMv.jpg'
	},

	{
		id: 1,
		name: 'Armored',
		legend: 'An enchant that gives +1200 points of Durability and +900 Ram Defense.',
		durability: 1200,
		magicStorage: 0,
		ramDefense: 900,
		ramStrength: 0,
		resilience: 0,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 0,
		gemNo: 0,
		mainType: 'Ram Enchant',
		subType: 'None',
		rarity: 'Exotic',
		rarityColor: '#ED120E',
		imageId: 'https://i.imgur.com/XAMemmw.jpg'
	},

	{
		id: 2,
		name: 'Hard',
		legend: 'An enchant that gives +400 points of Durability and +300 points of Ram Defense.',
		durability: 400,
		magicStorage: 0,
		ramDefense: 300,
		ramStrength: 0,
		resilience: 0,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 0,
		gemNo: 0,
		mainType: 'Ram Enchant',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/AHP8sbj.jpg'
	},

	{
		id: 3,
		name: 'Strong',
		legend: 'An enchant that gives +450 points of Ram Strength.',
		durability: 0,
		magicStorage: 0,
		ramDefense: 0,
		ramStrength: 450,
		resilience: 0,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 0,
		gemNo: 0,
		mainType: 'Ram Enchant',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/EqHjqkx.jpg'
	},

	{
		id: 4,
		name: 'Powerful',
		legend: 'An enchant that gives +900 points of Ram Strength',
		durability: 0,
		magicStorage: 0,
		ramDefense: 0,
		ramStrength: 900,
		resilience: 0,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 0,
		gemNo: 0,
		mainType: 'Ram Enchant',
		subType: 'None',
		rarity: 'Exotic',
		rarityColor: '#ED120E',
		imageId: 'https://i.imgur.com/tYJZ0qq.jpg'
	},

	{
		id: 5,
		name: 'Warship',
		legend: 'An enchant that gives a variety of stats at the cost of others.',
		durability: 0,
		magicStorage: 0,
		ramDefense: -450,
		ramStrength: 1200,
		resilience: 0,
		speed: 0,
		stability: 0,
		turning: 0,
		maxLevel: 0,
		gemNo: 0,
		mainType: 'Ram Enchant',
		subType: 'None',
		rarity: 'Exotic',
		rarityColor: '#ED120E',
		imageId: 'https://i.imgur.com/5Aj6uZ1.jpg'
	}
];

export const ramEnchants = getData(ramEnchantsData);