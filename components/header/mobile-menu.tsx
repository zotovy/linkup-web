import React from "react";
import styled from "styled-components";
import UserAvatar from "@/components/avatar";
import { useRouter } from "next/router";
import AppRoutes from "@/utils/app-routes";
import { useTranslation } from "next-i18next";
import AuthHelper from "@/helpers/auth-helper";

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
        username: string;
    },
}

const MobileMenuSlide: React.FC<Props> = (props) => {
    const router = useRouter();
    const { t } = useTranslation("admin");

    const logout = () => {
        AuthHelper.destroyTokens();
        router.push("/");
    }


    return <Container>
        <Slide open={ props.isOpen } data-testid="mobile-slide-slide">
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

            <Tab onClick={ () => props.onTabClick("links") }>{ t("links") }</Tab>
            <Tab onClick={ () => props.onTabClick("theme") }>{ t("theme") }</Tab>
            <Tab onClick={ () => props.onTabClick("settings") }>{ t("settings") }</Tab>

            {
                !props.user
                        ? <React.Fragment>
                            <Tab onClick={ () => router.push(AppRoutes.login) }>{ t("login") }</Tab>
                            <Tab onClick={ () => router.push(AppRoutes.signup) }>{ t("signup") }</Tab>
                        </React.Fragment>
                        : <React.Fragment>
                            {/* TODO: logout & my page */}
                            <Tab onClick={ logout }>{ t("logout") }</Tab>
                            <a href={ AppRoutes.userPage(props.user.username) } target="_blank">
                                <Tab>{ t("my_page") }</Tab>
                            </a>
                        </React.Fragment>
            }
        </Slide>
    </Container>
}

export default MobileMenuSlide;
