import React from "react";
import styled from "styled-components";
import UiHelper from "@/helpers/ui-helper";

import UserInformationPreview from "@/components/phone-preview/user";
import Watermark from "@/components/phone-preview/watermark";
import LinkComponent from "@/components/phone-preview/link";

export const Container = styled.div<{ userTheme: Theme }>`
    width: 350px;
    height: 740px;
    flex: 0 0 auto;
    border-radius: 50px;
    box-shadow: 0 0 0 15px #111111;
    display: flex;
    flex-direction: column;
    background-color: ${ props => UiHelper.getThemedStyles(props.userTheme).bg.primary };
    padding: 0 20px;
    position: relative;
    overflow: hidden;

    // todo: adaptive for different sizes     

    .UserInformationPreview {
        margin-top: 30px;
    }
`;

export const LinksContainer = styled.div`
    margin-top: 51px;
    width: 100%;
`;

export type Props = User;

const PhonePreviewContainer: React.FC<Props> = (props) => {
    return <Container userTheme={ props.theme } className="phone-preview">
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

