import type { anyItem } from './itemTypes';

export function getModifiers(items: anyItem[]): Record<string, boolean> {
	let modifiers: Record<string, boolean> = {};

	let allModifiers = items.filter(
		(item: anyItem) => item.mainType == 'Modifier' && item.name != 'None'
	);
	allModifiers = allModifiers.sort((a: anyItem, b: anyItem) => {
		// Forces Atlantean Essence to be first
		let atlanteanId = 'AAu';
		if (a.id == atlanteanId) {
			return -1;
		}
		if (b.id == atlanteanId) {
			return 1;
		}
		return a.name.localeCompare(b.name);
	});

	for (let mod of allModifiers) {
		modifiers[mod.name] = false;
	}

	return modifiers;
}
