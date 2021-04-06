import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../../styles/globals.css";

import Avatar, { Props } from "@/components/avatar";

export default {
    title: 'Components/Avatar',
    component: Avatar,
} as Meta;

type StoriesProps = Props

const TemplatePrimary: Story<StoriesProps> = (args) => <Avatar profileImagePath={ args.profileImagePath }/>;

export const Primary = TemplatePrimary.bind({});
Primary.args = {
    profileImagePath: "https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
};
