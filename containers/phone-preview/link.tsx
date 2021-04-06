import React from "react";
import styled from "styled-components";
import * as icons from "react-ionicons";
import UiHelper from "@/helpers/ui-helper";
import theme from "@/utils/theme";

const Container = styled.div<{ userTheme: Theme }>`
    display: flex;
    padding: 10px;
    border-radius: 16px;
    margin-bottom: 20px;
    background-color: ${ props => UiHelper.getThemedStyles(props.userTheme).bg.secondary };
    transition: background-color 200ms ease;
    cursor: pointer;
    
    &:hover {
        background-color: ${ props => UiHelper.getThemedStyles(props.userTheme).bg.hover };
    }
`;

const Information = styled.div<{ userTheme: Theme }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 46px);
    
    span.title {
        font-size: 15px;
        font-weight: 500;
        color: ${ props => UiHelper.getThemedStyles(props.userTheme).text.primary }
    }
    
    span.subtitle {
        font-size: 12px;
        color: ${ props => UiHelper.getThemedStyles(props.userTheme).text.secondary }
    }
`;

export type Props = {
    link: Link;
    theme: Theme;
}

const LinkComponent: React.FC<Props> = (props) => {

    const iconName = props.link.iconName;
    // @ts-ignore because react-icons have badly support ts
    const IconComponent = icons[UiHelper.formatNameToIcon(iconName)];

    return <Container
            onClick={() => window.location.pathname = props.link.href}
            userTheme={ props.theme }>
        <IconComponent
                style={{ marginRight: "10px", marginTop: "3px" }}
                color={theme.colors.primary}
                width="36px"
                height="36px"/>
        <Information userTheme={props.theme}>
            <span className="title">{ props.link.title }</span>
            <span className="subtitle">{ props.link.subtitle }</span>
        </Information>
    </Container>
}


export default LinkComponent;
