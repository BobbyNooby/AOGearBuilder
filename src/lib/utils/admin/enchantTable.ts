
type visiBoolOptions = {
	bool: boolean;
	text: string;
	imageId: string;
};

function filterData(inputData: any, visiBools: any) {
	let returndata: any = { level: inputData.level };

	const keys = [
		'power',
		'defense',
		'agility',
		'attackSpeed',
		'attackSize',
		'intensity',
		'regeneration',
		'piercing',
		'resistance',

		'powerIncrement',
		'defenseIncrement',
		'agilityIncrement',
		'attackSpeedIncrement',
		'attackSizeIncrement',
		'intensityIncrement',
		'regenerationIncrement',
		'piercingIncrement',
		'resistanceIncrement',

		'insanity',
		'warding',
		'drawback',

		'durability',
		'magicStorage',
		'ramDefense',
		'ramStrength',
		'resilience',
		'speed',
		'stability',
		'turning'
	];

	for (const key of keys) {
		if (visiBools[key].bool === true && inputData[key] != 0) {
			returndata[key] = inputData[key];
		}
	}
	return returndata;
}

export type statSlot = { visible: boolean; value: number };

export class EnchantColumn {
	parentTable: EnchantTable;

	component:string;
	
	power: number | null = null;
	defense: number | null = null;
	agility: number | null = null;
	attackSpeed: number | null = null;
	attackSize: number | null = null;
	intensity: number | null = null;
	regeneration: number | null = null;
	piercing: number | null = null;
	resistance: number | null = null;

	powerIncrement: number | null = null;
	defenseIncrement: number | null = null;
	agilityIncrement: number | null = null;
	attackSpeedIncrement: number | null = null;
	attackSizeIncrement: number | null = null;
	intensityIncrement: number | null = null;
	regenerationIncrement: number | null = null;
	piercingIncrement: number | null = null;
	resistanceIncrement: number | null = null;

	insanity: number | null = null;
	warding: number | null = null;
	drawback: number | null = null;

	durability: number | null = null;
	magicStorage: number | null = null;
	ramDefense: number | null = null;
	ramStrength: number | null = null;
	resilience: number | null = null;
	speed: number | null = null;
	stability: number | null = null;
	turning: number | null = null;
	constructor(component: string, parentTable: EnchantTable) {
		this.parentTable = parentTable;

		this.component = component;
	}

	getData() {
		let data: any = { component: this.component };
		for (const key in this) {
			if (!['parentTable', 'component'].includes(key)) {
				if (
					// Filter out nonexistent data
					this.hasOwnProperty(key) &&
					this.parentTable.visiBools[key].bool === true &&
					this[key] !== null
				) {
					data[key] = this[key];
				}
			}
		}
		return data;
	}
}


export class EnchantTable {
	selected: { [key: string]: { bool: boolean;text: string; } };
	columns: EnchantColumn[];
	visiBools: { [key: string]: visiBoolOptions };
	visiBoolsComponents: { [key: string]: { bool: boolean;text: string; } }

	constructor() {
		this.columns = [];
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

			powerIncrement: {
				bool: false,
				text: 'Power Increment',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/power.png`
			},
			defenseIncrement: {
				bool: false,
				text: 'Defense Increment',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/defense.png`
			},
			agilityIncrement: {
				bool: false,
				text: 'Agility Increment',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/agility.png`
			},
			attackSpeedIncrement: {
				bool: false,
				text: 'Attack Speed Increment',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/attackSpeed.png`
			},
			attackSizeIncrement: {
				bool: false,
				text: 'Attack Size Increment',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/attackSize.png`
			},
			intensityIncrement: {
				bool: false,
				text: 'Intensity Increment',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/intensity.png`
			},
			regenerationIncrement: {
				bool: false,
				text: 'Regeneration Increment',
				imageId: `https://github.com/BobbyNooby/AOGearBuilder/blob/typescript/static/assets/images/stats/regeneration.png?raw=true`
			},
			piercingIncrement: {
				bool: false,
				text: 'Piercing Increment',
				imageId: `https://github.com/BobbyNooby/AOGearBuilder/blob/typescript/static/assets/images/stats/piercing.png?raw=true`
			},
			resistanceIncrement: {
				bool: false,
				text: 'Resistance Increment',
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
			},

			durability: {
				bool: false,
				text: 'Durability',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/durability.png`
			},

			magicStorage: {
				bool: false,
				text: 'Magic Storage',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/magicStorage.png`
			},
			ramDefense: {
				bool: false,
				text: 'Ram Defense',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/ramDefense.png`
			},
			ramStrength: {
				bool: false,
				text: 'Ram Strength',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/ramStrength.png`
			},
			resilience: {
				bool: false,
				text: 'Resilience',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/resilience.png`
			},
			speed: {
				bool: false,
				text: 'Speed',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/speed.png`
			},
			stability: {
				bool: false,
				text: 'Stability',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/stability.png`
			},
			turning: {
				bool: false,
				text: 'Turning',
				imageId: `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/stats/turning.png`
			}
		};
		this.visiBoolsComponents = {
			ram: {
				bool: false,
				text: 'Ram'
			},
			hull: {
				bool: false,
				text: 'Hull'
			},
			sail: {
				bool: false,
				text: 'Sail'
			}
		};
		this.selected = {
			gear: {
				bool: true,
				text: 'Gear'
			},
			ship: {
				bool: false,
				text: 'Ship'
			}
		};

		for (const [key, value] of Object.entries(this.visiBoolsComponents)) {
			if ("bool" in value && value.bool == true) {
				this.columns.push(new EnchantColumn(key, this));
			}
		}
		this.updateColumns();
	}

	getSelectOptions() {
		return Object.keys(this.selected);
	}

	getComponentOptions() {
		return Object.keys(this.visiBoolsComponents);
	}

	getColumns() {
		return this.columns;
	}

	//Resie method
	updateColumns() {

		const newColumns = [];

		for (const [key, value] of Object.entries(this.visiBoolsComponents)) {
			if ("bool" in value && value.bool == true) {
				let column: any = this.columns.find((column) => column.component === key);
				if (column) {
					newColumns.push(column);
				} else {
					newColumns.push(new EnchantColumn(key, this));
				}
			}
		}

		this.columns = newColumns;
	}

	getData() {
		let data = this.columns.map((column) => column.getData());
		console.log(data);

		data = data.filter(function (column) {
			return !(Object.keys(column).length <= 1 && 'component' in column);
		});

		return data;
	}
}
