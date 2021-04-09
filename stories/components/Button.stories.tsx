import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../../styles/globals.css";

import Button, { Props } from "@/components/button";

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

type StoriesProps = Props & { text: string }

const TemplatePrimary: Story<StoriesProps> = (args) => <Button>{ args.text }</Button>;

export const Primary = TemplatePrimary.bind({});
Primary.args = {
    text: "My button"
}

const TemplateSecondary: Story<StoriesProps> = (args) => <Button role="secondary">{ args.text }</Button>;
export const Secondary = TemplateSecondary.bind({});
Secondary.args = {
    text: "My button"
}
