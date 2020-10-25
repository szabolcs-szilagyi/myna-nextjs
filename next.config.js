const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
module.exports = withFonts();

module.exports = withImages(withCSS({
	webpack(config) {
		return config;
	},
	env: {
		SERVER_ADDRESS: 'https://myca.hende.org/',
	}
}));
