import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../../styles/globals.css";

import Input, { Props } from "@/components/input";
import PasswordInput from "@/components/input/password";
import ErrorInput from "@/components/input/error";

export default {
    title: 'Components/Input',
    component: Input,
} as Meta;

type StoriesProps = Props;

const TemplateDefault: Story<StoriesProps> = (args) => <div style={ { width: "400px" } }>
    <Input { ...args } />
</div>;

export const Default = TemplateDefault.bind({});
Default.args = {
    placeholder: "Enter your email",
}

export const Error = TemplateDefault.bind({});
Error.args = {
    error: true,
}

const TemplatePassword: Story<StoriesProps> = (args) => <div style={ { width: "400px" } }>
    <PasswordInput { ...args } error={ args.error ? "Invalid password" : undefined }/>
</div>
export const Password = TemplatePassword.bind({});
Password.args = {
    placeholder: "Enter your password",
}

const TemplateError: Story<{ error: string }> = (args) => {
    const error = args.error === "" ? undefined : args.error;

    return <div style={ { width: "400px" } }>
        <ErrorInput { ...args } error={ error }/>
    </div>
}
export const WithError = TemplateError.bind({});
WithError.args = {
    error: "This field is required",
}


