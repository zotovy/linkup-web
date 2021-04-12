import React, { useState } from "react";
import styled from "styled-components";
import Input from "@/components/input";

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

export type PasswordInputTypes = React.ComponentPropsWithoutRef<"input">;
const PasswordInput: React.FC<PasswordInputTypes> = (props: PasswordInputTypes) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const eyeSrc = isPasswordShown ? "/icons/open-eye.png" : "/icons/closed-eye.png";
    const inputType = isPasswordShown ? "text" : "password";

    return <Container data-open={ isPasswordShown }>
        <Input { ...props } type={ inputType }/>
        <Eye src={ eyeSrc } onClick={ () => setIsPasswordShown(!isPasswordShown) }/>
    </Container>
}

export default PasswordInput;
