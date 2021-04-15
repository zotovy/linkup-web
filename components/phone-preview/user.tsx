import React from "react";
import styled from "styled-components";
import UiHelper from "@/helpers/ui-helper";

import UserAvatar from "@/components/avatar";
import Skeleton from "react-loading-skeleton";

const Name = styled.p<{ userTheme: Theme }>`
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-top: 11px;
    color: ${ props => UiHelper.getThemedStyles(props.userTheme).text.primary };
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export type Props = User | {
    profileImagePath?: string;
    name: string;
    theme: Theme;
}

const UserInformationPreview: React.FC<Props> = (props: Props) => {
    return <Container className="UserInformationPreview">
        <UserAvatar profileImagePath={ props.profileImagePath }/>
        <Name userTheme={ props.theme }>{ props.name }</Name>
    </Container>
}

export default UserInformationPreview;

export const UserInformationPreviewSkeleton: React.FC = () => {
    return <Container className="UserInformationPreview">
        <Skeleton className="user-avatar" width={90} height={90} style={{ borderRadius: "50%" }}/>
        <Skeleton width={148} height={30} style={{ marginTop: "11px" }}/>
    </Container>
}
