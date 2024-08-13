import type { anyItem } from './itemTypes';

export function calculateScaling(data: any) {
	data.Database = data.Database.map((item: anyItem) => calculateItemScaling(item, data.config));

	return data;
}

export function calculateItemScaling(item: anyItem, config: any): anyItem {
	if (
		'scaling' in item &&
		'toStat' in config.scaling &&
		['Accessory', 'Chestplate', 'Pants'].includes(item.mainType || '')
	) {
		let stats = Object.keys(item.scaling);
		let imbuedStatType = findImbue(item, config);
		if (
			imbuedStatType != '' &&
			'imbuedStatType' in config.scaling &&
			imbuedStatType in config.scaling.imbuedStatType
		) {
			stats = [
				...new Set([...stats, ...Object.keys(config.scaling.imbuedStatType[imbuedStatType])])
			];
		}
		for (let stat of stats) {
			for (let i = item.minLevel; i <= item.maxLevel; i += 10) {
				let levelStat = item.statsPerLevel.findIndex((stats: any) => stats.level === i);
				if (levelStat == -1) {
					item.statsPerLevel.push({
						level: i,
						[stat]: calculateStatScaling(item, stat, i, config, imbuedStatType)
					});
				} else if (!(stat in item.statsPerLevel[levelStat])) {
					item.statsPerLevel[levelStat][stat] = calculateStatScaling(
						item,
						stat,
						i,
						config,
						imbuedStatType
					);
				}
			}
		}
		item.statsPerLevel.sort(function (a: any, b: any) {
			return a.level - b.level;
		});
	}

	return item;
}

export function calculateStatScaling(
	item: anyItem,
	stat: string,
	level: number,
	config: any,
	imbuedStatType: string
): number {
	let value = 0;
	if (
		!(
			'scaling' in item &&
			'toStat' in config.scaling &&
			['Accessory', 'Chestplate', 'Pants'].includes(item.mainType || '')
		)
	) {
		return value;
	}

	if (['insanity', 'warding', 'drawback'].includes(stat)) {
		return value + item.scaling[stat];
	}

	if (stat in item.scaling) {
		value += Math.floor(
			item.scaling[stat] *
				config.scaling['toStat'][stat in config.scaling['toStat'] ? stat : 'substat'] *
				level
		);
	}

	if (
		imbuedStatType != '' &&
		'imbuedMulti' in config.scaling &&
		'imbuedStatType' in config.scaling &&
		stat in config.scaling.imbuedStatType[imbuedStatType]
	) {
		value += Math.floor(
			config.scaling.imbuedStatType[imbuedStatType][stat] *
				config.scaling['toStat'][stat in config.scaling['toStat'] ? stat : 'substat'] *
				config.scaling.imbuedMulti[stat in config.scaling['toStat'] ? stat : 'substat'] *
				level *
				((item.mainType == 'Accessory' || item.mainType == 'Pants') &&
				!(item.name?.split(' ').includes('Arcsphere') || item.name?.split(' ').includes('Bracelet'))
					? 0.75
					: 1)
		);
	}

	return value;
}

export function findImbue(item: anyItem, config: any): string {
	let imbuedStatType = '';
	if (
		(item.statType == 'Magic' || item.statType == 'Strength') &&
		'imbuedMulti' in config.scaling &&
		'imbuedStatType' in config.scaling
	) {
		for (let imbue of Object.keys(config.scaling.imbuedStatType)) {
			if (item.name?.toLowerCase().startsWith(imbue)) {
				imbuedStatType = imbue;
				break;
			}
		}
	}
	return imbuedStatType;
}
