import React from "react";
import Skeleton from "react-loading-skeleton";
import useHeaderLogic from "@/components/header/logic";

// Components
import MobileMenuSlide from "@/components/header/mobile-menu";
import Container from "@/components/header/container";
import BurgerMenu from "@/components/header/burger";
import Logo from "@/components/header/logo";
import Tab from "@/components/header/tab";

const LoadingHeader: React.FC = () => {
    const { f: { toggleUserSlide, onTabClick }, v: { isMobileSlideOpen } } = useHeaderLogic();

    return <Container>
        <Logo src="/images/logo-48x35.png"/>
        <Tab className="selected links">Links</Tab>
        <Tab>Theme</Tab>
        <Tab>Settings</Tab>
        <div className="space"/>

        <Skeleton width="175px" height="37px" className="user-skeleton"/>
        <BurgerMenu onClick={ toggleUserSlide } open={ isMobileSlideOpen }/>
        <MobileMenuSlide isOpen={ isMobileSlideOpen } onTabClick={ (tab) => {
            toggleUserSlide();
            onTabClick(tab);
        } }/>
    </Container>
}

export default LoadingHeader;
