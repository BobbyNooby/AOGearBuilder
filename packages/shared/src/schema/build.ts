export interface BuildSlot {
	key: string;
	armorId?: string;
	level: number;
	enchantId?: string;
	modifierId?: string;
	gemIds: string[];
	attunement?: string | null;
	amuletVariant?: { type: string; tier: string } | null;
}

export interface BuildPlayer {
	level: number;
	spirit: number;
	magic: number;
	strength: number;
	weapons: number;
	awakened: boolean;
}

export interface BuildObject {
	version: string;
	player: BuildPlayer;
	selectedMagic: string[];
	selectedFS: string[];
	slots: BuildSlot[];
}

export interface SavedBuild {
	id: string;
	name: string;
	version: string;
	build: BuildObject;
	savedAt: string;
	source: 'local' | 'online';
}
