import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../../styles/globals.css";

import Input, { Props } from "@/components/input";
import PasswordInput from "@/components/input/password";

export default {
    title: 'Components/Input',
    component: Input,
} as Meta;

type StoriesProps = Props;

const TemplateDefault: Story<StoriesProps> = (args) => <div style={{ width: "400px" }}>
    <Input {...args} />
</div>;

export const Default = TemplateDefault.bind({});
Default.args = {
    placeholder: "Enter your email",
}

export const Error = TemplateDefault.bind({});
Error.args = {
    error: true,
}

const TemplatePassword: Story<StoriesProps> = (args) => <div style={{ width: "400px" }}>
    <PasswordInput {...args} />
</div>
export const Password = TemplatePassword.bind({});
Password.args = {
    placeholder: "Enter your password",
}



