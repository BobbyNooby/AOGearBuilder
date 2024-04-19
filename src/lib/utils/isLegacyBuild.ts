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
