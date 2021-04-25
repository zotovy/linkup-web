import React from "react";
import styled from "styled-components";

import { LayoutStyles } from "@/layouts/admin-layout";
import ThemeComponent, { ThemeSkeleton as ThemeSkeletonComponent } from "@/components/theme";
import Head from "next/head";
import { useTranslation } from "next-i18next";

const Container = styled.div`
    ${ LayoutStyles };
    flex-wrap: wrap;
    padding: 50px;
    align-items: initial;

    .theme-component {
        margin: 10px 35px;
    }

    @media screen and (max-width: 960px) {
        padding: 20px 0 0;
    }

    @media screen and (max-width: 550px) {
        flex-direction: column;
        align-items: center;
        justify-content: initial;
    }
`;

export type Props = {
    theme: Theme,
    onThemeChange: (theme: number) => any,
}

const Theme: React.FC<Props> = (props) => {

    const { t } = useTranslation("admin");

    return <React.Fragment>
        <Head>
            <title>{ t("theme") }</title>
        </Head>
        <Container>
            {
                themes.map(theme => <ThemeComponent
                        name={ t(theme.name) }
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
        name: "theme-light",
        gradient: ["#F3EFFF", "#F3EFFF"] as [string, string],
        theme: 0
    },
    {
        name: "theme-dark",
        gradient: ["#3A3A60", "#19192F"] as [string, string],
        theme: 1,
    },
];

export const ThemeSkeleton: React.FC = () => {
    return <React.Fragment>
        <Head>
            <title>Theme</title>
        </Head>
        <Container>
            <ThemeSkeletonComponent/>
            <ThemeSkeletonComponent/>
        </Container>
    </React.Fragment>
}
