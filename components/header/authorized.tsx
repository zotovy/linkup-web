import React  from "react";
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
        <User onClick={ f.toggleUserModalWindow } data-testid="user-in-header">
            { props.name }
            <ChevronDownOutline cssClasses="chevron" color={ theme.colors.text.disabled }/>
            <UserModelWindow className={ f.getUserModalWindowClass() } data-testid="user-modal-in-header">
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

