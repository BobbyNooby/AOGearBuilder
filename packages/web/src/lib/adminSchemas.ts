import type { Schema } from './components/admin/schema';

const itemTypes = [
	'armor',
	'weapon',
	'shipPart',
	'accessory',
	'gem',
	'enchant',
	'modifier',
	'magic'
];

const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Exotic', 'Mythical', 'Sunken'];

export const itemSchema: Schema = [
	{ key: 'id', label: 'ID', type: 'string', required: true, readonly: true },
	{ key: 'name', label: 'Name', type: 'string', required: true },
	{ key: 'type', label: 'Type', type: 'select', options: itemTypes, required: true },
	{ key: 'equipType', label: 'Equip Type', type: 'string' },
	{ key: 'rarity', label: 'Rarity', type: 'select', options: rarities },
	{ key: 'minLevel', label: 'Min Level', type: 'number', required: true },
	{ key: 'maxLevel', label: 'Max Level', type: 'number', nullable: true },
	{ key: 'scaling', label: 'Scaling', type: 'record:number', required: true },
	{ key: 'jewelSlots', label: 'Jewel Slots', type: 'number' },
	{ key: 'description', label: 'Description', type: 'string' },
	{ key: 'imageUrl', label: 'Image URL', type: 'string' },
	{ key: 'statType', label: 'Stat Type', type: 'string' },
	{ key: 'obtainedBy', label: 'Obtained By', type: 'array:string' },
	{ key: 'tags', label: 'Tags', type: 'array:string' },
	{ key: 'isEndgame', label: 'Endgame', type: 'boolean' },
	{ key: 'flags', label: 'Flags', type: 'json' }
];

const modifierTypes = ['enchant', 'modifier', 'faction', 'imbue', 'cosmetic'];
const tiers = ['rare', 'exotic'];

export const modifierSchema: Schema = [
	{ key: 'id', label: 'ID', type: 'string', required: true, readonly: true },
	{ key: 'name', label: 'Name', type: 'string' },
	{ key: 'type', label: 'Type', type: 'select', options: modifierTypes, required: true },
	{ key: 'layer', label: 'Layer', type: 'string' },
	{ key: 'tier', label: 'Tier', type: 'select', options: tiers },
	{ key: 'applicableTo', label: 'Applicable To', type: 'array:string', required: true },
	{ key: 'exclusiveWith', label: 'Exclusive With', type: 'array:string' },
	{ key: 'stackableWith', label: 'Stackable With', type: 'array:string' },
	{ key: 'allowedOn', label: 'Allowed On', type: 'array:string' },
	{ key: 'imageUrl', label: 'Image URL', type: 'string' },
	{ key: 'param', label: 'Param', type: 'json' }
];

const statDefSchema: Schema = [
	{ key: 'category', label: 'Category', type: 'select', options: ['primary', 'secondary', 'tertiary', 'weapon', 'ship'], required: true },
	{ key: 'epPerPoint', label: 'EP per Point', type: 'number', required: true },
	{ key: 'scaling', label: 'Scaling', type: 'select', options: ['level', 'flat'], required: true }
];

const buildTypeConditionSchema: Schema = [
	{ key: 'stat', label: 'Stat', type: 'string' },
	{ key: 'minPercent', label: 'Min Percent', type: 'number' },
	{ key: 'type', label: 'Type', type: 'select', options: ['any', 'stat'] },
	{ key: 'countAtLeast', label: 'Count At Least', type: 'number' }
];

const buildTypeSchema: Schema = [
	{ key: 'id', label: 'ID', type: 'string', required: true },
	{ key: 'color', label: 'Color', type: 'string', required: true },
	{ key: 'magicSlots', label: 'Magic Slots', type: 'number', required: true },
	{ key: 'fsSlots', label: 'Fighting Style Slots', type: 'number', required: true },
	{ key: 'weaponSlots', label: 'Weapon Slots', type: 'number', required: true },
	{ key: 'conditions', label: 'Conditions', type: 'array:object', itemSchema: buildTypeConditionSchema }
];

