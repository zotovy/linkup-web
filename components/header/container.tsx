import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 1400px;
    margin: 20px auto 0;
    padding: 0 20px;

    .space {
        width: 100%;
    }

    .burger-outside-container.open {
        position: fixed;
        top: 20px;
        right: 20px;
        height: 34px;
        width: 34px;
        z-index: 100000000;
    }
    
    @media screen and (max-width: 960px) {
        .user-skeleton {
            display: none;
        }
    }
`;

export default Container;
