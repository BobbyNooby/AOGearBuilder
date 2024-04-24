export type magic =
	| 'None'
	| 'Acid'
	| 'Ash'
	| 'Crystal'
	| 'Earth'
	| 'Explosion'
	| 'Fire'
	| 'Glass'
	| 'Ice'
	| 'Light'
	| 'Lightning'
	| 'Magma'
	| 'Metal'
	| 'Plasma'
	| 'Poison'
	| 'Sand'
	| 'Shadow'
	| 'Snow'
	| 'Water'
	| 'Wind'
	| 'Wood';

export type fightingStyles =
	| 'None'
	| 'Basic Combat'
	| 'Boxing'
	| 'Iron Leg'
	| 'Cannon Fist'
	| 'Sailor Fist'
	| 'Thermo Fist';

export type statBuildStats = { name: string; magicNo: number; fightingStyleNo: number };
