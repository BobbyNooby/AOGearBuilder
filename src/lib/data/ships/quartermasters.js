import { getData } from '../dataManager';

const quartermasterData = [
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
		mainType: 'Quartermaster',
		subType: 'None',
		rarity: 'Common',
		rarityColor: '#FFFFFF',
		imageId: 'https://i.imgur.com/6QKgfxq.jpg'
	},
	{
		id: 1,
		name: 'Enizor, the Visionary',
		legend:
			"A sixty-eight year old man who is a renowned alchemist in the Bronze Sea, Enzior left his home of Frostmill Island in pursuit of one last adventure that would complete his life's work. Since then, he has revealed to you that his research involves a very old, powerful artifact of some kind, and that he would share it with you if he manages to succeed in researching it. The hardships of the Dark Sea caused him to awaken his latent magic potential, and he now knows how to use Snow Magic.",
		durability: 100,
		magicStorage: 500,
		ramDefense: 0,
		ramStrength: 0,
		resilience: 0,
		speed: 0,
		stability: 5,
		turning: 0,
		maxLevel: 125,
		mainType: 'Quartermaster',
		subType: 'None',
		rarity: 'Uncommon',
		rarityColor: '#817346',
		imageId: 'https://i.imgur.com/JJIbIlo.jpg'
	},
	{
		id: 2,
		name: 'Edward Kenton, the Exiled Captain',
		legend:
			'A twenty-seven year old man who served in the Grand Navy since he was twenty, Edward Kenton has seen everything from naval blockades to bandit camp raiding. He deserted the Grand Navy in pursuit of a simplier life, and joined your crew so that he might feel adventure again. Since then, he has embraced the role of quartermaster and has enjoyed sailing with you, but his bounty is ever increasing as the Grand Navy pursues him for desertion.',
		durability: 300,
		magicStorage: 0,
		ramDefense: 0,
		ramStrength: 0,
		resilience: 5,
		speed: 0,
		stability: 5,
		turning: 0,
		maxLevel: 65,
		mainType: 'Quartermaster',
		subType: 'None',
		rarity: 'Rare',
		rarityColor: '#6765EC',
		imageId: 'https://i.imgur.com/Xob1ibB.jpg'
	}
];

export const quartermasters = getData(quartermasterData);
