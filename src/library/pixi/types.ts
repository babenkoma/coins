import { Sprite } from 'pixi.js';

export interface GameOptions {
	width: number;
	height: number;
	element: HTMLElement;
}

export interface CoinState {
	texture: {
		value: number;
		index: number;
		number: number;
	};
	start: number;
	pivot: {
		x: number;
		y: number;
	};
	velocity: {
		x: number;
		y: number;
	};
	position: {
		x: number;
		y: number;
	};
	rotation: {
		angle: number;
		index: number;
		number: number;
	};
	scale: {
		x: number;
		y: number;
	};
	alpha: number;
}

export interface Coin {
	sp: Sprite;
	state: CoinState;
	defaultState: CoinState;
}
