export function roundDown(input: number, round: number = 10) {
    return Math.floor(input / round) * round;
}