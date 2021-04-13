import React from "react";
import styled from "styled-components";
import InputBase from "./index";

export const ErrorLabel = styled.span`
    height: 0;
    overflow: hidden;
    transition: height 200ms ease;
    color: #EE4C31;
    font-size: 14px;
    font-weight: normal;
`;

export const Container = styled.div`

    &.error {

        ${ InputBase } {
            border: 1px solid #EE4C31;
            color: #EE4C31;
        }


        ${ ErrorLabel } {
            margin-top: 5px;
            height: 20px;
        }
    }
`;


export type Props = React.ComponentPropsWithoutRef<"input"> & {
    error?: string;
}

/// This component contains error props
const Input: React.FC<Props> = (props) => {
    return <Container className={ !!props.error ? "error" : "" + " input" }>
        <InputBase { ...props } error={false} />
        <ErrorLabel>{ props.error }</ErrorLabel>
    </Container>
}

export default Input;
