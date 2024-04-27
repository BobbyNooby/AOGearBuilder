import { staticImagesRootFolder } from '$lib/dataConstants';
import type { fightingStyle } from '$lib/gearBuilder/playerTypes';
import type { fightingStyleDetails } from './playerAbilitiyTypes';

const fightingStyleDamageText = 'DAMAGE';
const minFightingStyleDamageValue = 0;
const maxFightingStyleDamageValue = 1.05;

const fightingStyleSpeedText = 'SPEED';
const minFightingStyleSpeedValue = 0;
const maxFightingStyleSpeedValue = 1.3;

const fightingStyleSizeText = 'SIZE';
const minFightingStyleSizeValue = 0;
const maxFightingStyleSizeValue = 1.3;

export const fightingStyleRecords: Record<fightingStyle, fightingStyleDetails> = {
	'Basic Combat': {
		type: 'Fighting Style',
		name: 'Basic Combat',
		legend: 'Basic Combat Innit',
		color: '#AAABAB',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#AAABAB'
		},
		stats: {
			fightingStyleDamage: {
				text: fightingStyleDamageText,
				value: 0.9,
				minValue: minFightingStyleDamageValue,
				maxValue: maxFightingStyleDamageValue
			},
			fightingStyleSpeed: {
				text: fightingStyleSpeedText,
				value: 1,
				minValue: minFightingStyleSpeedValue,
				maxValue: maxFightingStyleSpeedValue
			},
			fightingStyleSize: {
				text: fightingStyleSizeText,
				value: 1,
				minValue: minFightingStyleSizeValue,
				maxValue: maxFightingStyleSizeValue
			}
		},
		passive: [],
		extraStats: {
			fightingStyleDamage: ['1.05x (Imbued)'],
			fightingStyleSpeed: [],
			fightingStyleSize: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Fighting Styles/Basic_Combat.webp'
	},
	Boxing: {
		type: 'Fighting Style',
		name: 'Boxing',
		legend:
			'A fighting style utilizing gloved fists, with a focus on speed and sending opponents flying.',
		color: '#BC2329',
		textColors: {
			genericFillColor: '#BC2329',
			genericStrokeColor: '#000000'
		},
		stats: {
			fightingStyleDamage: {
				text: fightingStyleDamageText,
				value: 0.8,
				minValue: minFightingStyleDamageValue,
				maxValue: maxFightingStyleDamageValue
			},
			fightingStyleSpeed: {
				text: fightingStyleSpeedText,
				value: 1.2,
				minValue: minFightingStyleSpeedValue,
				maxValue: maxFightingStyleSpeedValue
			},
			fightingStyleSize: {
				text: fightingStyleSizeText,
				value: 0.95,
				minValue: minFightingStyleSizeValue,
				maxValue: maxFightingStyleSizeValue
			}
		},
		passive: ['+10% Blocking Power', 'Increased Knockback'],
		extraStats: {
			fightingStyleDamage: ['0.9x (Warlord Imbue)'],
			fightingStyleSpeed: [],
			fightingStyleSize: [],
			misc: []
		},
		imageId: staticImagesRootFolder + '/Fighting Styles/Boxing.webp'
	},
	'Cannon Fist': {
		type: 'Fighting Style',
		name: 'Cannon Fist',
		legend: 'A fighting style that involves throwing cannonballs with tremendous strength.',
		color: '#333333',
		textColors: {
			genericFillColor: '#333333',
			genericStrokeColor: '#000000'
		},
		stats: {
			fightingStyleDamage: {
				text: fightingStyleDamageText,
				value: 0.7,
				minValue: minFightingStyleDamageValue,
				maxValue: maxFightingStyleDamageValue
			},
			fightingStyleSpeed: {
				text: fightingStyleSpeedText,
				value: 1,
				minValue: minFightingStyleSpeedValue,
				maxValue: maxFightingStyleSpeedValue
			},
			fightingStyleSize: {
				text: fightingStyleSizeText,
				value: 1,
				minValue: minFightingStyleSizeValue,
				maxValue: maxFightingStyleSizeValue
			}
		},
		passive: ['4x DMG to Ships', 'Inflicts Bleeding'],
		extraStats: {
			fightingStyleDamage: ['0.85x (Imbued)'],
			fightingStyleSpeed: [],
			fightingStyleSize: [],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Fighting Styles/Cannon_Fist.webp'
	},
	'Iron Leg': {
		type: 'Fighting Style',
		name: 'Iron Leg',
		legend:
			'A Fighting Style that involves training the legs to endure tremendous force, allowing the user to kick with great power.',
		color: '#3A3A3A',
		textColors: {
			genericFillColor: '#C4C4C4',
			genericStrokeColor: '#3A3A3A'
		},
		stats: {
			fightingStyleDamage: {
				text: fightingStyleDamageText,
				value: 0.925,
				minValue: minFightingStyleDamageValue,
				maxValue: maxFightingStyleDamageValue
			},
			fightingStyleSpeed: {
				text: fightingStyleSpeedText,
				value: 0.75,
				minValue: minFightingStyleSpeedValue,
				maxValue: maxFightingStyleSpeedValue
			},
			fightingStyleSize: {
				text: fightingStyleSizeText,
				value: 1.1,
				minValue: minFightingStyleSizeValue,
				maxValue: maxFightingStyleSizeValue
			}
		},
		passive: ['Inflicts Bleeding'],
		extraStats: {
			fightingStyleDamage: [
				'+0.23125(Bleeding) = 1.15625x (Unimbued)',
				'1.075x (Imbued)',
				'+0.403125(Bleeding) = 1.478125x (Imbued)'
			],
			fightingStyleSpeed: [],
			fightingStyleSize: [],
			misc: []
		},
		imageId: staticImagesRootFolder + '/Fighting Styles/Iron_Leg.webp'
	},
	'Sailor Fist': {
		type: 'Fighting Style',
		name: 'Sailor Fist',
		legend:
			'A fighting style that focuses on drinking seawater to absorb its magic pollution, placing the user in an intoxicated, dazed state, while energy and power surges through them.',
		color: '#6A9FCC',
		textColors: {
			genericFillColor: '#FFFFFF',
			genericStrokeColor: '#6A9FCC'
		},
		stats: {
			fightingStyleDamage: {
				text: fightingStyleDamageText,
				value: 0.775,
				minValue: minFightingStyleDamageValue,
				maxValue: maxFightingStyleDamageValue
			},
			fightingStyleSpeed: {
				text: fightingStyleSpeedText,
				value: 1,
				minValue: minFightingStyleSpeedValue,
				maxValue: maxFightingStyleSpeedValue
			},
			fightingStyleSize: {
				text: fightingStyleSizeText,
				value: 0.8,
				minValue: minFightingStyleSizeValue,
				maxValue: maxFightingStyleSizeValue
			}
		},
		passive: ['Inflicts Soaked at high seawater energy (>80%).'],
		extraStats: {
			fightingStyleDamage: [
				'0.9x (80%+ Seawater Energy) (Unimbued)',
				'0.8x (Base) (Imbued)',
				'1x (80%+ Seawater Energy) (Imbued)'
			],
			fightingStyleSpeed: [],
			fightingStyleSize: ['1.2x (80%+ Seawater Energy)'],
			misc: []
		},

		imageId: staticImagesRootFolder + '/Fighting Styles/Sailor_Fist.webp'
	},
	'Thermo Fist': {
		type: 'Fighting Style',
		name: 'Thermo Fist',
		legend:
			'A fighting style that focuses on building up adrenaline and heat to deliver fast, burning-hot strikes.',
		color: '#FD5700',
		textColors: {
			genericFillColor: '#EBB39F',
			genericStrokeColor: '#FD5700'
		},
		stats: {
			fightingStyleDamage: {
				text: fightingStyleDamageText,
				value: 0.775,
				minValue: minFightingStyleDamageValue,
				maxValue: maxFightingStyleDamageValue
			},
			fightingStyleSpeed: {
				text: fightingStyleSpeedText,
				value: 1,
				minValue: minFightingStyleSpeedValue,
				maxValue: maxFightingStyleSpeedValue
			},
			fightingStyleSize: {
				text: fightingStyleSizeText,
				value: 0.85,
				minValue: minFightingStyleSizeValue,
				maxValue: maxFightingStyleSizeValue
			}
		},
		passive: ['Inflicts Seared at high heat (>50%).'],
		extraStats: {
			fightingStyleDamage: ['+0.155x (Searing) (>50% Heat) = 0.93x', '0.875x (Warlord Imbue)'],
			fightingStyleSpeed: ['1.3x (100% Heat)'],
			fightingStyleSize: [],
			misc: []
		},
		imageId: staticImagesRootFolder + '/Fighting Styles/Thermo_Fist.webp'
	}
};
