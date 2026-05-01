import path from 'path';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const config = defineConfig({
	plugins: [reactPlugin()],
	resolve: {
		alias: {
			'@': path.join(process.cwd(), 'src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		passWithNoTests: true,
		clearMocks: true,
		coverage: {
			enabled: false,
			all: false,
			provider: 'istanbul',
			include: ['src/**'],
			reporter: ['json-summary', 'html'],
		},
	},
});

export { config as default };
