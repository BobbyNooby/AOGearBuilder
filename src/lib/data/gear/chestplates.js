import { getData } from '../dataManager';

const chestplatesData = [
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
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'None',
		rarityColor: '#FFFFFF',
		imageId: 'https://i.imgur.com/Uj7r6Fm.jpg'
	},
	{
		id: 1,
		name: 'Aereus Robes',
		legend: 'A set of dark purple robes lined with bronze, obtained from a Dark Sealed Chest.',
		defense: 0,
		power: 0,
		agility: 0,
		attackSize: 52,
		attackSpeed: 0,
		intensity: 36,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/x4A2Luy.jpg'
	},
	{
		id: 2,
		name: "Cernyx's Sleeveless Robe",
		legend:
			'A sleeveless robe top made out of fine green fabric, specifically made to fit the large upper body of Cernyx, the Archon of the Greenwish Cult residing in the Forest of Cernunno. It was taken from him after he was defeated in combat.',
		defense: 189,
		power: 0,
		agility: 0,
		attackSize: 0,
		attackSpeed: 24,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/9KOG3mY.jpg'
	},
	{
		id: 3,
		name: 'Dark Bronze Armor',
		legend:
			'A set of finely crafted black iron armor with trims of bronze, obtained from a Dark Sealed Chest.',
		defense: 97,
		power: 0,
		agility: 0,
		attackSize: 0,
		attackSpeed: 48,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/oeo2gAa.jpg'
	},
	{
		id: 4,
		name: 'Lion of Ravenna Armor',
		legend:
			'A hulking set of scarlet armor trimmed in bronze, emblazoned with the symbol of the Ravenna Realm. This armor was specifically made for General Argos, the Lion of Old Ravenna, and was stolen from him after he was killed in the dungeons of Fort Talos in the Bronze Sea.',
		defense: 189,
		power: 0,
		agility: 0,
		attackSize: 0,
		attackSpeed: 0,
		intensity: 32,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/wOCyqPb.jpg'
	},
	{
		id: 5,
		name: 'Ravenna Apostle Gi',
		legend:
			'A finely sewn gi that was specifically made to be worn by Lady Carina, a noble of the Ravenna Realm. It was stolen from her after she was defeated in the Shining Plains of Ravenna.',
		defense: 0,
		power: 21,
		agility: 0,
		attackSize: 0,
		attackSpeed: 24,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/YsTvHp6.jpg'
	},
	{
		id: 6,
		name: 'Ravenna Fallen King Armor',
		legend:
			'A set of bronze armor with an ornate scarlet trim. This armor was specifically made for King Calvus IV.',
		defense: 0,
		power: 21,
		agility: 18,
		attackSize: 18,
		attackSpeed: 0,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/CtDlG8G.jpg'
	},
	{
		id: 7,
		name: 'Ravenna Noble Armor',
		legend:
			'A finely crafted set of bronze armor trimmed in gold, with ornate fabric and golden chainmail. This armor was specifically made to be worn by the nobles of the Ravenna Realm, and was stolen from Lord Elius after he was defeated in the sky of the Bronze Sea.',
		defense: 0,
		power: 21,
		agility: 24,
		attackSize: 0,
		attackSpeed: 0,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/1rOXCYi.jpg'
	},
	{
		id: 8,
		name: 'Siren Top',
		legend:
			'A dress top usually worn by Sirens, which are dangerous mythical creatures found in the Dark Sea. They appear as beautiful women, singing, only to lure in sailors and kill them with their wings and fangs.',
		defense: 0,
		power: 0,
		agility: 30,
		attackSize: 0,
		attackSpeed: 50,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/AZu3qhk.jpg'
	},
	{
		id: 9,
		name: 'Sunken Iron Armor',
		legend:
			'A set of armor made out of arcanium metal that has spent hundreds of years underwater, causing its properties to change. It seems to constantly produce water.',
		defense: 204,
		power: 0,
		agility: 0,
		attackSize: 36,
		attackSpeed: 0,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/MSM7WOL.jpg'
	},
	{
		id: 10,
		name: 'Theurgist Robes',
		legend:
			'A robe once worn by a powerful mage, which seems to provide some kind of divine protection when worn. It seems to be designed to fit three socketed jewels instead of two.',
		defense: 0,
		power: 0,
		agility: 0,
		attackSize: 0,
		attackSpeed: 36,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 1,
		maxLevel: 120,
		gemNo: 3,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/EM1JO68.jpg'
	},
	{
		id: 11,
		name: 'Vatrachos Armor',
		legend:
			'A set of brightly colored armor imbued with some strange kind of power, it seems to grant the wearer great power... at a price.',
		defense: 97,
		power: 37,
		agility: 0,
		attackSize: 0,
		attackSpeed: 0,
		intensity: 0,
		insanity: 0,
		drawback: 3,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/jBEqyRi.jpg'
	},
	{
		id: 12,
		name: 'Titanium / Deluxe Iron Armor',
		legend: 'Why are they both the same defense WHAT...',
		defense: 194,
		power: 0,
		agility: 0,
		attackSize: 0,
		attackSpeed: 0,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/Fnu2uiY.gif'
	},
	{
		id: 13,
		name: 'Bronze Chainmail Shirt',
		legend:
			'A chainmail shirt made out of bronze metal. It was specifically made for General Argos, the Lion of Old Ravenna, and was stolen from him after he was killed in the dungeons of Fort Talos in the Bronze Sea.',
		defense: 0,
		power: 0,
		agility: 34,
		attackSize: 0,
		attackSpeed: 0,
		intensity: 53,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/6JmbBNW.jpg'
	},
	{
		id: 14,
		name: 'Sunken Warrior Armor',
		legend:
			'A green and gold set of armor made out of arcanium metal that has spent hundreds of years underwater, causing its properties to change. It seems to constantly produce water.',
		defense: 204,
		power: 0,
		agility: 0,
		attackSize: 0,
		attackSpeed: 36,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/6ieKg6a.jpg'
	},
	{
		id: 15,
		name: 'Sorcerer Robes',
		legend: 'A robe made out of finely knitted fabric, usually worn by magic-users',
		defense: 0,
		power: 21,
		agility: 0,
		attackSize: 0,
		attackSpeed: 0,
		intensity: 0,
		insanity: 0,
		drawback: 0,
		warding: 0,
		maxLevel: 120,
		gemNo: 2,
		mainType: 'Chestplate',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/awrPLdx.jpg'
	}
];

export const chestplates = getData(chestplatesData);
