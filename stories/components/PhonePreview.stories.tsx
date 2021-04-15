import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { user, link } from "../data";
import "../../styles/globals.css";

import UserComponent from "@/components/phone-preview/user";
import LinkComponent from "@/components/phone-preview/link";
import PhonePreviewContainer from "@/components/phone-preview";
import PhoneSkeleton from "@/components/phone-preview/skeleton";
import WaterMarkComponent from "@/components/phone-preview/watermark";

export default {
    title: 'Component/Phone preview',
    component: PhonePreviewContainer,
} as Meta;


type StoriesProps = User & {
    linksCounter: number;
};

const TemplatePrimary: Story<StoriesProps> = (args) => {
    return <PhonePreviewContainer
            { ...user }
            { ...args }
            links={ new Array(args.linksCounter).fill(link) }/>;
}

export const Default = TemplatePrimary.bind({});
Default.args = {
    name: user.name,
    profileImagePath: user.profileImagePath,
    theme: 0,
    linksCounter: 2,
};

export const Skeleton = PhoneSkeleton.bind({});

// ---- User ------------
const UserTemplate: Story<User> = (args) => {
    return <UserComponent {...args} />
}
export const User = UserTemplate.bind({});
User.args = user;

// ---- Link ------------
const LinkTemplate: Story<Link & { theme: Theme }> = (args) => {
    return <LinkComponent link={args} theme={args.theme} />
}
export const Link = LinkTemplate.bind({});
Link.args = { ...link, theme: 0 };

// ---- WaterMark ------------
const WatermarkTemplate: Story = () => {
    return <WaterMarkComponent />
}
export const Watermark = WatermarkTemplate.bind({});



