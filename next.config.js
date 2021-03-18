const DEV_PORT = process.env.DEV_PORT;

module.exports = {
	webpack(config) {
		return config;
	},
	env: {
    SERVER_ADDRESS: DEV_PORT ?
      `http://localhost:${DEV_PORT}/` :
      'https://myca.hende.org/',
    PAY_PAL_CLIENT_ID: DEV_PORT ?
      // sandbox AWh...06W
      `AWhXmi7ecVKx2DNiRBL15o-EoxX4hS52H09EB3SrdPAeSE01AvlE2dMqZa8rsDy7yeFHThNc9vULo06W` :
      // live Aet...JGc
      'Aet-UX8Rj1rBuMbuaNKBUOqyTdWiaJpkN-EEwkPphiZcREn3aeP_b7EhqMDzcidzJxX5Y-jMNogmfJGc',
	}
};
