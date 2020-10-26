const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
module.exports = withFonts();

const DEV_PORT = process.env.DEV_PORT;

module.exports = withImages(withCSS({
	webpack(config) {
		return config;
	},
	env: {
    SERVER_ADDRESS: DEV_PORT ? `http://localhost:${DEV_PORT}/` : 'https://myca.hende.org/',
	}
}));
