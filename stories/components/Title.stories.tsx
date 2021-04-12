import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../../styles/globals.css";

import Title from "@/components/title";

export default {
    title: 'Components/Title',
    component: Title,
} as Meta;

type StoriesProps = {
    text: string
};

const TemplatePrimary: Story<StoriesProps> = (args) => <Title>{ args.text }</Title>;

export const Primary = TemplatePrimary.bind({});
Primary.args = {
    text: "This is my title"
};
