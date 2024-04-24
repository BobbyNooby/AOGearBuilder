import type { statBuildStats } from '$lib/gearBuilder/playerTypes';

export const statBuilds: Record<string, statBuildStats> = {
	None: {
		name: 'None',
		magicNo: 1,
		fightingStyleNo: 0
	},
	Warden: {
		name: 'Warden',
		magicNo: 0,
		fightingStyleNo: 0
	},
	Berserker: {
		name: 'Berserker',
		magicNo: 0,
		fightingStyleNo: 2
	},
	Warrior: {
		name: 'Warrior',
		magicNo: 0,
		fightingStyleNo: 0
	},
	Mage: {
		name: 'Mage',
		magicNo: 2,
		fightingStyleNo: 0
	},
	Juggernaut: {
		name: 'Juggernaut',
		magicNo: 0,
		fightingStyleNo: 2
	},
	Knight: {
		name: 'Knight',
		magicNo: 0,
		fightingStyleNo: 0
	},
	Paladin: {
		name: 'Paladin',
		magicNo: 2,
		fightingStyleNo: 0
	},
	Warlord: {
		name: 'Warlord',
		magicNo: 0,
		fightingStyleNo: 1
	},
	Warlock: {
		name: 'Warlock',
		magicNo: 1,
		fightingStyleNo: 1
	},
	Conjurer: {
		name: 'Conjurer',
		magicNo: 1,
		fightingStyleNo: 0
	},
	Savant: {
		name: 'Savant',
		magicNo: 2,
		fightingStyleNo: 2
	}
};
