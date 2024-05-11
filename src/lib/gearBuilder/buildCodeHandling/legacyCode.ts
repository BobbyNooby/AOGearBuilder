let oldToNew: Record<string, any> = {
	Accessory: {
		'0': 'AAA',
		'1': 'AAZ',
		'3': 'T3B',
		'4': 'AAi',
		'5': '9py',
		'6': 'AAA',
		'7': 'AAs',
		'8': 'IvE',
		'9': 'kCA',
		'10': 'AAl',
		'11': 'QDj',
		'12': 'd7S',
		'13': 'AAk',
		'14': 'nbu',
		'15': 'AAN',
		'16': 'AAr',
		'17': 'q9Q',
		'18': 'AAo',
		'19': '7dO',
		'20': 'AAh',
		'21': 'lU4',
		'22': 'NgS',
		'23': 'AAj',
		'24': '3qt',
		'25': 'AAM',
		'26': 'AAJ',
		'27': 'gpg',
		'28': 'AAg',
		'29': 'aMW',
		'30': 'CX3',
		'31': 'v2U',
		'32': 'uPA',
		'33': 'M79',
		'34': 'AAY',
		'35': 'AAG',
		'36': 'AAS',
		'37': 'AAR',
		'38': 'AAf',
		'39': 'AAe',
		'40': 'L41',
		'41': 'wLR',
		'42': 'eU8',
		'43': 'xsy',
		'44': 'Pzw',
		'45': 'or9',
		'46': 'xsy',
		'47': 'Jpy',
		'48': 'VQE',
		'49': 'AAV',
		'50': '2nD',
		'51': 'zlp',
		'52': 'EOO'
	},
	Chestplate: {
		'0': 'AAB',
		'1': 'AAa',
		'2': 'AAq',
		'3': 'AAn',
		'4': 'AAL',
		'5': 'RN5',
		'6': 'AAH',
		'7': 'b4B',
		'8': 'Egb',
		'9': 'AAX',
		'10': 'AAQ',
		'11': 'AAd',
		'12': 'fuY',
		'13': 'AAO',
		'14': 'AAU',
		'15': 'mfi'
	},
	Pants: {
		'0': 'AAC',
		'1': 'AAb',
		'2': 'AAp',
		'3': 'AAm',
		'4': 'AAK',
		'5': 'Awv',
		'6': 'AAI',
		'7': 'Nks',
		'8': 'Rvx',
		'9': 'AAW',
		'10': 'AAP',
		'11': 'AAc',
		'12': 'Uoo',
		'13': 'AAT',
		'14': 'hrn',
		'15': 'qPf',
		'16': 'krV'
	},
	Gem: {
		'0': 'AAF',
		'1': 'qGg',
		'2': 'NU7',
		'3': '0ma',
		'4': '2ST',
		'5': 'fY6',
		'6': 'aZ2',
		'7': 'XUx',
		'8': 'XpP',
		'9': '91q',
		'10': 'ozh',
		'11': 'N9w',
		'12': 'CTP',
		'13': 'sKB',
		'14': '9pe',
		'15': 'GYC'
	},
	Enchant: {
		'0': 'AAD',
		'1': 'e9N',
		'2': 'yAq',
		'3': 'Mod',
		'4': 'Tf4',
		'5': '97d',
		'6': 'JEI',
		'7': 'W7S',
		'8': 'Z1a',
		'9': 'hD4',
		'10': 'fXr',
		'11': 'AVS',
		'12': 'Xjp',
		'13': 'AAt',
		'14': 'jv5',
		'15': 'RlR'
	},
	Modifier: {
		'0': 'AAE',
		'1': 'AAu',
		'2': 'wpg',
		'3': 'giu',
		'4': 'b13',
		'5': 'Pun',
		'6': 'LoL',
		'7': 'sC6',
		'8': 'faX'
	}
};

function getItem(id: string, category: string) {
	if (id in oldToNew[category]) {
		return oldToNew[category][id];
	} else {
		return oldToNew[category]['0'];
	}
}

