import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string,
            primaryHover: string
            lightPrimary: string;
            lightPrimaryHover: string;
            bg: string,
            text: {
                primary: string,
                secondary: string,
                contrast: string,
                disabled: string,
                error: string,
            },
            input: {
                border: string,
                focus: string,
                error: string,
            },
            disabled: string,
        }
        centerContent: string;
    }
}
