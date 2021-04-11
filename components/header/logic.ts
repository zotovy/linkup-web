import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppRoutes from "@/utils/app-routes";

const useHeaderLogic = () => {
    const router = useRouter();
    const [tab, setTab] = useState("");
    const [isUserModalWindowOpen, setIsUserModalWindowOpen] = useState(false);
    const [isMobileSlideOpen, setIsMobileSlideOpen] = useState(false)

    useEffect(() => {
        const queryTab = (router.query.tab ?? "links") as string;
        setTab(queryTab);
    }, []);

    const getTabClass = (_: string) => `${ tab === _ ? "selected" : "" } ${ _ }`;
    const onTabClickHandler = (_: "links" | "theme" | "settings") => () => onTabClick(_);
    const onTabClick = (tab: "links" | "theme" | "settings") => {
        const route = AppRoutes[tab];
        router.push(route);

        setTab(tab);
        setIsMobileSlideOpen(false);
    };
    const toggleUserModalWindow = () => setIsUserModalWindowOpen(!isUserModalWindowOpen);
    const toggleUserSlide = () => setIsMobileSlideOpen(!isMobileSlideOpen);
    const getUserModalWindowClass = () => isUserModalWindowOpen ? "" : "disabled";

    return {
        f: {
            getTabClass,
            onTabClick,
            onTabClickHandler,
            toggleUserModalWindow,
            getUserModalWindowClass,
            toggleUserSlide,
        },
        v: {
            tab,
            isUserModalWindowOpen,
            isMobileSlideOpen,
        }
    }
}

export default useHeaderLogic;
