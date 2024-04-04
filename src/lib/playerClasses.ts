import { CurrentBuild } from './gearBuilder/CurrentBuild';
import type { magic } from './playerTypes';

export class Player {
	level: number;
	health: number;
	magic: magic;
	build: CurrentBuild;

	vitalityPoints: number;
	magicPoints: number;
	strengthPoints: number;
	weaponPoints: number;

	constructor(
		level = 1,
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

		this.build = build;

		this.vitalityPoints = vitalityPoints;
		this.magicPoints = magicPoints;
		this.strengthPoints = strengthPoints;
		this.weaponPoints = weaponPoints;

		this.magic = magic;
	}

	getStatBuild(): string {
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
			conditions: Array<
				(percentages: Record<'vitality' | 'magic' | 'strength' | 'weapons', number>) => boolean
			>;
		}[] = [
			{
				type: 'Warden',
				conditions: [({ vitality }) => vitality > 0.6]
			},
			{
				type: 'Berserker',
				conditions: [({ strength }) => strength > 0.6]
			},
			{
				type: 'Warrior',
				conditions: [({ weapons }) => weapons > 0.6]
			},
			{
				type: 'Mage',
				conditions: [({ magic }) => magic > 0.6]
			},
			{
				type: 'Juggernaut',
				conditions: [({ vitality, strength }) => vitality >= 0.4 && strength >= 0.4]
			},
			{
				type: 'Knight',
				conditions: [({ vitality, weapons }) => vitality >= 0.4 && weapons >= 0.4]
			},
			{
				type: 'Paladin',
				conditions: [({ vitality, magic }) => vitality >= 0.4 && magic >= 0.4]
			},
			{
				type: 'Warlord',
				conditions: [({ strength, weapons }) => strength >= 0.4 && weapons >= 0.4]
			},
			{
				type: 'Warlock',
				conditions: [({ strength, magic }) => strength >= 0.4 && magic >= 0.4]
			},
			{
				type: 'Conjurer',
				conditions: [({ weapons, magic }) => weapons >= 0.4 && magic >= 0.4]
			},
			{
				type: 'Savant',
				conditions: [
					({ vitality, magic, strength }) => vitality >= 0.15 && magic >= 0.15 && strength >= 0.15
				]
			}
		];

		for (const build of buildTypes) {
			if (build.conditions.every((condition) => condition(percentages))) {
				return build.type;
			}
		}

		return 'Unknown build type';
	}
}
