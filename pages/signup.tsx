import { NextPage } from "next";
import styled from "styled-components";
import { FormikProps, withFormik } from "formik";

import { CenterLayoutStyles } from "@/layouts/center-layout";
import Input from "@/components/input/error";
import PasswordInput from "@/components/input/password";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import ValidationHelper from "@/helpers/validation-helper";
import UserService from "@/services/user-service";
import UiHelper from "@/helpers/ui-helper";
import Button from "@/components/button";
import Title from "@/components/title";

const Page = styled.main`
    ${CenterLayoutStyles}

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
    return <form onSubmit={props.handleSubmit}>
        <Input
                name="name"
                type="name"
                placeholder="Full name"
                onChange={props.handleChange}
                value={props.values.name}
                error={props.touched.name ? props.errors.name : undefined}/>
        <Input
                name="username"
                type="username"
                placeholder="Username"
                onChange={props.handleChange}
                value={props.values.username}
                error={props.touched.username ? props.errors.username : undefined}/>
        <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={props.handleChange}
                value={props.values.email}
                error={props.touched.email ? props.errors.email : undefined}/>
        <PasswordInput
                name="password"
                type="password"
                placeholder="Password"
                onChange={props.handleChange}
                value={props.values.password}
                error={props.touched.password ? props.errors.password : undefined}/>
        <PasswordInput
                name="confirmPassword"
                type="password"
                placeholder="Password Confirm"
                onChange={props.handleChange}
                value={props.values.confirmPassword}
                error={props.touched.confirmPassword ? props.errors.confirmPassword : undefined} />
        <Button
                htmlType="submit"
                disabled={props.isSubmitting}>Signup</Button>
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
        if (response !== "ok") return UiHelper.showToast(
                response === "email_not_unique_error"
                        ? "This email is already in use"
                        : "Invalid error happened. Please, try later"
        );
        props.router.push("/");
    },
    validationSchema: ValidationHelper.validateSignupForm,
})(InnerForm));

const SignupPage: NextPage = () => {
    return <Page>
        <Title>Signup</Title>
        <Form/>
    </Page>;
}

export default SignupPage;
