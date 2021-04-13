import React, { useState } from "react";
import styled from "styled-components";

import Input from "@/components/input";
import { ErrorLabel, Container as MainContainer, Props } from "@/components/input/error";

const Eye = styled.img`
    height: 20px;
    position: absolute;
    top: 12.5px;
    right: 12.5px;
    cursor: pointer;
`;

const Container = styled.div`
    width: 100%;
    position: relative;

    ${ Input } {
        width: 100%;
        
        &:not(:placeholder-shown) {
            letter-spacing: 7px;
        }
    }

    &[data-open=true] {
        ${ Input } {
            letter-spacing: initial;
        }
    }
`;

const PasswordInput: React.FC<Props> = (props: Props) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const eyeSrc = isPasswordShown ? "/icons/open-eye.png" : "/icons/closed-eye.png";
    const inputType = isPasswordShown ? "text" : "password";

    return <MainContainer className="input">
        <Container data-open={ isPasswordShown }>
            <Input { ...props } type={ inputType } error={!!props.error} />
            <Eye src={ eyeSrc } onClick={ () => setIsPasswordShown(!isPasswordShown) }/>
        </Container>
        <ErrorLabel>{ props.error }</ErrorLabel>
    </MainContainer>
}

export default PasswordInput;
