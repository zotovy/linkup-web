import React from "react";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: ${ props => props.theme.colors.text.primary };
`;

export default Title;
