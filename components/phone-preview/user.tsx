import React from "react";
import styled from "styled-components";
import UserAvatar from "@/components/avatar";
import UiHelper from "@/helpers/ui-helper";

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
