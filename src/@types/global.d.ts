import { Application } from 'pixi.js';

export declare global {
	interface Window {
		__PIXI_APP__: Application;
	}
}
