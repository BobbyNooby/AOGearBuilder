export function roundDecimal(inputNumber: number, decimalPlaces: number) {
	const multiplier = Math.pow(10, decimalPlaces);
	const rounded = (inputNumber * multiplier + Number.EPSILON) | 0;
	return rounded / multiplier;
}
