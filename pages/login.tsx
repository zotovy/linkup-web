import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import styled from "styled-components";

import { CenterLayoutStyles } from "@/layouts/center-layout";
import PasswordInputInput from "@/components/input/password";
import Button from "@/components/button";
import Input from "@/components/input";
import Title from "@/components/title";

const Page = styled.main`
    ${ CenterLayoutStyles }
    ${ Title } {
        margin-bottom: 20px;
    }

    ${ Input } {
        margin-bottom: 15px;
    }

    .button {
        width: 100%;
    }
`;


const LoginPage: NextPage = () => {
    const { handleChange, onLogin } = useLoginPage();

    return <Page>
        <Title>Login</Title>
        <Input onChange={ handleChange("email") } placeholder="Enter your email" type="email"/>
        <PasswordInputInput onChange={ handleChange("password") } placeholder="Enter your password"/>
        <Button onClick={ onLogin }>Login</Button>
    </Page>;
}

export default LoginPage;

const formValues = {
    email: "",
    password: "",
}

export const useLoginPage = () => {
    const router = useRouter();

    const handleChange = (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
        formValues[field] = e.target.value;
    }

    const onLogin = async () => {
        console.log("login:)");
        console.log(formValues);
    }

    return {
        handleChange,
        onLogin,
    }
}
