export function roundToDecimals(number: number, decimals: number): number {
	const multiplier = Math.pow(10, decimals);
	return Math.round(number * multiplier) / multiplier;
}
