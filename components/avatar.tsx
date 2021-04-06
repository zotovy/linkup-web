import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export type Props = (User | {
    profileImagePath?: string;
}) & {
    style?: React.CSSProperties
}

const UserAvatar: React.FC<Props> = (props) => {
    let profileImagePath = props.profileImagePath;

    if (!props.profileImagePath || props.profileImagePath.length === 0) {
        profileImagePath = "/images/user-placeholder.png";
    }

    const bg = `url(${profileImagePath})`;
    const styles: React.CSSProperties = {
        backgroundImage: bg,
        ...props.style,
    };

    return <Container style={ styles }/>
}

export default UserAvatar;
