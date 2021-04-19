import React from "react";
import { wrapper } from "@/redux/store";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";
import { CookiesProvider } from "react-cookie"
import { AnimateSharedLayout } from "framer-motion"
import theme from "@/utils/theme";
import EnvHelper from "@/helpers/env-helper";
import "../styles/globals.css"


const App: React.FC<AppProps> = ({ Component, pageProps, router}) => {
    EnvHelper.validateEnv();

    return <ThemeProvider theme={theme}>
        <AnimateSharedLayout>
            <SkeletonTheme color="#D9DBE9" highlightColor="#e2e3ed">
                <CookiesProvider>
                    <React.Fragment>
                        <Component {...pageProps} key={router.route} />
                    </React.Fragment>
                </CookiesProvider>
            </SkeletonTheme>
        </AnimateSharedLayout>
    </ThemeProvider>
}

export default wrapper.withRedux(App);
