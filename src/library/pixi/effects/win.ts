import { Assets, Sprite, Texture } from 'pixi.js';
import { randomInRange } from '@/library/utils';
import { PixiEffect } from '../core/effect';
import { PixiGame } from '../core/game';
import { Coin, CoinState } from '../types';

export class PixiWinEffect extends PixiEffect {
	// Textures list
	textures: Texture[];

	// List of particles
	particles: Coin[];

	// Number of particles
	particlesNumber: number;

	// Max index for the texture
	textureMaxIndex: number;

	// Life time of the particle, from 0 to 1
	particleLifeTime: number;

	// Maximum values for position
	xMax: number;
	yMax: number;

	// Acceleration, set global for all particles
	g: number;

	// Scale start and end, from 0 to 1
	scaleStart: number;
	scaleEnd: number;

	// Time to change the opacity, from 0 to 1
	timeChangeOpacity: number;

	// Maximum speed of the texture change, if bigger the speed is slower
	textureChangeSpeedMax: number;

	// Maximum speed of the rotation, if bigger the speed is slower
	rotationSpeedMax: number;

	// Maximum delay before the particle starts, from 0 to 1
	delayMax: number;

	// Coefficients of limiting speeds, negative values are for the left and top side
	velocityXMin: number;
	velocityXMax: number;
	velocityYMin: number;
	velocityYMax: number;

	constructor(game: PixiGame) {
		super(game);

		this.start = 0;
		this.duration = 8000;
		this.textures = [];
		this.particles = [];
		this.particlesNumber = 200;
		this.textureMaxIndex = 8;
		this.particleLifeTime = 0.2;
		this.xMax = game.options.width / 2;
		this.yMax = game.options.height / 2;
		this.g = 1000;
		this.scaleStart = 0.15;
		this.scaleEnd = 0.3;
		this.timeChangeOpacity = 0.2;
		this.textureChangeSpeedMax = 3;
		this.rotationSpeedMax = 5;
		this.delayMax = 0.2;
		this.velocityXMin = -1;
		this.velocityXMax = 1;
		this.velocityYMin = -2.5;
		this.velocityYMax = 1;

		return this;
	}

	async init(): Promise<void> {
		const textureNames = [];
		for (let i = 0; i <= this.textureMaxIndex; i++) {
			const textureNum = ('000' + i).slice(-3);
			const textureName = 'Coin' + textureNum;
			textureNames.push(textureName);
			Assets.add({ alias: textureName, src: `/static/coins/${textureNum}.png` });
		}
		const textures = await Assets.load(textureNames);
		for (const name in textures) {
			this.textures.push(textures[name]);
		}

		this.addParticles();
	}

	animTick(nt: number): void {
		for (let i = 0; i < this.particles.length; i++) {
			// Current particle
			const particle = this.particles[i];
			if (particle) {
				if (nt >= particle.state.start) {
					// Animate the particle and get a new state
					this.animateParticle(particle.state, nt);
					// Update the sprite with the new state
					this.updateSprite(particle.state, particle.sp);
				} else {
					// Reset the particle to the default state
					this.updateSprite(particle.defaultState, particle.sp);
				}
			}
		}
	}

	// Add particles to the effect
	addParticles() {
		for (let i = 0; i < this.particlesNumber; i++) {
			if (this.textures[0]) {
				// Create a sprite
				const sp = new Sprite(this.textures[0]);

				// Create the particle with initial state
				const particle = this.createParticle(sp);

				// Set initial state for the sprite
				this.updateSprite(particle.state, sp);

				// Add the sprite to our effect
				this.container.addChild(sp);

				// Save the particle
				this.particles.push(particle);
			}
		}
	}

	// Create the particle
	createParticle(sp: Sprite): Coin {
		// Initial state for the particle
		const state = {
			//  Current texture index
			texture: {
				value: 0,
				index: 0,
				number: randomInRange(0, this.textureChangeSpeedMax),
			},
			// Delay befor the particle starts
			start: randomInRange(0, this.delayMax),
			// Pivot to center of sprite
			pivot: {
				x: sp.width / 2,
				y: sp.height / 2,
			},
			// Initial velocity
			velocity: {
				x: randomInRange(this.velocityXMin, this.velocityXMax) * this.xMax,
				y: randomInRange(this.velocityYMin, this.velocityYMax) * this.yMax,
			},
			// Position
			position: {
				x: this.xMax,
				y: this.yMax,
			},
			// Rotation of the particle
			rotation: {
				angle: Math.random() * Math.PI,
				index: 0,
				number: randomInRange(0, this.rotationSpeedMax),
			},
			// Scale of the particle
			scale: {
				x: 0,
				y: 0,
			},
			// Opacity of the particle
			alpha: 0,
		};

		// Return the particle
		return {
			sp,
			state: { ...state },
			defaultState: { ...state },
		};
	}

	// Animate the particle
	animateParticle(state: CoinState, nt: number): void {
		// Calculate the current time in the particle life
		const cnt = (nt - state.start) / this.particleLifeTime;

		// Change the texture index
		if (state.texture.index >= state.texture.number) {
			state.texture.index = 0;
			state.texture.value = state.texture.value === this.textureMaxIndex ? 0 : state.texture.value + 1;
		} else {
			state.texture.index++;
		}

		// Animate position
		state.position.x = this.xMax + cnt * state.velocity.x;
		state.position.y = this.yMax + cnt * state.velocity.y + 0.5 * this.g * Math.pow(cnt, 2);

		// Animate scale
		state.scale.x = state.scale.y = cnt < this.scaleStart ? this.scaleStart : cnt * this.scaleEnd;

		// Animate rotation
		if (state.rotation.index >= state.rotation.number) {
			state.rotation.index = 0;
			state.rotation.angle += 0.05 * Math.PI;
		} else {
			state.rotation.index++;
		}

		// Animate alpha
		state.alpha = this.timeChangeOpacity && cnt < this.timeChangeOpacity ? cnt * (1 / this.timeChangeOpacity) : 1;
	}

	// Update the sprite with the particle state
	updateSprite(state: CoinState, sp: Sprite): void {
		const texture = this.textures[state.texture.value];
		if (texture) {
			sp.texture = texture;
		}
		sp.pivot = state.pivot;
		sp.x = state.position.x;
		sp.y = state.position.y;
		sp.alpha = state.alpha;
		sp.scale = state.scale;
		sp.rotation = state.rotation.angle;
	}
}
