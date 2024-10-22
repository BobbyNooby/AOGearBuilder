let oldToNew: Record<string, any> = {
	Cannon: {
		'0': 'b49',
		'1': '8Pu',
		'2': 'zTZ',
		'3': 'QaE',
		'4': '5Th',
		'5': 'TKr',
		'6': 'Xt7',
		'7': 'jgm',
		'8': 'gnG',
		'9': 'vmj',
		'10': '62S',
		'11': 'M8Q',
		'12': '21y',
		'13': '4El'
	},
	Deckhand: {
		'0': 'u9G',
		'1': 'IjV',
		'2': 'zPX',
		'3': 'I4z',
		'4': 'JHF',
		'5': 'ItZ',
		'6': 'aFt',
		'7': 'RZw',
		'8': 'uSS'
	},
	'Hull Enchant': {
		'0': 'AAD',
		'1': 'Mod',
		'2': 'Tf4',
		'3': 'W7S',
		'4': 'Xjp',
		'5': 'AAt',
		'6': 'jv5',
		'7': 'KhY'
	},
	'Hull Armor': {
		'0': 'Ng7',
		'1': 'K4h',
		'2': 'Ehk',
		'3': 'iNa',
		'4': 'isv',
		'5': 'uJL',
		'6': 'B8a',
		'7': '8bX',
		'8': 'WqY',
		'9': 'EDy',
		'10': 'vHX',
		'11': 'Ds0',
		'12': 'FAG',
		'13': 'a38'
	},
	Quartermaster: {
		'0': 'pmb',
		'1': 'UJV',
		'2': 'mx1'
	},
	'Ram Enchant': {
		'0': 'AAD',
		'1': 'Mod',
		'2': 'W7S',
		'3': 'Xjp',
		'4': 'AAt',
		'5': 'KhY'
	},
	Ram: {
		'0': 'm2t',
		'1': 'ipc',
		'2': 'ZfS',
		'3': 'zoh',
		'4': '0mW',
		'5': 'qEc',
		'6': 'EME',
		'7': 'lcV',
		'8': 'R75',
		'9': 'Xci',
		'10': 'eS4',
		'11': 'N0n',
		'12': 'BEg',
		'13': 'jqu',
		'14': '98J',
		'15': 'Du4',
		'16': 'eyK',
		'17': 'nSv',
		'18': '4fu',
		'19': 'W9L',
		'20': 'Nb5',
		'21': '2Wa',
		'22': 'lPJ'
	},
	'Sail Material Enchant': {
		'0': 'AAD',
		'1': 'Mod',
		'2': 'Tf4',
		'3': 'W7S',
		'4': 'tPg',
		'5': 'kmI',
		'6': 'jv5',
		'7': 'KhY'
	},
	'Sail Material': {
		'0': 'nIB',
		'1': 'e3d',
		'2': 'yUJ',
		'3': 'SW6',
		'4': 'ADt',
		'5': 'fsx'
	},
	'Ship Crew': {
		'0': 'DC4',
		'1': 'Fwo',
		'2': 'bCd',
		'3': 'Oag'
	},
	Boat: {
		'0': 't1G',
		'1': '155',
		'2': 'j9o',
		'3': 'yb7',
		'4': 'JuN'
	},
	'Siege Weapon': {
		'0': 'i5y',
		'1': 'rBU',
		'2': '8GU',
		'3': 'sRl',
		'4': 'M2t',
		'5': 'I5M'
	}
};

function getItem(id: string, category: string) {
	if (id in oldToNew[category]) {
		return oldToNew[category][id];
	} else {
		return oldToNew[category]['0'];
	}
}

export function isLegacyShipBuild(inputCode: string): boolean {
	try {
		const codeArray = inputCode.split('*');

		if (codeArray.length == 8) {
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export function loadOldShipCode(inputString: string) {
	let newCode: string = '';

	try {
		// Decode URI in case the browser auto encodes URI

		inputString = decodeURI(inputString);

		if (inputString.length >= 31) {
			// Parse the input string

			const rows = inputString.split('*');

			const shipRow = rows[0];
			const hullRow = rows[1].split(',');
			const quartermasterRow = rows[2].split(',');
			const weaponsRow = rows[3].split(',');
			const sailsRow = rows[4].split(',');
			const ramsRow = rows[5].split(',');
			const crewRow = rows[6];
			const deckhandsRow = rows[7].split(',');

			newCode += getItem(shipRow[0], 'Boat');

			newCode += '-';

			newCode += getItem(hullRow[0], 'Hull Armor') + "'";
			newCode += getItem(hullRow[1], 'Hull Enchant');

			newCode += '-';

			newCode += getItem(quartermasterRow[0], 'Quartermaster') + ',';
			newCode += getItem(quartermasterRow[1], 'Quartermaster');

			newCode += '-';

			newCode += getItem(weaponsRow[0], 'Cannon');

			newCode += '-';

			newCode += getItem(weaponsRow[1], 'Siege Weapon');

			newCode += '-';

			newCode += getItem(sailsRow[0], 'Sail Material') + "'";
			newCode += getItem(sailsRow[1], 'Sail Material Enchant');

			newCode += '-';

			newCode += getItem(crewRow, 'Ship Crew');

			newCode += '-';

			newCode += getItem(ramsRow[0], 'Ram') + "'";
			newCode += getItem(ramsRow[1], 'Ram Enchant');

			newCode += '-';

			newCode += getItem(deckhandsRow[0], 'Deckhand') + ',';
			newCode += getItem(deckhandsRow[1], 'Deckhand') + ',';
			newCode += getItem(deckhandsRow[2], 'Deckhand') + ',';
			newCode += getItem(deckhandsRow[3], 'Deckhand') + ',';
		}
		return newCode;
	} catch (error) {
		console.log(error);
		return '';
	}
}
