import React, { useEffect } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Header from "@/components/../components/header";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/store"
import { useRouter } from "next/router";
import { fetchUserAction } from "@/redux/actions/user-actions";
import AuthHelper from "@/helpers/auth-helper";

const Page = styled.main`
    
`;

const Admin: NextPage = () => {
    const { user, goToPromo } = useAdminPage();

    if (user === null) {
        goToPromo();
        return <React.Fragment/>;
    }

    return <React.Fragment>
        <Header user={user}/>
        <Page>
            123
        </Page>
    </React.Fragment>;
}

export default Admin;

export const useAdminPage = () => {
    const router = useRouter();
    const user = useSelector<State, User | undefined | null>(state => state.userReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction(AuthHelper.uid));
    }, []);

    const goToPromo = () => router.push("/"); // todo: go to promo home page


    return {
        user,
        goToPromo
    }
}
