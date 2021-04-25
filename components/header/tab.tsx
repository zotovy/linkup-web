import styled from "styled-components";

const Tab = styled.div`
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    color: #6e7191;
    position: relative;
    margin-right: 70px;
    padding: 4.5px 0;
    
    &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        border-radius: 3px;
        background-color: ${ props => props.theme.colors.primary };
        transition: width 200ms ease, margin-left 200ms ease;
        width: 0;
        margin-left: 0;
    }

    &:not(.selected) {
        &.links:after {
            margin-left: 28px;
        }

        &.theme:after {
            margin-left: 42px;
        }

        &.settings:after {
            margin-left: 49px;
        }
    }


    &.selected {
        color: ${ props => props.theme.colors.text.primary };
        position: relative;

        &.links:after {
            width: 56px;
        }

        &.theme:after {
            width: 84px;
        }

        &.settings:after {
            width: 98px;
        }
        
        &.locale-ru {
            &.links:after {
                width: 87px;
            }

            &.theme:after {
                width: 61px;
            }

            &.settings:after {
                width: 122px;
            }
        }
    }

    &:not(.selected) {
        cursor: pointer;
    }
    
    @media screen and (max-width: 960px) {
        display: none;
    }
`;

export default Tab;
