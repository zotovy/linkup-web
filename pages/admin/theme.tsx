import React from "react";
import styled from "styled-components";

import { LayoutStyles } from "@/layouts/admin-layout";
import ThemeComponent from "@/components/theme";
import Head from "next/head";

const Container = styled.div`
    ${ LayoutStyles };
    flex-wrap: wrap;
    padding: 50px;
    align-items: initial;
    
    .theme-component {
        margin: 10px 35px;
    }
`;

export type Props = {
    theme?: Theme,
    onThemeChange: (theme: number) => any,
}

const Theme: React.FC<Props> = (props) => {
    if (typeof props.theme === "undefined") return <h1>loading</h1>;

    return <React.Fragment>
        <Head>
            <title>Theme</title>
        </Head>
        <Container>
            {
                themes.map(theme => <ThemeComponent
                        name={theme.name}
                        gradient={theme.gradient}
                        onClick={() => props.onThemeChange(theme.theme)}
                        isSelected={props.theme === theme.theme}
                />)
            }
        </Container>
    </React.Fragment>
}

export default Theme;

const themes = [
    {
        name: "Light theme",
        gradient: ["#F3EFFF", "#F3EFFF"] as [string, string],
        theme: 0
    },
    {
        name: "Dark theme",
        gradient: ["#3A3A60", "#19192F"] as [string, string],
        theme: 1,
    },
];
