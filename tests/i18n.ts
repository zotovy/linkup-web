import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import adminRes from "../public/locales/en/admin.json";
import errorPagesRes from "../public/locales/en/admin.json";
import linkComponentRes from "../public/locales/en/admin.json";
import loginRes from "../public/locales/en/admin.json";
import promoRes from "../public/locales/en/admin.json";
import signupRes from "../public/locales/en/admin.json";

i18n
    .use(initReactI18next)
    .init({
    resources: {
        en: {
            "admin": adminRes,
            "error-pages": errorPagesRes,
            "link-component": linkComponentRes,
            "login": loginRes,
            "promo": promoRes,
            "signup": signupRes,
        },
    },
    fallbackLng: "en",
});

export default i18n;
