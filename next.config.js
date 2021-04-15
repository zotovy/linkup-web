const {PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER} = require('next/constants')

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
        pageExtensions: ["page.tsx"],
    }
}
