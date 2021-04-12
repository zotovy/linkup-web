import styled, { css } from "styled-components";

export const CenterLayoutStyles = css`
    width: 100vw;
    max-width: 768px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    background-color: ${ props => props.theme.colors.bg };
`;

const CenterLayout = styled.main`
    ${CenterLayoutStyles};
`;

export default CenterLayout;
