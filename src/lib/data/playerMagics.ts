import type { magicDetails } from './playerAbilitiyTypes';
import type { magic } from '$lib/gearBuilder/playerTypes';
import { staticImagesRootFolder } from '$lib/dataConstants';

const magicSizeText = 'SIZE';
const minMagicSizeValue = 0;
const maxMagicSizeValue = 1.3;

const magicSpeedText = 'SPEED';
const minMagicSpeedValue = 0;
const maxMagicSpeedValue = 1.8;

const magicDamageText = 'DAMAGE';
const minMagicDamageValue = 0;
const maxMagicDamageValue = 1.05;

const magicDestructionText = 'DESTRUCTION';
const minMagicDestructionValue = 0;
const maxMagicDestructionValue = 1.2;

const magicApplyMethods = {
	anyDamage: 'Applies when attacks with this magic deal any amount of damage',
	five: "Applies when attacks with this magic deal 5% or more of the target's health",
	thirtyThree: "Applies when attacks with this magic deal 33% or more of the target's health"
};
const magicApplyMethodColors = {
	fill: '#6F7074',
	stroke: '#000000'
};

export const magicRecords: Record<magic, magicDetails> = {
	Acid: {
		type: 'Magic',
		name: 'Acid',
		legend:
			'Allows the user to form a caustic, reactive liquid that corrodes through enemies and leaves behind deadly puddles of bubbling acid.',
		color: '#2DB800',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#2DB800'
		},

		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.05,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.875,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.25,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'CORRODING',
			effectFillColor: '#FFFFFF',
			effectStrokeColor: '#2DB800',

			description: 'Deals medium damage over time for 10 seconds.',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['0.925x (Imbued)', '+ 0.4375x (Corroding) = 1.3125x'],
			magicSpeed: [],
			magicDamage: [],
			magicDestruction: [],
			misc: ["Applies when attacks with this magic deal 5% or more of the target's health."]
		},

		imageId: staticImagesRootFolder + '/Magics/Acid_Magic.webp'
	},
	Ash: {
		type: 'Magic',
		name: 'Ash',
		legend:
			'Allows the user to shroud the air with smoldering cinders, preserving the most ill-fated as ashen statues.',
		color: '#6C200A',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#6C200A'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.25,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.9,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.85,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.3,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'PETRIFIED',
			effectFillColor: '#2A2F3A',
			effectStrokeColor: '#6C200A',

			description: 'Traps the target in a hard shell of ash',

			applyMethod: magicApplyMethods.thirtyThree,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.15x (Imbued)'],
			magicSpeed: ['0.95x (Imbued)'],
			magicDamage: ['0.925x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Ash_Magic.webp'
	},
	Crystal: {
		type: 'Magic',
		name: 'Crystal',
		legend:
			'Allows the user to materialize luminous crystals which embed themselves in adversaries and brilliantly shatter after high accumulation.',
		color: '#B83731',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#B83731'
		},

		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.15,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.75,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.975,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.725,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'CRYSTALLIZED',
			effectFillColor: '#FFFFFF',
			effectStrokeColor: '#B83731',

			description: 'After being applied 3 times, the next hit will deal 30% more damage',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.05x (Imbued)'],
			magicSpeed: ['0.875x (Imbued)'],
			magicDamage: ['1.2675x (3rd stack Crystallized)', '1.05x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Crystal_Magic.webp'
	},
	Earth: {
		type: 'Magic',
		name: 'Earth',
		legend:
			'Allows the user to generate solid rock to crush enemies under giant boulders and earthen pillars.',
		color: '#705441',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#705441'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.3,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.6,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 1.0,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.75,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'BLEEDING',
			effectFillColor: '#26080E',
			effectStrokeColor: '#000000',

			description: 'Deals medium damage over time for 5 seconds',

			applyMethod: magicApplyMethods.thirtyThree,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.2x (Imbued)'],
			magicSpeed: ['0.8x (Imbued)'],
			magicDamage: ['+ 0.25x(Bleed)(Hit 33% Target HP) = 1.25x'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Earth_Magic.webp'
	},
	Explosion: {
		type: 'Magic',
		name: 'Explosion',
		legend:
			'Allows the user to wreak havoc with massive explosions, leaving any remains singed from combustion.',
		color: '#B48644',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#B48644'
		},

		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.3,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.8,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.925,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 1.2,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'SINGED',
			effectFillColor: '#2A2F3A',
			effectStrokeColor: '#6C200A',

			description: 'Acts as a catalyst to buff the damage of other magics',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.2x (Imbued)'],
			magicSpeed: ['0.9x (Imbued)'],
			magicDamage: [],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Explosion_Magic.webp'
	},
	Fire: {
		type: 'Magic',
		name: 'Fire',
		legend: 'Allows the user to cast fearsome flames, engulfing enemies in a roaring blaze.',
		color: '#BD6300',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#BD6300'
		},

		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.1,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.0,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.85,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.8,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'BURNING',
			effectFillColor: '#BD6300',
			effectStrokeColor: '#BD6300',

			description: 'Deals high damage over time for 5 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.0x (Imbued)'],
			magicSpeed: [],
			magicDamage: ['0.85x(Base) + 0.2975x(Burn) = 1.1475x', '0.925x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Fire_Magic.webp'
	},
	Glass: {
		type: 'Magic',
		name: 'Glass',
		legend:
			'Allows the user to generate elegant ornaments of glass that can shatter into knife-like shards to keep danger at bay.',
		color: '#969DA9',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#969DA9'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.1,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.0,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.9,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.3,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'BLEEDING',
			effectFillColor: '#26080E',
			effectStrokeColor: '#000000',

			description: 'Deals medium damage over time for 5 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.0x (Imbued)'],
			magicSpeed: [],
			magicDamage: ['+0.225x(Bleed) = 1.125x', '0.975x(Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Glass_Magic.webp'
	},
	Ice: {
		type: 'Magic',
		name: 'Ice',
		legend:
			'Allows the user to generate cold hard ice which can freeze and chill to the blood and bone.',
		color: '#658BA4',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#658BA4'
		},

		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.2,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.8,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.975,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.6,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'FREEZING',
			effectFillColor: '#FFFFFF',
			effectStrokeColor: '#658BA4',

			description: 'Acts as a catalyst to buff the damage of other magics',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.1x (Imbued)'],
			magicSpeed: ['0.9x (Imbued)'],
			magicDamage: ['1.05x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Ice_Magic.webp'
	},
	Light: {
		type: 'Magic',
		name: 'Light',
		legend:
			'Allows the user to overwhelm foes with shining light moving at incredible speeds and blinding anyone struck.',
		color: '#C0BE61',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#C0BE61'
		},

		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.0,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.8,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.85,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.5,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'BLINDED',
			effectFillColor: '#FFFFFF',
			effectStrokeColor: '#C0BE61',

			description: 'Impedes vision for 1.5 seconds and can be stacked',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['0.9x (Imbued)'],
			magicSpeed: ['1.4x (Imbued)', '1.32x (Warlock Imbue)'],
			magicDamage: ['0.8925x (Max Stack Blinded)', '0.875x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Light_Magic.webp'
	},
	Lightning: {
		type: 'Magic',
		name: 'Lightning',
		legend: 'Allows the user to create swift bolts of destructive lightning.',
		color: '#68B1C0',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#68B1C0'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.0,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.5,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.9,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 1.0,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'PARALYZED',
			effectFillColor: '#FFFFFF',
			effectStrokeColor: '#68B1C0',

			description: 'Prevents the target from moving temporarily',

			applyMethod: magicApplyMethods.thirtyThree,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['0.9x (Imbued)'],
			magicSpeed: ['1.25x (Imbued)', '1.2x (Warlock Imbue)'],
			magicDamage: ['0.95x (Imbued)'],
			magicDestruction: [],
			misc: []
		},
		imageId: staticImagesRootFolder + '/Magics/Lightning_Magic.webp'
	},
	Magma: {
		type: 'Magic',
		name: 'Magma',
		legend:
			'Allows the user to unleash eruptions of thick, molten rock that melts all in its path.',
		color: '#BB3700',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#BB3700'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.2,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.7,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.9,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.9,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'MELTING',
			effectFillColor: '#DF5D00',
			effectStrokeColor: '#BB3700',

			description: 'Deals medium damage over time for 10 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.1x (Imbued)'],
			magicSpeed: ['0.85x (Imbued)'],
			magicDamage: ['+0.45x(Melt) = 1.35x', '1.0x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Magma_Magic.webp'
	},
	Metal: {
		type: 'Magic',
		name: 'Metal',
		legend:
			'Allows the user to form dense metals that demolish obstructions with their immense weight and force.',
		color: '#929192',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#929192'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.2,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.55,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 1.05,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 1.1,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'BLEEDING',
			effectFillColor: '#26080E',
			effectStrokeColor: '#000000',

			description: 'Deals medium damage over time for 5 seconds',

			applyMethod: magicApplyMethods.five,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.1x (Imbued)'],
			magicSpeed: ['0.775x (Imbued)'],
			magicDamage: ['+0.2625x(Bleed)(Hit 5% Target HP) = 1.3125x', '1.125x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Metal_Magic.webp'
	},
	Plasma: {
		type: 'Magic',
		name: 'Plasma',
		legend:
			'Allows the user to cast fervent plasma that swiftly scorches rivals with coruscating heat.',
		color: '#A43DBF',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#A43DBF'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.0,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.3,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.825,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.9,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'SCORCHED',
			effectFillColor: '#B97FE3',
			effectStrokeColor: '#A43DBF',

			description: 'Deals high damage over time for 3 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['0.9x (Imbued)'],
			magicSpeed: ['1.15x (Imbued)', '1.12x (Warlock Imbue)'],
			magicDamage: ['+0.2475x(Scorch) = 1.0725x', '0.875x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Plasma_Magic.webp'
	},
	Poison: {
		type: 'Magic',
		name: 'Poison',
		legend:
			'Allows the user to form noxious fumes which inflict chronic poisons and leave lethal clouds of gas.',
		color: '#683A86',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#683A86'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.15,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.0,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.75,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.2,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'POISONED',
			effectFillColor: '#683A86',
			effectStrokeColor: '#000000',

			description: 'Deals medium damage over time for 20 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.05x (Imbued)'],
			magicSpeed: [],
			magicDamage: ['+0.75(Poison) = 1.5x', '0.85x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Poison_Magic.webp'
	},
	Sand: {
		type: 'Magic',
		name: 'Sand',
		legend:
			'Allows the user to create densely-packed sand that hits with treacherous force while hindering sight.',
		color: '#98825D',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#98825D'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.1,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 0.95,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.975,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.5,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'SANDY',
			effectFillColor: '#FFFFFF',
			effectStrokeColor: '#98825D',

			description: 'Impedes vision for 5 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.0x (Imbued)'],
			magicSpeed: ['0.975x (Imbued)'],
			magicDamage: ['1.05x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Sand_Magic.webp'
	},
	Shadow: {
		type: 'Magic',
		name: 'Shadow',
		legend:
			'Allows the user to evoke ominous dark shadows that drain color and grace from all that they touch.',
		color: '#616062',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#616062'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.1,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.2,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.95,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.75,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'DRAINED',
			effectFillColor: '#616062',
			effectStrokeColor: '#000000',

			description: 'Slightly impedes vision and causes color blindness for 5 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.0x (Imbued)'],
			magicSpeed: ['1.1x (Imbued)', '1.08x (Warlock Imbue)'],
			magicDamage: ['1.025x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Shadow_Magic.webp'
	},
	Snow: {
		type: 'Magic',
		name: 'Snow',
		legend: 'Allows the user to form wintry snow, snuffing out heat and sight under chilly layers.',
		color: '#C6C7C7',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#C6C7C7'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.15,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.05,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.925,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.4,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'SNOWY',
			effectFillColor: '#FFFFFF',
			effectStrokeColor: '#C6C7C7',

			description: 'Impedes vision for 6 seconds',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.05x (Imbued)'],
			magicSpeed: ['1.025x (Imbued)', '1.02x (Warlock Imbue)'],
			magicDamage: ['1x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Snow_Magic.webp'
	},
	Water: {
		type: 'Magic',
		name: 'Water',
		legend: "Allows the user to utilize water's vast potential to rinse foes with tidal forces.",
		color: '#2680C2',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#2680C2'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.2,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.0,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.925,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.2,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'SOKAED',
			effectFillColor: '#2680C2',
			effectStrokeColor: '#0e6fb4',

			description: 'Acts as a catalyst to buff the damage of cold attacks',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.1x (Imbued)'],
			magicSpeed: [],
			magicDamage: ['1x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Water_Magic.webp'
	},
	Wind: {
		type: 'Magic',
		name: 'Wind',
		legend: 'Allows the user to send turbulent gales that whirl enemies into tumultuous peril.',
		color: '#939294',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#939294'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.2,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.4,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.825,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.5,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'NONE',
			effectFillColor: '#939294',
			effectStrokeColor: '#939294',

			description: 'No effect',

			applyMethod: magicApplyMethods.anyDamage,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.1x (Imbued)'],
			magicSpeed: ['1.2x (Imbued)', '1.16x (Warlock Imbue)'],
			magicDamage: ['0.875x (Imbued)'],
			magicDestruction: [],
			misc: ['Knocks back targets that are hit']
		},

		imageId: staticImagesRootFolder + '/Magics/Wind_Magic.webp'
	},
	Wood: {
		type: 'Magic',
		name: 'Wood',
		legend:
			'Allows the user to slam foes with solid wood and bark, becoming even stronger when exposed to heat.',
		color: '#86644D',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#86644D'
		},
		stats: {
			magicSize: {
				text: magicSizeText,
				value: 1.2,
				minValue: minMagicSizeValue,
				maxValue: maxMagicSizeValue
			},
			magicSpeed: {
				text: magicSpeedText,
				value: 1.0,
				minValue: minMagicSpeedValue,
				maxValue: maxMagicSpeedValue
			},
			magicDamage: {
				text: magicDamageText,
				value: 0.95,
				minValue: minMagicDamageValue,
				maxValue: maxMagicDamageValue
			},
			magicDestruction: {
				text: magicDestructionText,
				value: 0.7,
				minValue: minMagicDestructionValue,
				maxValue: maxMagicDestructionValue
			}
		},
		statusEffect: {
			name: 'BLEEDING',
			effectFillColor: '#26080E',
			effectStrokeColor: '#000000',

			description: 'Deals medium damage over time for 5 seconds',

			applyMethod: magicApplyMethods.five,
			applyMethodFillColor: magicApplyMethodColors.fill,
			applyMethodStrokeColor: magicApplyMethodColors.stroke
		},
		extraStats: {
			magicSize: ['1.1x (Imbued)'],
			magicSpeed: ['0.9x (Imbued)'],
			magicDamage: ['+ 0.2375x(Bleed)(Hit 5% Target HP) = 1.1875x', '1.025x (Imbued)'],
			magicDestruction: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Magics/Wood_Magic.webp'
	}
};
