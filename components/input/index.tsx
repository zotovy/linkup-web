import React from "react";
import styled from "styled-components";

const Input = styled.input<Props>`
    border: 1.5px solid ${ props => props.theme.colors.disabled };
    padding: 7px 14px;
    border-radius: 10px;
    font-size: 15px;
    line-height: 28px;
    outline: none;
    background: white;
    z-index: 10;
    width: 100%;
    transition: border 200ms;

    &:focus {
        border: 1.5px solid ${ props => props.theme.colors.input.focus };
    }

    ${
            props => props.error
                    ? `
                        border: 1.5px solid ${ props.theme.colors.input.error } !important;
                        color: ${ props.theme.colors.input.error };
                    `
                    : ""
    }
`;

export type Props = React.ComponentPropsWithoutRef<"input"> & {
    error?: boolean;
};

export default Input;

