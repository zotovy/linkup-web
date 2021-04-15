import React from "react";
import styled from "styled-components";

import { LayoutStyles } from "@/layouts/admin-layout";
import ThemeComponent from "@/components/theme";

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
    theme?: Theme
}

const Theme: React.FC<Props> = (props) => {
    if (typeof props.theme === "undefined") return <h1>loading</h1>;

    return <Container>
        {
            themes.map(theme => <ThemeComponent
                    name={theme.name}
                    gradient={theme.gradient}
                    onClick={() => {}}
                    isSelected={props.theme === theme.theme}
            />)
        }
    </Container>
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
