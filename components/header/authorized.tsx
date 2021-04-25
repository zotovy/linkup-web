import React from "react";
import Link from "next/link";
import { ChevronDownOutline } from "react-ionicons";
import theme from "@/utils/theme";
import useHeaderLogic from "@/components/header/logic";

// Components
import User, { UserModelWindow } from "@/components/header/user";
import Container from "@/components/header/container";
import Logo from "@/components/header/logo";
import Tab from "@/components/header/tab";
import MobileMenuSlide from "@/components/header/mobile-menu";
import BurgerMenu from "@/components/header/burger";
import AppRoutes from "@/utils/app-routes";
import { useTranslation } from "next-i18next";

type Props = User | {
    name: string;
    profileImagePath?: string;
    username: string;
};

const Authorized: React.FC<Props> = (props) => {
    const { f, v } = useHeaderLogic();
    const { t } = useTranslation("admin");


    return <Container>
        <Logo width="48px" height="35px" src="/images/logo-48x35.png"/>
        <Tab className={ f.getTabClass("links") } onClick={ f.onTabClickHandler("links") }>{ t("links") }</Tab>
        <Tab className={ f.getTabClass("theme") } onClick={ f.onTabClickHandler("theme") }>{ t("theme") }</Tab>
        <Tab className={ f.getTabClass("settings") } onClick={ f.onTabClickHandler("settings") }>{ t("settings") }</Tab>
        <div className="space"/>
        <User onClick={ f.toggleUserModalWindow } data-testid="user-in-header">
            { props.name }
            <ChevronDownOutline cssClasses="chevron" color={ theme.colors.text.disabled }/>
            <UserModelWindow className={ f.getUserModalWindowClass() } data-testid="user-modal-in-header">
                <a target="_blank" href={ AppRoutes.userPage(props?.username) }>{ t("my_page") }</a>
                <a onClick={ f.logout } className="error">{ t("logout") }</a>
            </UserModelWindow>
        </User>

        <BurgerMenu onClick={ f.toggleUserSlide } open={ v.isMobileSlideOpen }/>
        <MobileMenuSlide user={ props } isOpen={ v.isMobileSlideOpen } onTabClick={ (tab) => {
            f.toggleUserSlide();
            f.onTabClick(tab);
        } }/>
    </Container>
}

export default Authorized;

