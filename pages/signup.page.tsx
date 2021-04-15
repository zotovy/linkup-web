import React from "react";
import { NextPage } from "next";
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
    return <form onSubmit={ props.handleSubmit }>
        <Input
                name="name"
                type="name"
                placeholder="Full name"
                onChange={ props.handleChange }
                value={ props.values.name }
                error={ props.touched.name ? props.errors.name : undefined }/>
        <Input
                name="username"
                type="username"
                placeholder="Username"
                onChange={ props.handleChange }
                value={ props.values.username }
                error={ props.touched.username ? props.errors.username : undefined }/>
        <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={ props.handleChange }
                value={ props.values.email }
                error={ props.touched.email ? props.errors.email : undefined }/>
        <PasswordInput
                name="password"
                type="password"
                placeholder="Password"
                onChange={ props.handleChange }
                value={ props.values.password }
                error={ props.touched.password ? props.errors.password : undefined }/>
        <PasswordInput
                name="confirmPassword"
                type="password"
                placeholder="Password Confirm"
                onChange={ props.handleChange }
                value={ props.values.confirmPassword }
                error={ props.touched.confirmPassword ? props.errors.confirmPassword : undefined }/>
        <Button
                htmlType="submit"
                disabled={ props.isSubmitting }>Signup</Button>
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
        props.router.push("/");
    },
    validationSchema: ValidationHelper.validateSignupForm,
})(InnerForm));

const SignupPage: NextPage = () => {
    return <React.Fragment>
        <Head>
            <title>Signup</title>
        </Head>
        <Page>
            <Title>Signup</Title>
            <Form/>
        </Page>
        <ToastContainer/>
    </React.Fragment>;
}

export default SignupPage;
