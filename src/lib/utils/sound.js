import correctSound from '$lib/audio/click.mp3';
import wrongSound from '$lib/audio/error.mp3';
import { isMute } from './audioStore';

// Added playSound function cos i have to detect the value of isMute somehow. I want to use the $ method but it doesnt work in js for some reason.
// An old method i used made all the sounds play whenever i unmuted and this fixes it.

function playSound(sound) {
	let isMuted;

	// Subscribe to the writable store to get its current value
	const unsubscribe = isMute.subscribe((value) => {
		isMuted = value;
	});

	if (isMuted === false) {
		new Audio(sound).play();
	}

	// Unsubscribe to avoid memory leaks. Had a problem with memory leaks in older version.
	unsubscribe();
}
function playCorrect() {
	playSound(correctSound);
}

function playWrong() {
	new Audio(wrongSound).play();
}

export { playCorrect, playWrong };
