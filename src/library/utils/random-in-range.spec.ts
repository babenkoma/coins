import { describe, expect, it } from 'vitest';
import { randomInRange } from './random-in-range';

describe('randomInRange', () => {
	it('GreaterOrEqual', async () => {
		expect(randomInRange(1, 10)).toBeGreaterThanOrEqual(1);
	});

	it('LessOrEqual', async () => {
		expect(randomInRange(1, 10)).toBeLessThanOrEqual(10);
	});
});
