import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 185px;
    height: 185px;
    background-color: #FFFFFF;
    border-radius: 16px;
    padding: 10px;
    cursor: pointer;
`;

const Preview = styled.div<Pick<Props, "gradient">>`
    width: 165px;
    height: 128px;
    background: linear-gradient(243.5deg, ${ props => props.gradient[0] } 1.01%, ${ props => props.gradient[1] } 94.5%);
    border-radius: 16px;
    margin-bottom: 10px;
`;

const Name = styled.span<Pick<Props, "isSelected">>`
    font-size: 18px;
    line-height: 27px;
    font-weight:${ props => props.isSelected ? "500" : "normal" };
    color: ${ props => props.isSelected
            ? props.theme.colors.text.primary
            : props.theme.colors.text.secondary
    };
`;

export type Props = {
    name: string;
    gradient: [string, string];
    isSelected?: boolean;
    onClick?: () => any;
}

const ThemeComponent: React.FC<Props> = (props) => {
    return <Container {...props}>
        <Preview { ...props } />
        <Name { ...props }>{ props.name }</Name>
    </Container>
}

export default ThemeComponent;