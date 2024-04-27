/**
 * Converts a hex color code to its RGB values.
 *
 * @param {string} hex - The hex color code.
 * @returns {Object|null} An object with the RGB values, or null if the input is invalid.
 */
export function hexToRGB(hex) {
	// Remove the hash symbol, if present.
	hex = hex.replace('#', '');

	if (hex.length !== 6) {
		// If the length of the hex code is not 6, it is invalid.
		return { r: 0, g: 0, b: 0 };
	}

	// Convert each pair of characters to decimal.
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return {
		r,
		g,
		b
	};
}

/**
 * Converts RGB values to a hex color code.
 *
 * @param {number} r - The red value.
 * @param {number} g - The green value.
 * @param {number} b - The blue value.
 * @returns {string} The hex color code.
 */
export function RGBtoHex(r: number, g: number, b: number) {
	const componentToHex = (c) => {
		const hex = c.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	const hexR = componentToHex(r);
	const hexG = componentToHex(g);
	const hexB = componentToHex(b);
	return `#${hexR}${hexG}${hexB}`;
}
