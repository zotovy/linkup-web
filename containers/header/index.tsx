import React from "react";
import Authorized from "@/containers/header/authorized";
import Loading from "@/containers/header/loading";

export type Props = {
    user?: User | {
        username: string;
        name: string;
        profileImagePath?: string;
    },
    loading?: boolean,
}


const HeaderContainer: React.FC<Props> = (props) => {
    if (props.user && !props.loading) return <Authorized {...props.user}/>;
    return <Loading/>;
}

export default HeaderContainer;
