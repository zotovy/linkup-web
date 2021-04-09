import React from "react";
import Ripples from "react-ripples";
import styled from "styled-components";

type StyledProps = {
    role: "primary" | "secondary";
    size: "small" | "default";
}

const Container = styled.button<StyledProps>`
    font-size: ${ props => props.size === "small" ? "16px" : "18px" };
    font-weight: 500;
    cursor: pointer;
    border-radius: 12.5px;
    outline: none;
    transition: background-color 150ms ease;
    padding: ${ props => props.size === "small" ? "10px 25px" : "12.5px 30px" };
    color: ${ props => {
        if (props.role === "primary") return props.theme.colors.text.contrast;
        if (props.role === "secondary") return props.theme.colors.primary;
        return "";
    } };
    background-color: ${ props => {
        if (props.role === "primary") return props.theme.colors.primary;
        if (props.role === "secondary") return "transparent";
        return "initial";
    } };
    border: 2px solid ${ props => props.theme.colors.primary };


    .content {
        border-radius: 15px;
        width: calc(100% + 20px);
        text-align: center;
    }

    &:hover {
        background-color: ${ props => {
            switch (props.role) {
                case "primary":
                    return props.theme.colors.primaryHover;
                default:
                    return "";
            }
        } };
    }

`;

export type Props = Omit<React.ComponentPropsWithoutRef<'button'>, "type"> & {
    htmlType?: React.ComponentPropsWithoutRef<'button'>["type"];
} & Partial<StyledProps>

const Button: React.FC<Props> = (props: Props) => {
    const role = props.role ?? "primary"
    const size = props.size ?? "default";
    const splashColor = role === "primary"
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(95, 46, 234, 0.15)"

    return <Ripples
            color={ splashColor }
            className={ `button-ripple button-container button-${ role }` }
            >
        <Container { ...props } type={ props.htmlType } role={ role } size={ size } data-testid="button">
            {
                props.children
            }
        </Container>
    </Ripples>
}

export default Button;
