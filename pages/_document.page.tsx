import Document, { DocumentContext, Html, NextScript, Main, Head } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { CookiesProvider } from "react-cookie";
import React from "react";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                    originalRenderPage({
                        enhanceApp: (App) => (props) =>
                                sheet.collectStyles(<App { ...props } />),
                    });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                        <>
                            { initialProps.styles }
                            { sheet.getStyleElement() }
                        </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
                <Html lang="en">
                    <Head>
                        <meta property="og:image" content="/images/og-image.jpg" />
                        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
                    </Head>
                    <body>
                    <Main/>
                    <NextScript/>
                    </body>
                </Html>
        );
    }
}