const playerTransformSchema: Schema = [
	{ key: 'type', label: 'Type', type: 'string' },
	{ key: 'appliesTo', label: 'Applies To', type: 'string' },
	{ key: 'formulaRef', label: 'Formula Ref', type: 'string' },
	{ key: 'stats', label: 'Stats', type: 'array:string' },
	{ key: 'value', label: 'Value', type: 'number' },
	{ key: 'perTier', label: 'Per Tier', type: 'boolean' },
	{ key: 'status', label: 'Status', type: 'string' }
];

const arcaniumAttunementsSchema: Schema = [
	{ key: 'baseLevel', label: 'Base Level', type: 'number', required: true },
	{ key: 'itemMultiplier', label: 'Item Multiplier', type: 'record:number', required: true },
	{ key: 'epValue', label: 'EP Value', type: 'json', required: true },
	{ key: 'magics', label: 'Magics', type: 'record:object', valueSchema: [{ key: 'power', type: 'number' }, { key: 'defense', type: 'number' }, { key: 'size', type: 'number' }, { key: 'haste', type: 'number' }, { key: 'dexterity', type: 'number' }, { key: 'range', type: 'number' }, { key: 'regeneration', type: 'number' }, { key: 'pierce', type: 'number' }, { key: 'resistance', type: 'number' }], required: true }
];

const amuletVariantsSchema: Schema = [
	{ key: 'types', label: 'Types', type: 'array:string', required: true },
	{ key: 'tiers', label: 'Tiers', type: 'record:object', valueSchema: [{ key: 'levelRange', type: 'array:string' }, { key: 'scaling', type: 'json' }], required: true }
];

const rarityDefSchema: Schema = [
	{ key: 'order', label: 'Order', type: 'number', required: true },
	{ key: 'color', label: 'Color', type: 'string', required: true }
];
const statTypeDefSchema: Schema = [
	{ key: 'color', label: 'Color', type: 'string', required: true }
];
const equipTypeDefSchema: Schema = [
	{ key: 'label', label: 'Label', type: 'string', required: true }
];

export const gameConfigSchema: Schema = [
	{ key: 'maxLevel', label: 'Max Level', type: 'number', required: true },
	{ key: 'pointsPerLevel', label: 'Points Per Level', type: 'number', required: true },
	{ key: 'statPointMaxFormula', label: 'Stat Point Max Formula', type: 'string', required: true },
	{ key: 'scalings', label: 'Scalings', type: 'json', required: true },
	{ key: 'statRegistry', label: 'Stat Registry', type: 'record:object', valueSchema: statDefSchema, required: true },
	{ key: 'buildTypes', label: 'Build Types', type: 'array:object', itemSchema: buildTypeSchema, required: true },
	{ key: 'playerTransforms', label: 'Player Transforms', type: 'record:object', valueSchema: playerTransformSchema },
	{ key: 'playerConstraints', label: 'Player Constraints', type: 'json' },
	{ key: 'arcaniumAttunements', label: 'Arcanium Attunements', type: 'record:object', valueSchema: arcaniumAttunementsSchema },
	{ key: 'amuletVariants', label: 'Amulet Variants', type: 'record:object', valueSchema: amuletVariantsSchema },
	{ key: 'rarities', label: 'Rarities', type: 'record:object', valueSchema: rarityDefSchema },
	{ key: 'statTypes', label: 'Stat Types', type: 'record:object', valueSchema: statTypeDefSchema },
	{ key: 'equipTypes', label: 'Equip Types', type: 'record:object', valueSchema: equipTypeDefSchema }
];

export const formulaItemSchema: Schema = [
	{ key: 'expression', label: 'Expression', type: 'string' },
	{ key: 'params', label: 'Params', type: 'json' },
	{ key: 'description', label: 'Description', type: 'textarea' },
	{ key: 'status', label: 'Status', type: 'string' }
];

export const defaultItem = {
	id: '',
	name: '',
	type: 'armor',
	rarity: 'Common',
	minLevel: 1,
	scaling: {},
	imageUrl: '',
	isEndgame: false
};

export const defaultModifier = {
	id: '',
	name: '',
	type: 'modifier',
	applicableTo: ['armor', 'accessory'],
	effects: [],
	imageUrl: ''
};

export const defaultGameConfig = {
	maxLevel: 1,
	pointsPerLevel: 1,
	statPointMaxFormula: '',
	scalings: {},
	statRegistry: {},
	buildTypes: []
};

export const defaultFormula = {
	expression: '',
	params: {},
	description: '',
	status: ''
};
