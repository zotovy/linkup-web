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

export type Props = {}

const MadeWithLove: React.FC<Props> = (props) => {
    return <Container>
        Made with 🖤&nbsp; by <Link href="https://linkup.ru/zotovy">Yaroslav Zotov</Link>
    </Container>
}

export default MadeWithLove;
