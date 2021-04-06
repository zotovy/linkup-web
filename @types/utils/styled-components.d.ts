import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string,
            primaryHover: string
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
            },
        }
        centerContent: string;
    }
}
