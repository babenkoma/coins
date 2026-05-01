const path = require('path');

/** @type {import('@craco/types').CracoConfig} */
module.exports = {
	typescript: {
		enableTypeChecking: true,
	},
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
};
