const { NODE_ENV } = process.env;

const configuration = {
  development: {
    SERVER_ADDRESS: 'http://localhost:3000/',
    API_PATH: 'api/legacy',
    EMAIL_PATH: 'api/legacy',
    PAY_PAL_CLIENT_ID: 'AWhXmi7ecVKx2DNiRBL15o-EoxX4hS52H09EB3SrdPAeSE01AvlE2dMqZa8rsDy7yeFHThNc9vULo06W',
  },
  staging: {
    SERVER_ADDRESS: 'https://staging.mynalabel.com/',
    API_PATH: 'api/legacy',
    EMAIL_PATH: 'api/legacy',
    PAY_PAL_CLIENT_ID: 'AWhXmi7ecVKx2DNiRBL15o-EoxX4hS52H09EB3SrdPAeSE01AvlE2dMqZa8rsDy7yeFHThNc9vULo06W',
  },
  production: {
    SERVER_ADDRESS: 'https://myca.hende.org/',
    API_PATH: 'listen.php',
    EMAIL_PATH: 'amazon-ses-smtp.php',
    PAY_PAL_CLIENT_ID: 'Aet-UX8Rj1rBuMbuaNKBUOqyTdWiaJpkN-EEwkPphiZcREn3aeP_b7EhqMDzcidzJxX5Y-jMNogmfJGc',
  },
};

module.exports = {
	webpack(config) {
		return config;
	},
	env: configuration[NODE_ENV]
};
