import React from "react";
import styled from "styled-components";

import { LayoutStyles } from "@/layouts/admin-layout";
import UserAvatar from "@/components/avatar";
import Input from "@/components/input/error";
import Button from "@/components/button";

const Container = styled.div`
    ${ LayoutStyles };
    flex-direction: column;

    .input, .button {
        width: 100%;
        max-width: 400px;
    }
    
    .user-avatar {
        margin-bottom: 40px;
    }
    
    .input {
        margin-bottom: 22px;
    }
`;

export type Props = {
    user?: User
}

const Settings: React.FC<Props> = ({ user }) => {
    if (!user) return <h1>loading</h1> // todo

    return <Container>
        <UserAvatar profileImagePath={user.profileImagePath} diameter={150} />
        <Input placeholder="Your name" value={user.name} />
        <Button>Save</Button>
    </Container>
}

export default Settings;
