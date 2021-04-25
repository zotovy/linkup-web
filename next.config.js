const {PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER} = require('next/constants')
const { i18n } = require('./next-i18next.config');

module.exports = (phase) => {

    let env = {
        SERVER_URL: "https://localhost:5001",
    }

    if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        env = {
            SERVER_URL: process.env.SERVER_URL,
        }
    }

    return {
        env,
        i18n,
        pageExtensions: ["page.tsx"],
    };
};
