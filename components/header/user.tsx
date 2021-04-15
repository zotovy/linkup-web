import styled from "styled-components";

const User = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: ${ props => props.theme.colors.text.primary };
    flex: 0 0 auto;
    cursor: pointer;
    position: relative;

    .chevron {
        margin-left: 5px;
        margin-top: 4px;
    }

    @media screen and (max-width: 960px) {
        display: none;
    }
`;

export default User;

export const UserModelWindow = styled.div`
    position: absolute;
    top: 40px;
    right: 0;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
    transition: transform 200ms ease, opacity 200ms ease;
    transform: translateX(0);
    opacity: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 125px;

    &.disabled {
        transform: translateX(-50px);
        opacity: 0;
        pointer-events: none;
    }

    a {
        font-size: 15px;
        font-weight: 400;
        margin-bottom: 3px;
        color: ${ props => props.theme.colors.text.primary };

        &.error {
            color: ${ props => props.theme.colors.text.error };
        }
    }
`;

