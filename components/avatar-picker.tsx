import React from "react";
import styled from "styled-components";
import { PencilOutline } from "react-ionicons";
import UserAvatar, { Props as AvatarProps } from "@/components/avatar";

const Hover = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 1;
    border-radius: 50%;
    transition: opacity 150ms;
`;

const Input = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0;
    z-index: 5;
    cursor: pointer;
`;

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 90px;
    height: 90px;
    
    &:not(:hover) > ${Hover} {
        opacity: 0;
    }
`;

export type Props = AvatarProps & {
    onPick: (file: File) => any
}


const AvatarPicker: React.FC<Props> = (props: Props) => {

    const styles: React.CSSProperties = {
        width: props.diameter ?? "",
        height: props.diameter ?? "",
    };

    const iconSize = typeof props.diameter === "number" ? ((props.diameter as number) / 3) : 42;

    return <Container style={styles} className="user-avatar">
        <UserAvatar { ...props } />
        <Hover>
            <PencilOutline color="white" height={ `${iconSize}px` } width={ `${iconSize}px` } />
        </Hover>
        <Input
                type="file"
                accept="image/*"
                data-testid="input"
                onChange={e => e.target.files ? props.onPick(e.target.files[0]) : null} />
    </Container>
}

export default AvatarPicker;
