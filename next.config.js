const { NODE_ENV } = process.env;
const nextTranslate = require("next-translate");

const configuration = {
  development: {
    SERVER_ADDRESS: "http://localhost:7000/",
    API_ADDRESS: "http://localhost:7000/",
    ME_ADDRESS: "http://localhost:3000",
    API_PATH: "legacy",
    EMAIL_PATH: "legacy",
    PAY_PAL_CLIENT_ID:
      "AWhXmi7ecVKx2DNiRBL15o-EoxX4hS52H09EB3SrdPAeSE01AvlE2dMqZa8rsDy7yeFHThNc9vULo06W"
  },
  staging: {
    SERVER_ADDRESS: "https://api-staging.mynalabel.com/",
    API_ADDRESS: "https://api-staging.mynalabel.com/",
    ME_ADDRESS: "https://staging.mynalabel.com",
    API_PATH: "legacy",
    EMAIL_PATH: "legacy",
    PAY_PAL_CLIENT_ID:
      "AWhXmi7ecVKx2DNiRBL15o-EoxX4hS52H09EB3SrdPAeSE01AvlE2dMqZa8rsDy7yeFHThNc9vULo06W"
  },
  production: {
    SERVER_ADDRESS: "https://api.mynalabel.com/",
    API_ADDRESS: "https://api.mynalabel.com/",
    ME_ADDRESS: "https://mynalabel.com",
    API_PATH: "legacy",
    EMAIL_PATH: "legacy",
    PAY_PAL_CLIENT_ID:
      "Aet-UX8Rj1rBuMbuaNKBUOqyTdWiaJpkN-EEwkPphiZcREn3aeP_b7EhqMDzcidzJxX5Y-jMNogmfJGc"
  }
};

module.exports = nextTranslate({
  publicRuntimeConfig: {
    i18nEnabled: process.env.I18N_ENABLED !== "false",
    mockPayPal: process.env.MOCK_PAYPAL === "true"
  },
  env: configuration[NODE_ENV],

  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en"
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: configuration[NODE_ENV].API_ADDRESS + ":path*"
      }
    ];
  },

  webpack(config) {
    return config;
  }
});
