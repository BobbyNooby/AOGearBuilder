export const staticImagesRootFolder: string =
	'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilderImages/main';

export const rarityColors: Record<string, string> = {
	None: '#FFFFFF', Common: '#7D7D7F', Uncommon: '#817346',
	Rare: '#6765EC', Exotic: '#FF0000', Seasonal: '#C001C2',
	Legendary: '#00FF00', Mystic: '#a0f',
	Mythical: '#FFD700', Sunken: '#00CED1'
};

export const statTypeBorderColors: Record<string, string> = {
	Magic: '#02B1EB',
	Arcanium: '#02B1EB',
	Strength: '#FF6060',
	Vitality: '#00FF00'
};

export const RARITY_ORDER = [
	'None', 'Common', 'Uncommon', 'Rare', 'Epic',
	'Legendary', 'Exotic', 'Mystic', 'Seasonal', 'Mythical', 'Sunken'
];

// merged — old AOGearBuilder statsStyles + wiki new stat names
export const statsStyles: Record<string, { name: string; fillColor: string; strokeColor: string; suffix: string }> = {
	power:       { name: 'POWER',       fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
	defense:     { name: 'DEFENSE',     fillColor: '#737373', strokeColor: '#000000', suffix: '' },
	// new names (wiki) → same colors as old equivalents
	size:        { name: 'ATTACK SIZE', fillColor: '#00FF00', strokeColor: '#471559', suffix: '' },
	haste:       { name: 'HASTE',       fillColor: '#FFFFFF', strokeColor: '#0077ff', suffix: '' },
	dexterity:   { name: 'DEXTERITY',   fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
	range:       { name: 'RANGE',       fillColor: '#FFF200', strokeColor: '#712402', suffix: '' },
	pierce:      { name: 'PIERCING',    fillColor: '#FFD6AB', strokeColor: '#E22A1D', suffix: '' },
	regeneration:{ name: 'REGENERATION',fillColor: '#C0FFC0', strokeColor: '#35D234', suffix: '' },
	resistance:  { name: 'RESISTANCE',  fillColor: '#89ABC6', strokeColor: '#000000', suffix: '' },
	insanity:    { name: 'INSANITY',    fillColor: '#8B27DB', strokeColor: '#DB0C45', suffix: '' },
	drawback:    { name: 'DRAWBACK',    fillColor: '#DC4040', strokeColor: '#000000', suffix: '' },
	warding:     { name: 'WARDING',     fillColor: '#FFFFFF', strokeColor: '#CBCB55', suffix: '' },
	// old names — kept for compatibility with old AOGearBuilder data
	powerIncrement:       { name: 'POWER',       fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
	defenseIncrement:     { name: 'DEFENSE',     fillColor: '#737373', strokeColor: '#000000', suffix: '' },
	sizeIncrement:        { name: 'ATTACK SIZE', fillColor: '#00FF00', strokeColor: '#471559', suffix: '' },
	hasteIncrement:       { name: 'HASTE',       fillColor: '#FFFFFF', strokeColor: '#0077ff', suffix: '' },
	dexterityIncrement:   { name: 'DEXTERITY',   fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
	rangeIncrement:       { name: 'RANGE',       fillColor: '#FFF200', strokeColor: '#712402', suffix: '' },
	pierceIncrement:      { name: 'PIERCING',    fillColor: '#FFD6AB', strokeColor: '#E22A1D', suffix: '' },
	regenerationIncrement:{ name: 'REGENERATION',fillColor: '#C0FFC0', strokeColor: '#35D234', suffix: '' },
	resistanceIncrement:  { name: 'RESISTANCE',  fillColor: '#89ABC6', strokeColor: '#000000', suffix: '' },
	// ship stats
	stability:    { name: 'STABILITY',  fillColor: '#6297C1', strokeColor: '#124975', suffix: '%' },
	durability:   { name: 'DURABILITY', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
	speed:        { name: 'SPEED',      fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
	turningSpeed: { name: 'TURNING',    fillColor: '#FFFFFF', strokeColor: '#584A8C', suffix: '' },
	sailResilience: { name: 'RESILIENCE', fillColor: '#FFFFFF', strokeColor: '#AF2230', suffix: '%' },
	ramStrength:  { name: 'RAM STRENGTH', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
	ramDefense:   { name: 'RAM DEFENSE', fillColor: '#FFFFFF', strokeColor: '#6B6BD7', suffix: '' },
};

// Hard-coded equipType → display label map (fixes spelling, spacing, and double-text issues)
export const equipTypeLabel: Record<string, string> = {
	// Armor
	chestpiece: 'Chestplate',
	legging:    'Leggings',
	// Accessories
	helmet:   'Helmet',
	hat:      'Hat',
	arm:      'Arm Accessory',
	neck:     'Neck Accessory',
	face:     'Face Accessory',
	collar:   'Collar Accessory',
	'collar accessory': 'Collar Accessory',
	shoulder: 'Shoulder Accessory',
	waist:    'Waist Accessory',
	back:     'Back Accessory',
	front:    'Front Accessory',
	head:     'Head Accessory',
	boots:    'Boots',
	leggings: 'Leggings',
	// Weapons
	bladed:            'Sword',
	'dual bladed':     'Dual Swords',
	'dual light bladed': 'Dual Rapiers',
	'dual heavy bladed': 'Dual Greatswords',
	'light bladed':    'Rapier',
	'heavy bladed':    'Greatsword',
	'long bladed':     'Spear',
	thrusting:         'Lance',
	bludgeon:          'Mace',
	blunt:             'Club',
	'heavy blunt':     'Warhammer',
	'light blunt':     'Light Blunt',
	claws:             'Claws',
	bow:               'Bow',
	'heavy bow':       'Greatbow',
	axe:               'Axe',
	pistol:            'Pistol',
	'multi pistols':   'Dual Pistols',
	rifle:             'Rifle',
	polearm:           'Polearm',
	staff:             'Staff',
	shield:            'Shield',
	greatshield:       'Greatshield',
	spirit:            'Spirit Weapon',
	'colossal bladed':  'Colossal Sword',
	'colossal blunt':   'Colossal Club',
	'colossal claws':   'Colossal Claws',
	'colossal cleaver': 'Colossal Cleaver',
	'colossal thrusting': 'Colossal Lance',
	'heavy cleaver':    'Cleaver',
};
