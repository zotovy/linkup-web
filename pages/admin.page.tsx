import React, { useEffect } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/store"
import { useRouter } from "next/router";
import AuthHelper from "@/helpers/auth-helper";

import Header from "@/components/../components/header";
import PhonePreviewContainer from "@/components/phone-preview";
import { fetchUserAction } from "@/redux/actions/user-actions";
import LinksPage from "./admin/links";
import Theme from "./admin/theme";

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
    const { user, goToPromo, loading, tab } = useAdminPage();

    if (user === null) {
        goToPromo();
        return <React.Fragment/>;
    }

    if (loading || !user) return <h1>loading</h1> // todo;

    const getPage = () => {
        if (tab === "links") return <LinksPage links={user.links} />
        if (tab === "theme") return <Theme theme={user.theme} />
        return <React.Fragment/>
    }

    return <React.Fragment>
        <Header user={user}/>
        <Page>
            { getPage() }
            <PhonePreviewContainer {...user}/>
        </Page>
    </React.Fragment>;
}

export default Admin;

export const useAdminPage = () => {
    const router = useRouter();
    const user = useSelector<State, User | undefined | null>(state => state.userReducer.user) as User | null;
    const dispatch = useDispatch();

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
    }
}
