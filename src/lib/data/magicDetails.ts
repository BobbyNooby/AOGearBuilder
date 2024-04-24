import { staticImagesRootFolder } from '$lib/dataConstants';

//Unused for future update
export type magicDetails = {
	name: string;
	legend: string;

	color: string;

	magicSize: number;
	magicSpeed: number;
	magicDamage: number;
	magicDestruction: number;

	imageId: string;
};

export const magicDetailsList: Record<string, magicDetails> = {
	Acid: {
		name: 'Acid',
		legend:
			'Allows the user to form a caustic, reactive liquid that corrodes through enemies and leaves behind deadly puddles of bubbling acid.',
		color: '#2DB800',

		magicSize: 1.05,
		magicSpeed: 1.0,
		magicDamage: 0.875,
		magicDestruction: 0.25,

		imageId: staticImagesRootFolder + '/Magics/Acid_Magic.webp'
	},
	Ash: {
		name: 'Ash',
		legend:
			'Allows the user to shroud the air with smoldering cinders, preserving the most ill-fated as ashen statues.',
		color: '#6C200A',

		magicSize: 1.25,
		magicSpeed: 0.9,
		magicDamage: 0.85,
		magicDestruction: 0.3,

		imageId: staticImagesRootFolder + '/Magics/Ash_Magic.webp'
	},
	Crystal: {
		name: 'Crystal',
		legend:
			'Allows the user to materialize luminous crystals which embed themselves in adversaries and brilliantly shatter after high accumulation.',
		color: '#B83731',

		magicSize: 1.15,
		magicSpeed: 0.75,
		magicDamage: 0.975,
		magicDestruction: 0.725,

		imageId: staticImagesRootFolder + '/Magics/Crystal_Magic.webp'
	},
	Earth: {
		name: 'Earth',
		legend:
			'Allows the user to generate solid rock to crush enemies under giant boulders and earthen pillars.',
		color: '#705441',

		magicSize: 1.3,
		magicSpeed: 0.6,
		magicDamage: 1.0,
		magicDestruction: 0.75,

		imageId: staticImagesRootFolder + '/Magics/Earth_Magic.webp'
	},
	Explosion: {
		name: 'Explosion',
		legend:
			'Allows the user to wreak havoc with massive explosions, leaving any remains singed from combustion.',
		color: '#B48644',

		magicSize: 1.3,
		magicSpeed: 0.8,
		magicDamage: 0.925,
		magicDestruction: 1.2,

		imageId: staticImagesRootFolder + '/Magics/Explosion_Magic.webp'
	},
	Fire: {
		name: 'Fire',
		legend: 'Allows the user to cast fearsome flames, engulfing enemies in a roaring blaze.',
		color: '#BD6300',

		magicSize: 1.1,
		magicSpeed: 1.0,
		magicDamage: 0.85,
		magicDestruction: 0.8,

		imageId: staticImagesRootFolder + '/Magics/Fire_Magic.webp'
	},
	Glass: {
		name: 'Glass',
		legend:
			'Allows the user to generate elegant ornaments of glass that can shatter into knife-like shards to keep danger at bay.',
		color: '#969DA9',

		magicSize: 1.1,
		magicSpeed: 1.0,
		magicDamage: 0.9,
		magicDestruction: 0.3,

		imageId: staticImagesRootFolder + '/Magics/Glass_Magic.webp'
	},
	Ice: {
		name: 'Ice',
		legend:
			'Allows the user to generate cold hard ice which can freeze and chill to the blood and bone.',
		color: '#658BA4',

		magicSize: 1.2,
		magicSpeed: 0.8,
		magicDamage: 0.975,
		magicDestruction: 0.6,

		imageId: staticImagesRootFolder + '/Magics/Ice_Magic.webp'
	},
	Light: {
		name: 'Light',
		legend:
			'Allows the user to overwhelm foes with shining light moving at incredible speeds and blinding anyone struck.',
		color: '#C0BE61',

		magicSize: 1.0,
		magicSpeed: 1.8,
		magicDamage: 0.85,
		magicDestruction: 0.5,

		imageId: staticImagesRootFolder + '/Magics/Light_Magic.webp'
	},
	Lightning: {
		name: 'Lightning',
		legend: 'Allows the user to create swift bolts of destructive lightning.',
		color: '#68B1C0',

		magicSize: 1.0,
		magicSpeed: 1.5,
		magicDamage: 0.9,
		magicDestruction: 1.0,

		imageId: staticImagesRootFolder + '/Magics/Lightning_Magic.webp'
	},
	Magma: {
		name: 'Magma',
		legend:
			'Allows the user to unleash eruptions of thick, molten rock that melts all in its path.',
		color: '#BB3700',

		magicSize: 1.2,
		magicSpeed: 0.7,
		magicDamage: 0.9,
		magicDestruction: 0.9,

		imageId: staticImagesRootFolder + '/Magics/Magma_Magic.webp'
	},
	Metal: {
		name: 'Metal',
		legend:
			'Allows the user to form dense metals that demolish obstructions with their immense weight and force.',
		color: '#929192',

		magicSize: 1.2,
		magicSpeed: 0.55,
		magicDamage: 1.05,
		magicDestruction: 1.1,

		imageId: staticImagesRootFolder + '/Magics/Metal_Magic.webp'
	},
	Plasma: {
		name: 'Plasma',
		legend:
			'Allows the user to cast fervent plasma that swiftly scorches rivals with coruscating heat.',
		color: '#A43DBF',

		magicSize: 1.0,
		magicSpeed: 1.3,
		magicDamage: 0.825,
		magicDestruction: 0.9,

		imageId: staticImagesRootFolder + '/Magics/Plasma_Magic.webp'
	},
	Poison: {
		name: 'Poison',
		legend:
			'Allows the user to form noxious fumes which inflict chronic poisons and leave lethal clouds of gas.',
		color: '#683A86',

		magicSize: 1.15,
		magicSpeed: 1.0,
		magicDamage: 0.75,
		magicDestruction: 0.2,

		imageId: staticImagesRootFolder + '/Magics/Poison_Magic.webp'
	},
	Sand: {
		name: 'Sand',
		legend:
			'Allows the user to create densely-packed sand that hits with treacherous force while hindering sight.',
		color: '#98825D',

		magicSize: 1.1,
		magicSpeed: 0.95,
		magicDamage: 0.975,
		magicDestruction: 0.5,

		imageId: staticImagesRootFolder + '/Magics/Sand_Magic.webp'
	},
	Shadow: {
		name: 'Shadow',
		legend:
			'Allows the user to evoke ominous dark shadows that drain color and grace from all that they touch.',
		color: '#616062',

		magicSize: 1.1,
		magicSpeed: 1.2,
		magicDamage: 0.95,
		magicDestruction: 0.75,

		imageId: staticImagesRootFolder + '/Magics/Shadow_Magic.webp'
	},
	Snow: {
		name: 'Snow',
		legend: 'Allows the user to form wintry snow, snuffing out heat and sight under chilly layers.',
		color: '#C6C7C7',

		magicSize: 1.15,
		magicSpeed: 1.05,
		magicDamage: 0.925,
		magicDestruction: 0.4,

		imageId: staticImagesRootFolder + '/Magics/Snow_Magic.webp'
	},
	Water: {
		name: 'Water',
		legend: "Allows the user to utilize water's vast potential to rinse foes with tidal forces.",
		color: '#2680C2',

		magicSize: 1.2,
		magicSpeed: 1.0,
		magicDamage: 0.925,
		magicDestruction: 0.2,

		imageId: staticImagesRootFolder + '/Magics/Water_Magic.webp'
	},
	Wind: {
		name: 'Wind',
		legend: 'Allows the user to send turbulent gales that whirl enemies into tumultuous peril.',
		color: '#939294',

		magicSize: 1.2,
		magicSpeed: 1.4,
		magicDamage: 0.825,
		magicDestruction: 0.5,

		imageId: staticImagesRootFolder + '/Magics/Wind_Magic.webp'
	},
	Wood: {
		name: 'Wood',
		legend:
			'Allows the user to slam foes with solid wood and bark, becoming even stronger when exposed to heat.',
		color: '#86644D',

		magicSize: 1.2,
		magicSpeed: 0.8,
		magicDamage: 0.95,
		magicDestruction: 0.7,

		imageId: staticImagesRootFolder + '/Magics/Wood_Magic.webp'
	}
};
