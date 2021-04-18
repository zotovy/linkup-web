import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: ${ props => props.theme.colors.primary };
    cursor: pointer;
    
    img {
        margin-right: 10px;
    }
`;


const WaterMark: React.FC = () => {
    return <Container onClick={() => window.location.href = "https://linkup.com"}>
        <img src="/images/logo-small.png" width="28px" height="25px" alt="linkup logo small"/>
        <span>Linkup</span>
    </Container>
}

export default WaterMark;
