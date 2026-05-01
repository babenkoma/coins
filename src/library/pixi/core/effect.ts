import { Container } from 'pixi.js';
import { PixiGame } from './game';

export class PixiEffect {
	container: Container;

	// Reference to the game
	game: PixiGame;

	// Start time of effect
	start: number;

	// Duration of effect
	duration: number;

	constructor(game: PixiGame) {
		this.container = new Container();
		this.game = game;
		this.start = 0;
		this.duration = 1000;

		return this;
	}

	async init(): Promise<void> {}

	animTick(ent: number, elt: number, gt: number): void {}
}