export function isLegacyArmorBuild(inputCode: string): boolean {
	try {
		const codeArray = inputCode.split("'");

		if (codeArray.length == 5) {
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export function loadOldCode(inputString: string) {
	let newCode: string = '136|1|0|0|0|0|';

	try {
		// Decode URI in case the browser auto encodes URI

		inputString = decodeURI(inputString);

		if (inputString.length >= 59) {
			// Parse the input string

			const rows = inputString.split("'");
			const accessory1Row = rows[0].split('.');
			const accessory2Row = rows[1].split('.');
			const accessory3Row = rows[2].split('.');
			const chestplate1Row = rows[3].split('.');
			const pants1Row = rows[4].split('.');

			//Patch for new atlantean virtuous changes.
			if (accessory1Row[4] == '15' && accessory1Row[5] == '1') {
				accessory1Row[4] = '0';
				accessory1Row[5] = '0';
			}
			if (accessory2Row[4] == '15' && accessory2Row[5] == '1') {
				accessory2Row[4] = '0';
				accessory2Row[5] = '0';
			}
			if (accessory3Row[4] == '15' && accessory3Row[5] == '1') {
				accessory3Row[4] = '0';
				accessory3Row[5] = '0';
			}
			if (chestplate1Row[4] == '15' && chestplate1Row[5] == '1') {
				chestplate1Row[4] = '0';
				chestplate1Row[5] = '0';
			}
			if (pants1Row[4] == '15' && pants1Row[5] == '1') {
				pants1Row[4] = '0';
				pants1Row[5] = '0';
			}

			newCode += getItem(accessory1Row[0], 'Accessory') + '.';
			newCode += getItem(accessory1Row[4], 'Enchant') + '.';
			newCode += getItem(accessory1Row[5], 'Modifier') + '.';
			newCode += getItem(accessory1Row[1], 'Gem') + '.';
			newCode += getItem(accessory1Row[2], 'Gem') + '.';
			newCode += getItem(accessory1Row[3], 'Gem') + '.';
			newCode += '130';
			console.log(newCode);

			newCode += '|';

			newCode += getItem(accessory2Row[0], 'Accessory') + '.';
			newCode += getItem(accessory2Row[4], 'Enchant') + '.';
			newCode += getItem(accessory2Row[5], 'Modifier') + '.';
			newCode += getItem(accessory2Row[1], 'Gem') + '.';
			newCode += getItem(accessory2Row[2], 'Gem') + '.';
			newCode += getItem(accessory2Row[3], 'Gem') + '.';
			newCode += '130';

			newCode += '|';

			newCode += getItem(accessory3Row[0], 'Accessory') + '.';
			newCode += getItem(accessory3Row[4], 'Enchant') + '.';
			newCode += getItem(accessory3Row[5], 'Modifier') + '.';
			newCode += getItem(accessory3Row[1], 'Gem') + '.';
			newCode += getItem(accessory3Row[2], 'Gem') + '.';
			newCode += getItem(accessory3Row[3], 'Gem') + '.';
			newCode += '130';

			newCode += '|';

			newCode += getItem(chestplate1Row[0], 'Chestplate') + '.';
			newCode += getItem(chestplate1Row[4], 'Enchant') + '.';
			newCode += getItem(chestplate1Row[5], 'Modifier') + '.';
			newCode += getItem(chestplate1Row[1], 'Gem') + '.';
			newCode += getItem(chestplate1Row[2], 'Gem') + '.';
			newCode += getItem(chestplate1Row[3], 'Gem') + '.';
			newCode += '130';

			newCode += '|';

			newCode += getItem(pants1Row[0], 'Pants') + '.';
			newCode += getItem(pants1Row[4], 'Enchant') + '.';
			newCode += getItem(pants1Row[5], 'Modifier') + '.';
			newCode += getItem(pants1Row[1], 'Gem') + '.';
			newCode += getItem(pants1Row[2], 'Gem') + '.';
			newCode += getItem(pants1Row[3], 'Gem') + '.';
			newCode += '130';
		}
		return newCode;
	} catch (error) {
		console.log(error);
		return '';
	}
}
