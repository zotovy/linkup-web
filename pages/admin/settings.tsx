import React, { useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

import { LayoutStyles } from "@/layouts/admin-layout";
import AvatarPicker from "@/components/avatar-picker";
import Input from "@/components/input/error";
import Button from "@/components/button";
import Head from "next/head";
import ValidationHelper from "@/helpers/validation-helper";

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
    user: User,
    onSettingsChanged: (user: User) => any,
    onAvatarPicked: (file: File) => any,
    save: () => any,
}

const Settings: React.FC<Props> = ({ user, onSettingsChanged, save, onAvatarPicked }) => {
    const [error, setError] = useState<string | undefined>();

    const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        user.name = e.target.value;
        onSettingsChanged(user);
    }

    const handleSave = () => {
        setError("");
        if (!ValidationHelper.TextValidator.test(user.name) || user.name.length > 50) {
            return setError("Invalid name");
        }

        save();
    }

    return <React.Fragment>
        <Head>
            <title>Settings</title>
        </Head>
        <Container>
            <AvatarPicker onPick={ onAvatarPicked } profileImagePath={ user.profileImagePath } diameter={ 150 }/>
            <Input
                    error={ error }
                    maxLength={ 50 }
                    onChange={ handleNameChanged }
                    placeholder="Your name"
                    defaultValue={ user.name }/>
            <Button onClick={ handleSave }>Save</Button>
        </Container>
    </React.Fragment>
}

export default Settings;

/* istanbul ignore next */
export const SettingsSkeleton: React.FC = () => {
    return <React.Fragment>
        <Head>
            <title>Settings</title>
        </Head>
        <Container>
            <Skeleton width={ 150 } height={ 150 } className="user-avatar" style={ { borderRadius: "50%" } }/>
            <Skeleton width={ 400 } className="input" height={ 45 }/>
            <Skeleton width={ 400 } className="button" height={ 50 }/>
        </Container>
    </React.Fragment>
}
