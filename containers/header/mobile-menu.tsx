import React from "react";
import styled from "styled-components";
import UserAvatar from "@/components/avatar";
import { useRouter } from "next/router";
import AppRoutes from "@/utils/app-routes";
import useHeaderLogic from "@/containers/header/logic";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    overflow: hidden;
    z-index: 10000;
`;

const Slide = styled.div<{ open: boolean }>`
    width: 100%;
    height: 100%;
    background-color: white;
    transform: ${ props => props.open ? "translateX(0)" : "translateX(100%)" };
    transition: transform 300ms ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: all;
`;

const User = styled.div`
    font-size: 18px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    p.name {
        margin-top: 10px;
    }
`

const Tab = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #6e7191;
    margin-bottom: 15px;
    z-index: 100001;
    cursor: pointer;
`;

export type Props = {
    isOpen: boolean;
    onTabClick: (tab: "links" | "theme" | "settings") => any;
    user?: User | {
        name: string;
        profileImagePath?: string;
    },
}

const MobileMenuSlide: React.FC<Props> = (props) => {
    const router = useRouter();

    return <Container>
        <Slide open={ props.isOpen }>
            {
                props.user
                        ? <User>
                            <UserAvatar diameter="60px" profileImagePath={ props.user.profileImagePath }/>
                            <p className="name">
                                { props.user.name }
                            </p>
                        </User>
                        : <React.Fragment/>
            }

            <Tab onClick={ () => props.onTabClick("links") }>Links</Tab>
            <Tab onClick={ () => props.onTabClick("theme") }>Theme</Tab>
            <Tab onClick={ () => props.onTabClick("settings") }>Settings</Tab>

            {
                !props.user
                        ? <React.Fragment>
                            <Tab onClick={ () => router.push(AppRoutes.login) }>Login</Tab>
                            <Tab onClick={ () => router.push(AppRoutes.signup) }>Signup</Tab>
                        </React.Fragment>
                        : <React.Fragment>
                            {/* TODO: logout & my page */}
                            <Tab onClick={ () => console.log("TODO: logout") }>Login</Tab>
                            <Tab onClick={ () => console.log("TODO: go to my page") }>Signup</Tab>
                        </React.Fragment>
            }
        </Slide>
    </Container>
}

export default MobileMenuSlide;
