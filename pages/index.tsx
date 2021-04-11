import { NextPage } from "next";
import styled from "styled-components";
import Header from "@/components/../components/header";
import { user } from "../stories/data";
import LinkComponent from "@/components/link";

const Page = styled.main`
    
`;

const link: Link = {
    createdAt: new Date(),
    href: "https://github.com/zotovY",
    iconName: "logo-github",
    id: 1,
    subtitle: "This is my github account",
    title: "Github",
    user: user,
}

const Index: NextPage = () => {
    return <Page>
        <LinkComponent link={link} />
    </Page>;
}

export default Index;
