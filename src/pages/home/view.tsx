import { ReactElement } from 'react';
import { MainLayout } from '@/layouts/main';
import { Game } from '@/components/game';

export function HomePage(): ReactElement {
	return (
		<MainLayout>
			<Game />
		</MainLayout>
	);
}
