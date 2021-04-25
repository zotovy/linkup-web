import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { withTranslation } from "react-i18next";
import { ThemeProvider } from 'styled-components'
import theme from "@/utils/theme";

const AllTheProviders = withTranslation("en")(({ children }) => {
    return <ThemeProvider theme={ theme }>
        { children }
    </ThemeProvider>
})

const customRender = (
        ui: ReactElement,
        options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }

export const ThemeWrapper: React.FC = ({ children }) => {
    return <ThemeProvider theme={ theme }>
        { children }
    </ThemeProvider>
}

export const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
