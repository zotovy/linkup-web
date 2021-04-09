import styled from "styled-components";

const Buttons = styled.div`
    flex: 0 0 auto;
    display: flex;

    .button-secondary {
        margin-right: 20px;
    }

    @media screen and (max-width: 960px) {
        display: none;
    }
`;

export default Buttons;
