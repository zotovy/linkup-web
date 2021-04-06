import React from "react";
import Ripples from "react-ripples";
import styled from "styled-components";

const Container = styled.button`
    font-size: 18px;
    font-weight: 500;
    color: ${ props => props.theme.colors.text.contrast };
    cursor: pointer;
    border-radius: 10px;
    border: none;
    outline: none;
    transition: background-color 150ms ease;
    padding: 12.5px 30px;

    .content {
        border-radius: 15px;
        width: calc(100% + 20px);
        text-align: center;
    }

    &.primary {
        background-color: ${ props => props.theme.colors.primary };

        &:hover {
            background-color: ${ props => props.theme.colors.primaryHover };
        }
    }
`;

export type Props = Omit<React.ComponentPropsWithoutRef<'button'>, "type"> & {
    htmlType?: React.ComponentPropsWithoutRef<'button'>["type"];
    type?: "primary";
}

const Button: React.FC<Props> = (props: Props) => {
    const type = props.type ?? "primary"

    return <Ripples color="rgba(255, 255, 255, 0.3)" className="button-ripple">
        <Container { ...props } type={ props.htmlType } className={ type }>
            {
                props.children
            }
        </Container>
    </Ripples>
}

export default Button;
