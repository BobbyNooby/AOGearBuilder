import correctSound from './click.mp3';
import errorSound from './error.mp3';

export function playCorrect() {
  new Audio(correctSound).play()
}

export function playWrong() {
  new Audio(errorSound).play()
}
