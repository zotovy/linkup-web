import styled from "styled-components";

const ErrorPageLayout = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    h1 {
        text-align: center;
        font-size: 98px;
        font-weight: 600;
        color: ${ props => props.theme.colors.text.primary }; 
    }
    
    span {
        width: 400px;
        text-align: center;
        font-size: 18px;
        color: ${ props => props.theme.colors.text.secondary };
    }
`;

export default ErrorPageLayout
