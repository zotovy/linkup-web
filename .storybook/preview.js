import {addDecorator} from "@storybook/react";
import {ThemeProvider} from "styled-components";
import { withNextRouter } from 'storybook-addon-next-router';
import {SkeletonTheme} from "react-loading-skeleton";
import React from "react";
import theme from "../utils/theme";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
}

addDecorator(storyfn => <ThemeProvider theme={ theme }>{ storyfn() }</ThemeProvider>);
addDecorator(storyfn => <SkeletonTheme
        color={ "#D9DBE9" }
        highlightColor={ "#e2e3ed" }>
    { storyfn() }
</SkeletonTheme>);

addDecorator(withNextRouter())
