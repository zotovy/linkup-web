import React from "react";
import styled from "styled-components";
import UiHelper from "@/helpers/ui-helper";

import UserInformationPreview from "@/components/phone-preview/user";
import LinkComponent from "@/components/phone-preview/link";
import Watermark from "@/components/phone-preview/watermark";

const Container = styled.div<{ userTheme: Theme }>`
    width: 350px;
    height: 768px;
    border-radius: 50px;
    box-shadow: 0 0 0 15px #111111;
    display: flex;
    flex-direction: column;
    background-color: ${ props => UiHelper.getThemedStyles(props.userTheme).bg.primary };
    padding: 0 20px;
    position: relative;

    // todo: adaptive for different sizes     

    .UserInformationPreview {
        margin-top: 30px;
    }
`;

const LinksContainer = styled.div`
    margin-top: 51px;
    width: 100%;
`;

export type Props = User;

const PhonePreviewContainer: React.FC<Props> = (props) => {
    return <Container userTheme={ props.theme }>
        <UserInformationPreview { ...props } />
        <LinksContainer>
            {
                props.links.map(x => <LinkComponent link={ x } theme={ props.theme } key={ `link-${ x.id }` }/>)
            }
        </LinksContainer>

        <Watermark/>
    </Container>
}

export default PhonePreviewContainer;
