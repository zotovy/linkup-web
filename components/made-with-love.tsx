import React from "react";
import styled from "styled-components";

const Container = styled.div`
    font-size: 14px;
    text-align: center;
    color: ${ props => props.theme.colors.text.disabled };
`;

const Link = styled.a`
    cursor: pointer;
    color: ${ props => props.theme.colors.text.disabled };
    
    &:hover {
        text-decoration: underline;
    }
`;

const MadeWithLove: React.FC = () => {
    return <Container>
        Made with 🖤&nbsp; by <Link href="https://linkup.zotov.dev/zotovy">Yaroslav Zotov</Link>
    </Container>
}

export default MadeWithLove;
