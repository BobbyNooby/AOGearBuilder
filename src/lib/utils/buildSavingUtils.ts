import { writable } from 'svelte/store';

export const currentBuildCode = writable(
	'136|1|0|0|0|0|AAA.AAD.AAE|AAA.AAD.AAE|AAA.AAD.AAE|AAB.AAD.AAE|AAC.AAD.AAE'
);

export const currentShipBuildCode = writable('t1G-Ng7-------u9G');

export function storeBuildToLocalStorage(inputBuild: string, location: string = 'gearBuild') {
	localStorage.setItem(location, inputBuild);
}

export function getBuildFromLocalStorage(location: string = 'gearBuild') {
	return localStorage.getItem(location)?.toString() || '';
}
