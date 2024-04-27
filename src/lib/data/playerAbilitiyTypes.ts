import { staticImagesRootFolder } from '$lib/dataConstants';
import type { magic } from '$lib/gearBuilder/playerTypes';

//Unused for future update
export type magicDetails = playerMagicFSIdentifiers & {
	type: 'Magic';
	textColors: {
		genericFillColor: string;
		genericStrokeColor: string;
	};
	stats: {
		magicSize: { text: string; value: number; minValue: number; maxValue: number };
		magicSpeed: { text: string; value: number; minValue: number; maxValue: number };
		magicDamage: { text: string; value: number; minValue: number; maxValue: number };
		magicDestruction: { text: string; value: number; minValue: number; maxValue: number };
	};
	statusEffect: {
		name: string;
		effectFillColor: string;
		effectStrokeColor: string;

		// Use Generic Colors
		description: string;

		applyMethod: string;
		applyMethodFillColor: string;
		applyMethodStrokeColor: string;
	};
	extraStats: {
		// For imbued/melt/stacked damage/etc those situations
		magicSize: string[];
		magicSpeed: string[];
		magicDamage: string[];
		magicDestruction: string[];
		misc: string[];
	};
};

export type fightingStyleDetails = playerMagicFSIdentifiers & {
	type: 'Fighting Style';
	textColors: {
		genericFillColor: string;
		genericStrokeColor: string;
	};
	stats: {
		fightingStyleDamage: { text: string; value: number; minValue: number; maxValue: number };
		fightingStyleSpeed: { text: string; value: number; minValue: number; maxValue: number };
		fightingStyleSize: { text: string; value: number; minValue: number; maxValue: number };
	};
	passive: string[];
	extraStats: {
		// For imbued/melt/stacked damage/etc those situations
		fightingStyleDamage: string[];
		fightingStyleSpeed: string[];
		fightingStyleSize: string[];
		misc: string[];
	};
};

export type anyPlayerAbility = Partial<magic> | Partial<fightingStyleDetails>;

export type playerMagicFSIdentifiers = {
	name: string;
	legend: string;
	color: string;
	type: 'Magic' | 'Fighting Style';
	imageId: string;
};
