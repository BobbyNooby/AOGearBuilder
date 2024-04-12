import { writable } from 'svelte/store';

export const currentBuildCode = writable(
	'136|1|0|0|0|0|AAA.AAD.AAE|AAA.AAD.AAE|AAA.AAD.AAE|AAB.AAD.AAE|AAC.AAD.AAE'
);

export function storeBuildToLocalStorage(inputBuild: string) {
	localStorage.setItem('gearBuild', inputBuild);
}

export function getBuildFromLocalStorage() {
	return localStorage.getItem('gearBuild')?.toString();
}

