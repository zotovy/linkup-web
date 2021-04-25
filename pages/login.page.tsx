import React from "react";
import { useRouter } from "next/router";
import { GetStaticPropsContext, NextPage } from "next";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CenterLayoutStyles } from "@/layouts/center-layout";
import PasswordInputInput from "@/components/input/password";
import Button from "@/components/button";
import Input from "@/components/input";
import Title from "@/components/title";
import UserService from "@/services/user-service";
import UiHelper from "@/helpers/ui-helper";
import ValidationHelper from "@/helpers/validation-helper";
import Head from "next/head";
import Link from "next/link";
import AppRoutes from "@/utils/app-routes";
import { HaveAccount } from "./signup.page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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
    const { t } = useTranslation("login");

    return <React.Fragment>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <Page>
            <Title>{ t("title") }</Title>
            <Input onChange={ handleChange("email") } placeholder={ t("input_email") } type="email"/>
            <PasswordInputInput onChange={ handleChange("password") } placeholder={ t("input_password") }/>
            <Button onClick={ onLogin }>{ t("title") }</Button>
            <HaveAccount>
                { t("signup-link-1") }
                <Link href={AppRoutes.signup}>
                    <a>{ t("signup-link-2") }</a>
                </Link>
            </HaveAccount>
        </Page>
        <ToastContainer/>;
    </React.Fragment>;
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
        const { email, password } = formValues;

        // validate input first
        const isValid = await ValidationHelper.validateLoginForm.isValid(formValues);
        if (!isValid) return UiHelper.showToast("Invalid email or password");

        const status = await UserService.loginUser(email, password);

        if (status === "ok") return router.push(AppRoutes.links);
        else if (status === "invalid_credentials") UiHelper.showToast("Invalid email or password");
        else UiHelper.showToast("Invalid error happened. Please, try later");
    }

    return {
        handleChange,
        onLogin,
    }
}

// Used only for translation
export const getStaticProps = async (args: GetStaticPropsContext) => {
    return {
        props: {
            ...await serverSideTranslations(args.locale as string, ["login"]),
        }
    };
}
