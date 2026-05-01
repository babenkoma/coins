import { ReactElement, useEffect, useRef } from 'react';
import { PixiGame, PixiWinEffect } from '@/library/pixi';
import './style.css';

export function Game(): ReactElement {
	const gameRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async () => {
			if (gameRef.current) {
				const game = new PixiGame({
					width: 800,
					height: 450,
					element: gameRef.current,
				});
				await game.init([new PixiWinEffect(game)]);
				game.start();
			}
		})().catch(console.error);
	}, [gameRef]);

	return (
		<section className={'game'}>
			<h1 className={'game__title'}>Win Effect</h1>
			<div ref={gameRef} className={'game__container'} />
		</section>
	);
}
