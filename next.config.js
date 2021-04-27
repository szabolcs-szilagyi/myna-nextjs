const { NODE_ENV } = process.env;

const configuration = {
  development: {
    SERVER_ADDRESS: 'http://127.0.0.1:7000/',
    API_ADDRESS: 'http://127.0.0.1:7000/',
    API_PATH: 'legacy',
    EMAIL_PATH: 'legacy',
    PAY_PAL_CLIENT_ID: 'AWhXmi7ecVKx2DNiRBL15o-EoxX4hS52H09EB3SrdPAeSE01AvlE2dMqZa8rsDy7yeFHThNc9vULo06W',
  },
  staging: {
    SERVER_ADDRESS: 'https://api-staging.mynalabel.com/',
    API_ADDRESS: 'https://api-staging.mynalabel.com/',
    API_PATH: 'legacy',
    EMAIL_PATH: 'legacy',
    PAY_PAL_CLIENT_ID: 'AWhXmi7ecVKx2DNiRBL15o-EoxX4hS52H09EB3SrdPAeSE01AvlE2dMqZa8rsDy7yeFHThNc9vULo06W',
  },
  production: {
    SERVER_ADDRESS: 'https://api.mynalabel.com/',
    API_ADDRESS: 'https://api.mynalabel.com/',
    API_PATH: 'legacy',
    EMAIL_PATH: 'legacy',
    PAY_PAL_CLIENT_ID: 'Aet-UX8Rj1rBuMbuaNKBUOqyTdWiaJpkN-EEwkPphiZcREn3aeP_b7EhqMDzcidzJxX5Y-jMNogmfJGc',
  },
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: configuration[NODE_ENV].API_ADDRESS + ':path*',
      },
    ];
  },
	webpack(config) {
		return config;
	},
	env: configuration[NODE_ENV]
};
