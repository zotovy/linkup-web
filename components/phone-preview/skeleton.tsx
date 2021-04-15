import React from "react";
import Skeleton from "react-loading-skeleton";

import { Container, LinksContainer } from "./index";
import { UserInformationPreviewSkeleton } from "./user";

const PhoneSkeleton: React.FC = () => {
    return <Container userTheme={0}>
        <UserInformationPreviewSkeleton/>
        <LinksContainer>
            <Skeleton width={310} height={67} style={{ marginBottom: "20px", borderRadius: "16px" }} />
            <Skeleton width={310} height={67} style={{ marginBottom: "20px", borderRadius: "16px" }} />
            {/*<Skeleton width={310} height={67} style={{ marginBottom: "20px", borderRadius: "16px" }} />*/}
        </LinksContainer>
    </Container>
}

export default PhoneSkeleton;
