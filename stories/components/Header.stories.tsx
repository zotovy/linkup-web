import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { user } from "../data";
import "../../styles/globals.css";

import Header, { Props } from "@/components/header";

export default {
    title: 'Component/Header',
    component: Header,
} as Meta;


type StoriesProps = Props;

const TemplatePrimary: Story<StoriesProps> = (args) => {
    return <Header { ...args } />;
}

export const Authorized = TemplatePrimary.bind({});
Authorized.args = { user };
export const Loading = TemplatePrimary.bind({});
Loading.args = { loading: true };






