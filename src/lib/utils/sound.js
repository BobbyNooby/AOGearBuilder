import correctSound from '$lib/audio/click.mp3';
import wrongSound from '$lib/audio/error.mp3';

function playCorrect() {
	new Audio(correctSound).play();
}

function playWrong() {
	new Audio(wrongSound).play();
}

export { playCorrect, playWrong };
