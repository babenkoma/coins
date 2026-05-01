// Generate random number in a range
export function randomInRange(min: number, max: number): number {
	return Math.random() * (max - min + 1) + min;
}
