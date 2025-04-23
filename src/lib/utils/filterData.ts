import type { AllStats } from '$lib/types/itemTypes';
import { validStatKeys, type validStatKeysType } from '$lib/types/utilTypes';

export function filterData(
	input: AllStats | Record<string, string>,
	...doNotIncludeList: validStatKeysType[]
): AllStats {
	let returnObject: AllStats = {};

	for (const key in input) {
		if (
			validStatKeys.includes(key as validStatKeysType) &&
			!doNotIncludeList.includes(key as validStatKeysType)
		) {
			returnObject[key as keyof AllStats] = parseFloat(input[key as keyof AllStats]);
		}
	}

	return returnObject;
}
