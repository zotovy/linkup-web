import React from "react";
import Link from "next/link";
import { GetStaticPropsContext, NextPage } from "next";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { FormikProps, withFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";

import { WithRouterProps } from "next/dist/client/with-router";
import { CenterLayoutStyles } from "@/layouts/center-layout";
import ValidationHelper from "@/helpers/validation-helper";
import PasswordInput from "@/components/input/password";
import UserService from "@/services/user-service";
import Input from "@/components/input/error";
import UiHelper from "@/helpers/ui-helper";
import { withRouter } from "next/router";
import Button from "@/components/button";
import Title from "@/components/title";
import Head from "next/head";
import AppRoutes from "@/utils/app-routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Page = styled.main`
    ${ CenterLayoutStyles }
    ${ Title } {
        margin-bottom: 20px;
    }

    form {
        width: 100%;

        .input {
            margin-bottom: 15px;
        }
    }

    .button {
        margin-top: 5px;
        width: 100%;
    }
`;

export type FormValues = {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const InnerForm: React.FC<FormikProps<FormValues>> = (props) => {
    const { t } = useTranslation("signup");

    return <form onSubmit={ props.handleSubmit }>
        <Input
                name="name"
                type="name"
                placeholder={ t("input_name") }
                onChange={ props.handleChange }
                value={ props.values.name }
                error={ props.touched.name && props.errors.name ? t(props.errors.name) : undefined }/>
        <Input
                name="username"
                type="username"
                placeholder={ t("input_username") }
                onChange={ props.handleChange }
                value={ props.values.username }
                error={ props.touched.username && props.errors.username ? t(props.errors.username) : undefined }/>
        <Input
                name="email"
                type="email"
                placeholder={ t("input_email") }
                onChange={ props.handleChange }
                value={ props.values.email }
                error={ props.touched.email && props.errors.email ? t(props.errors.email) : undefined }/>
        <PasswordInput
                name="password"
                type="password"
                placeholder={ t("input_password") }
                onChange={ props.handleChange }
                value={ props.values.password }
                error={ props.touched.password && props.errors.password ? t(props.errors.password): undefined }/>
        <PasswordInput
                name="confirmPassword"
                type="password"
                placeholder={ t("input_password_confirm") }
                onChange={ props.handleChange }
                value={ props.values.confirmPassword }
                error={ props.touched.confirmPassword && props.errors.confirmPassword ? t(props.errors.confirmPassword) : undefined }/>
        <Button
                htmlType="submit"
                disabled={ props.isSubmitting }>{ t("title") }</Button>
    </form>
}


const Form = withRouter(withFormik<WithRouterProps, FormValues>({
    mapPropsToValues: () => ({
        username: "",
        confirmPassword: "",
        email: "",
        name: "",
        password: "",
    }),
    handleSubmit: async (values, { props }) => {
        const response = await UserService.signupUser(values);


        if (response !== "ok") {
            let message = "Invalid error happened. Please, try later";
            if (response === "email_not_unique_error") message = "This email is already in use";
            if (response === "username_not_unique_error") message = "This username is already in use";

            return UiHelper.showToast(message);
        }
        props.router.push(AppRoutes.links);
    },
    validationSchema: ValidationHelper.validateSignupForm,
})(InnerForm));

const SignupPage: NextPage = () => {
    const { t } = useTranslation("signup");

    return <React.Fragment>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <Page>
            <Title>{ t("title") }</Title>
            <Form/>
            <HaveAccount>
                { t("login-link-1") }
                <Link href={AppRoutes.login}>
                    <a>{ t("login-link-2") }</a>
                </Link>
            </HaveAccount>
        </Page>
        <ToastContainer/>
    </React.Fragment>;
}

export default SignupPage;

export const HaveAccount = styled.span`
    margin-top: 15px;
    text-align: center;
    color: ${ props => props.theme.colors.text.disabled };
    font-size: 16px;
    
    a {
        margin-left: 5px;
        color: ${ props => props.theme.colors.text.disabled };
    }
`;

// Used only for translation
export const getStaticProps = async (args: GetStaticPropsContext) => {
    return {
        props: {
            ...await serverSideTranslations(args.locale as string, ["signup"]),
        }
    };
}
