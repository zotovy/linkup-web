import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/store"
import { useRouter } from "next/router";
import AuthHelper from "@/helpers/auth-helper";

import { fetchUserAction, setUserAction } from "@/redux/actions/user-actions";
import PhonePreviewSkeleton from "@/components/phone-preview/skeleton";
import PhonePreviewContainer from "@/components/phone-preview";
import Settings, { SettingsSkeleton } from "./admin/settings";
import LinksPage, { LinksLoading } from "./admin/links";
import Theme, { ThemeSkeleton } from "./admin/theme";
import Header from "@/components/../components/header";

const Page = styled.main`
    margin-top: 50px;
    width: 100%;
    min-height: calc(100vh - 114px);
    display: flex;
    align-items: center;
    ${ props => props.theme.centerContent };
    padding: 20px;
`;

const Admin: NextPage = () => {
    const {
        user,
        goToPromo,
        tab,
        onLinksUpdate,
        addedLinkIndex,
        onLinkCreate,
        onLinkDelete,
        onThemeChange,
        changeSettings
    } = useAdminPage();

    if (user === null) {
        goToPromo();
        return <React.Fragment/>;
    }

    const getPage = () => {
        if (!user) {
            if (tab === "links") return <LinksLoading/>;
            if (tab === "theme") return <ThemeSkeleton/>;
            if (tab === "settings") return <SettingsSkeleton/>;
        }

        if (tab === "links") return <LinksPage
                onLinkDelete={ onLinkDelete }
                onLinkCreate={ onLinkCreate }
                addedLinkIndex={ addedLinkIndex }
                onLinksUpdate={ onLinksUpdate }
                links={ user.links }/>
        if (tab === "theme") return <Theme onThemeChange={ onThemeChange } theme={ user.theme }/>
        if (tab === "settings") return <Settings onSettingsChanged={ changeSettings } user={ user }/>
        return <React.Fragment/>
    }

    return <React.Fragment>
        <Header user={ user }/>
        <Page>
            { getPage() }
            {
                user
                        ? <PhonePreviewContainer { ...user }/>
                        : <PhonePreviewSkeleton/>
            }
        </Page>
    </React.Fragment>;
}

export default Admin;

export const useAdminPage = () => {
    const router = useRouter();
    const user = useSelector<State, User | undefined | null>(state => state.userReducer.user) as User | null;
    const dispatch = useDispatch();
    const [addedLinkIndex, setAddedLinkIndex] = useState<number | undefined>();

    useEffect(() => {
        dispatch(fetchUserAction(AuthHelper.uid));
    }, []);

    const goToPromo = () => router.push("/"); // todo: go to promo home page

    let tab = (router.query.tab ?? "links") as "links" | "theme" | "settings";
    if (!["links", "theme", "settings"].includes(tab)) tab = "links";


    return {
        loading: typeof user === "undefined",
        user,
        goToPromo,
        tab,
        onLinksUpdate: (links: Link[]) => {
            if (!user) return;
            dispatch(setUserAction({ ...user, links }));
        },
        onLinkCreate: () => {
            if (!user) return;
            setAddedLinkIndex(user.links.length);
            const link: Link = {
                createdAt: new Date(),
                iconName: "link-outline",
                href: "",
                subtitle: "",
                title: "",
                id: 0,
                user: user,
            }
            const links = [...user.links, link];
            dispatch(setUserAction({ ...user, links }));
        },
        onLinkDelete: (i: number) => {
            if (!user) return;
            const links = user.links.splice(i - 1, 1);
            dispatch(setUserAction({ ...user, links }));
        },
        onThemeChange: (theme: Theme) => {
            if (!user) return;
            dispatch(setUserAction({ ...user, theme }));
        },
        changeSettings: (user: User) => {
            if (!user) return;
            dispatch(setUserAction({ ...user }));
        },
        addedLinkIndex
    }
}
