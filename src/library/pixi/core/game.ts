import { Application } from 'pixi.js';
import { GameOptions } from '../types';
import { PixiEffect } from './effect';

export class PixiGame {
	// Game options
	options: GameOptions;

	// Pixi application
	app: Application;

	// Is game running
	isRunning: boolean;

	// Total duration of all effects
	totalDuration: number;

	// Array of effects
	effects: PixiEffect[];

	// Start time
	t0: number;

	constructor(options: GameOptions) {
		this.options = options;
		this.app = new Application();

		this.isRunning = false;
		this.totalDuration = 0;
		this.effects = [];
		this.t0 = Date.now();

		if (process.env.NODE_ENV !== 'production') {
			window.__PIXI_APP__ = this.app;
		}

		return this;
	}

	async init(effects: PixiEffect[]): Promise<void> {
		await this.app.init({
			autoStart: false,
			width: this.options.width,
			height: this.options.height,
		});
		this.options.element.innerHTML = '';
		this.options.element.appendChild(this.app.canvas);
		for (const effect of effects) {
			await effect.init();
			this.addEffect(effect);
		}
	}

	start(): void {
		this.isRunning = true;
		this.t0 = Date.now();
		this.app.ticker.add(() => {
			this.tick();
		});
		this.app.ticker.start();
	}

	finish(): void {
		this.app.ticker.stop();
		this.isRunning = false;
	}

	addEffect(eff: PixiEffect): void {
		this.totalDuration = Math.max(this.totalDuration, eff.duration + eff.start || 0);
		this.effects.push(eff);
		this.app.stage.addChild(eff.container);
	}

	tick(): void {
		const gt = Date.now();
		const lt = (gt - this.t0) % this.totalDuration;
		for (const eff of this.effects) {
			if (lt > eff.start + eff.duration || lt < eff.start) continue;
			const elt = lt - eff.start;
			const ent = elt / eff.duration;
			eff.animTick(ent, elt, gt);
		}
	}
}
