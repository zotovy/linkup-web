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

    .user-skeleton {
        @media screen and (max-width: 960px) {
            display: none;
        }
    }
`;

export default Container;
