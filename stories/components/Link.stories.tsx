import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../../styles/globals.css";

import Link, { Props } from "@/components/link";
import { link } from "../data";

export default {
    title: 'Components/Link',
    component: Link,
} as Meta;

type StoriesProps = Props;

const TemplatePrimary: Story<StoriesProps> = (args) => <div style={{ width: "400px" }}>
    <Link {...args} />
</div>;

export const Default = TemplatePrimary.bind({});
Default.args = {
    link,
}
