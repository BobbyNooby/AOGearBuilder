import { validStatKeys, type validStatKeysType } from '$lib/dataConstants';

export function filterData(input: any, ...doNotIncludeList: string[]) {
	let returnObject: any = {};

	for (const key in input) {
		if (validStatKeys.includes(key) && !doNotIncludeList.includes(key)) {
			returnObject[key] = input[key];
		}
	}
	return returnObject;
}
