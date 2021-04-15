import React from "react";
import styled from "styled-components";

import { LayoutStyles } from "@/layouts/admin-layout";
import AvatarPicker from "@/components/avatar-picker";
import Input from "@/components/input/error";
import Button from "@/components/button";
import Head from "next/head";

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
    user?: User,
    onSettingsChanged: (user: User) => any,
}

const Settings: React.FC<Props> = ({ user, onSettingsChanged }) => {
    if (!user) return <h1>loading</h1> // todo

    const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        user.name = e.target.value;
        onSettingsChanged(user);
    }

    return <React.Fragment>
        <Head>
            <title>Settings</title>
        </Head>
        <Container>
            <AvatarPicker onPick={ () => {
            } } profileImagePath={ user.profileImagePath } diameter={ 150 }/>
            <Input
                    maxLength={50}
                    onChange={ handleNameChanged }
                    placeholder="Your name"
                    defaultValue={ user.name }/>
            <Button>Save</Button>
        </Container>
    </React.Fragment>
}

export default Settings;
