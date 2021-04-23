import styled, { css } from "styled-components";

export const LayoutStyles = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 740px;
    
    @media screen and (max-width: 960px) {
        height: initial;
        min-height: calc(100vh - 200px);
    }
`;

export default styled.div`${LayoutStyles}`;
