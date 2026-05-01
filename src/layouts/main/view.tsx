import { ReactElement, ReactNode } from 'react';

interface MainLayoutProps {
	children?: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps): ReactElement {
	return <main className={'main'}>{children}</main>;
}
