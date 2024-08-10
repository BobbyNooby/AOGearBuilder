type visiBoolOptions = {
	bool: boolean;
	text: string;
	imageId: string;
};

export type statSlot = { visible: boolean; value: number };

export class ScalingColumn {
	parentTable: ScalingTable;

	power: number | null = null;
	defense: number | null = null;
	agility: number | null = null;
	attackSpeed: number | null = null;
	attackSize: number | null = null;
	intensity: number | null = null;
	regeneration: number | null = null;
	piercing: number | null = null;
	resistance: number | null = null;

	insanity: number | null = null;
	warding: number | null = null;
	drawback: number | null = null;

	constructor(parentTable: ScalingTable) {
		this.parentTable = parentTable;
	}

	getData() {
		let data: any = {};
		for (const key in this) {
			if (!['parentTable', 'level'].includes(key)) {
				if (
					// Filter out nonexistent data
					this.hasOwnProperty(key) &&
					this[key] !== null
				) {
					data[key] = this[key];
				}
			}
		}
		return data;
	}
}

export class ScalingTable {
	column: ScalingColumn;
	visiBools: { [key: string]: visiBoolOptions };
	constructor() {
		this.visiBools = {
			power: {
				bool: false,
				text: 'Power',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/power.png`
			},
			defense: {
				bool: false,
				text: 'Defense',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/defense.png`
			},
			agility: {
				bool: false,
				text: 'Agility',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/agility.png`
			},
			attackSpeed: {
				bool: false,
				text: 'Attack Speed',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/attackSpeed.png`
			},
			attackSize: {
				bool: false,
				text: 'Attack Size',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/attackSize.png`
			},
			intensity: {
				bool: false,
				text: 'Intensity',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/intensity.png`
			},
			regeneration: {
				bool: false,
				text: 'Regeneration',
				imageId: `https://github.com/BobbyNooby/AOGearBuilder/blob/typescript/static/assets/images/stats/regeneration.png?raw=true`
			},
			piercing: {
				bool: false,
				text: 'Piercing',
				imageId: `https://github.com/BobbyNooby/AOGearBuilder/blob/typescript/static/assets/images/stats/piercing.png?raw=true`
			},
			resistance: {
				bool: false,
				text: 'Resistance',
				imageId: `https://github.com/BobbyNooby/AOGearBuilder/blob/typescript/static/assets/images/stats/resistance.png?raw=true`
			},
			insanity: {
				bool: false,
				text: 'Insanity',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/insanity.png`
			},
			warding: {
				bool: false,
				text: 'Warding',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/warding.png`
			},
			drawback: {
				bool: false,
				text: 'Drawback',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/drawback.png`
			}
		};

		this.column = new ScalingColumn(this);
	}

	getColumns() {
		return this.column;
	}

	getData() {
		return this.column.getData();
	}
}
