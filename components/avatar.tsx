import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${ props => props.theme.colors.disabled };
`;

export type Props = (User | {
    profileImagePath?: string;
}) & {
    style?: React.CSSProperties
    diameter?: React.CSSProperties["width"]
}

const UserAvatar: React.FC<Props> = (props) => {
    let profileImagePath = props.profileImagePath;

    if (!props.profileImagePath || props.profileImagePath.length === 0) {
        profileImagePath = "/images/user-placeholder.png";
    }

    const bg = `url(${profileImagePath})`;
    const styles: React.CSSProperties = {
        width: props.diameter ?? "",
        height: props.diameter ?? "",
        backgroundImage: bg,
        ...props.style,
    };

    return <Container style={ styles } className="user-avatar" data-testid="avatar"/>
}

export default UserAvatar;
