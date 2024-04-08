import { writable } from 'svelte/store';

export let testNumber = 1;
export const testStore = writable(testNumber);

export function incrementNumber() {
	testNumber += 2;
	console.log(testNumber);
}
