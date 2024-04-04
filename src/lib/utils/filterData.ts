import { validKeys } from '$lib/dataConstants';

export function filterData(input: any) {
	let returnObject: any = {};

	for (const key in input) {
		if (validKeys.includes(key)) {
			returnObject[key] = input[key];
		}
	}
	return returnObject;
}
