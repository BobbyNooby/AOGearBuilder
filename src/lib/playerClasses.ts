import { get } from 'svelte/store';
import { CurrentBuild } from './gearBuilder/CurrentBuild';
import type { magic } from './playerTypes';
import { getItemById } from './utils/getItemById';
import { listOfMagics } from './dataConstants';

export class Player {
	level: number;
	health: number;
	magic: magic;
	build: CurrentBuild;

	minLevel: number;
	maxLevel: number;

	vitalityPoints: number;
	magicPoints: number;
	strengthPoints: number;
	weaponPoints: number;

	constructor(
		level = 136,
		health = 93,
		build = new CurrentBuild(this),
		vitalityPoints = 0,
		magicPoints = 0,
		strengthPoints = 0,
		weaponPoints = 0,
		magic: magic = 'Ash'
	) {
		this.level = level;
		this.health = health + this.level * 7;

		this.minLevel = 1;
		this.maxLevel = 136;

		this.build = build;

		this.vitalityPoints = vitalityPoints;
		this.magicPoints = magicPoints;
		this.strengthPoints = strengthPoints;
		this.weaponPoints = weaponPoints;

		this.magic = magic;
	}

	getStatBuild(): { type: string; color: string } {
		const totalStats: number =
			this.vitalityPoints + this.magicPoints + this.strengthPoints + this.weaponPoints;
		const percentages: Record<'vitality' | 'magic' | 'strength' | 'weapons', number> = {
			vitality: this.vitalityPoints / totalStats,
			magic: this.magicPoints / totalStats,
			strength: this.strengthPoints / totalStats,
			weapons: this.weaponPoints / totalStats
		};

		const buildTypes: {
			type: string;
			color: string;
			conditions: Array<
				(percentages: Record<'vitality' | 'magic' | 'strength' | 'weapons', number>) => boolean
			>;
		}[] = [
			{
				type: 'Warden',
				color: '#00FC00',
				conditions: [({ vitality }) => vitality > 0.6]
			},
			{
				type: 'Berserker',
				color: '#FF6060',
				conditions: [({ strength }) => strength > 0.6]
			},
			{
				type: 'Warrior',
				color: '#F7F75E',
				conditions: [({ weapons }) => weapons > 0.6]
			},
			{
				type: 'Mage',
				color: '#02B1EB',
				conditions: [({ magic }) => magic > 0.6]
			},
			{
				type: 'Juggernaut',
				color: '#A87643',
				conditions: [({ vitality, strength }) => vitality >= 0.4 && strength >= 0.4]
			},
			{
				type: 'Knight',
				color: '#92D353',
				conditions: [({ vitality, weapons }) => vitality >= 0.4 && weapons >= 0.4]
			},
			{
				type: 'Paladin',
				color: '#20D8AC',
				conditions: [({ vitality, magic }) => vitality >= 0.4 && magic >= 0.4]
			},
			{
				type: 'Warlord',
				color: '#EBA15A',
				conditions: [({ strength, weapons }) => strength >= 0.4 && weapons >= 0.4]
			},
			{
				type: 'Warlock',
				color: '#FF90AF',
				conditions: [({ strength, magic }) => strength >= 0.4 && magic >= 0.4]
			},
			{
				type: 'Conjurer',
				color: '#7DDCAD',
				conditions: [({ weapons, magic }) => weapons >= 0.4 && magic >= 0.4]
			},
			{
				type: 'Savant',
				color: '#F9DBF8',
				conditions: [
					({ vitality, magic, strength }) => vitality >= 0.15 && magic >= 0.15 && strength >= 0.15
				]
			}
		];

		for (const build of buildTypes) {
			if (build.conditions.every((condition) => condition(percentages))) {
				return { type: build.type, color: build.color };
			}
		}

		return { type: 'None', color: '#FFFFFF' };
	}

	getBuildCode() {
		let finalString = `${this.level.toString()}|${listOfMagics.indexOf(this.magic)}|${this.vitalityPoints}|${this.magicPoints}|${this.strengthPoints}|${this.weaponPoints}|${this.build.getBuildCode()}`;
		return finalString;
	}

	loadBuildCode(database: [], codeString: string) {
		console.log(codeString);
		const slotCodeArray = codeString.split('|').map((slotString) => slotString.split('.'));
		const slotkeyArray = ['accessory1', 'accessory2', 'accessory3', 'chestplate', 'pants'];

		this.level = parseInt(slotCodeArray[0][0]);
		this.magic = listOfMagics[parseInt(slotCodeArray[1][0])];
		this.vitalityPoints = parseInt(slotCodeArray[2][0]);
		this.magicPoints = parseInt(slotCodeArray[3][0]);
		this.strengthPoints = parseInt(slotCodeArray[4][0]);
		this.weaponPoints = parseInt(slotCodeArray[5][0]);

		for (let i = 0; i < slotkeyArray.length; i++) {
			const slotkey = slotkeyArray[i] as keyof typeof this.build.slots;
			const slot = slotCodeArray[i + 6];

			for (let j = 0; j < slot.length; j++) {
				if (j <= 2) {
					this.build.setGear(getItemById(database, slot[j]), slotkey);
				} else {
					this.build.setGear(getItemById(database, slot[j]), slotkey, j - 3);
				}
			}
		}
	}
}
