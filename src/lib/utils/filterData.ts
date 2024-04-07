import { validStatKeys } from '$lib/dataConstants';

export function filterData(input: any) {
	let returnObject: any = {};

	for (const key in input) {
		if (validStatKeys.includes(key)) {
			returnObject[key] = input[key];
		}
	}
	return returnObject;
}
