export function joinObjects(...objects: {}[]): {} {
	let finalObject: any = {};

	for (const object of objects) {
		for (const [key, value] of Object.entries(object)) {
			if (key in finalObject) {
				finalObject[key] += value;
			} else {
				finalObject[key] = value;
			}
		}
	}

	return finalObject;
}
