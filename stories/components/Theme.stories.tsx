import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../../styles/globals.css";

import Theme, { Props, ThemeSkeleton } from "@/components/theme";

export default {
    title: 'Components/Theme',
    component: Theme,
} as Meta;

type StoriesProps = Props

const TemplateDefault: Story<StoriesProps> = (args) => <Theme {...args}/>;

export const Default = TemplateDefault.bind({});
Default.args = {
    gradient: ["#3A3A60", "#19192F"],
    isSelected: false,
    name: "Dark theme",
};

export const Skeleton = ThemeSkeleton.bind({});
