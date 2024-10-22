export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeEachWord(string: string) {
	var splitStr = string.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = capitalizeFirstLetter(splitStr[i]);
	}
	return splitStr.join(' ');
}

export function camelCaseToWords(s: string) {
	return s.replace(/([A-Z])/g, ' $1').toLowerCase();
}
