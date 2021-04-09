import React  from "react";
import { ChevronDownOutline } from "react-ionicons";
import theme from "@/utils/theme";
import useHeaderLogic from "@/containers/header/logic";

// Components
import User, { UserModelWindow } from "@/containers/header/user";
import Container from "@/containers/header/container";
import Logo from "@/containers/header/logo";
import Tab from "@/containers/header/tab";
import MobileMenuSlide from "@/containers/header/mobile-menu";
import BurgerMenu from "@/containers/header/burger";

type Props = User | {
    username: string;
    name: string;
    profileImagePath?: string;
};

const Authorized: React.FC<Props> = (props) => {
    const { f, v } = useHeaderLogic();

    return <Container>
        <Logo src="/images/logo-48x35.png"/>
        <Tab className={ f.getTabClass("links") } onClick={ f.onTabClickHandler("links") }>Links</Tab>
        <Tab className={ f.getTabClass("theme") } onClick={ f.onTabClickHandler("theme") }>Theme</Tab>
        <Tab className={ f.getTabClass("settings") } onClick={ f.onTabClickHandler("settings") }>Settings</Tab>
        <div className="space"/>
        <User onClick={ f.toggleUserModalWindow }>
            { props.name }
            <ChevronDownOutline cssClasses="chevron" color={ theme.colors.text.disabled }/>
            <UserModelWindow className={ f.getUserModalWindowClass() }>
                <a>My page</a>
                <a className="error">Logout</a>
            </UserModelWindow>
        </User>

        <BurgerMenu onClick={ f.toggleUserSlide } open={ v.isMobileSlideOpen }/>
        <MobileMenuSlide user={props} isOpen={ v.isMobileSlideOpen } onTabClick={ (tab) => {
            f.toggleUserSlide();
            f.onTabClick(tab);
        } }/>
    </Container>
}

export default Authorized;

