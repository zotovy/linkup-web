import React from "react";
import styled from "styled-components";

import { LayoutStyles } from "@/layouts/admin-layout";
import Button from "@/components/button";
import LinkComponent from "@/components/link";

const Container = styled.div`
    ${ LayoutStyles };
    flex-direction: column;
    justify-content: initial;
    padding-top: 5%;
    
    .button, .link-component { 
        width: 100%;
        max-width: 400px;
    }
    
    .button {
        margin-bottom: 26px;
    }
    
    .link-component {
        margin-bottom: 20px;
    }
`;

export type Props = {
    links?: Link[]
}

const LinksPage: React.FC<Props> = ({ links }) => {
    if (!links) return <h1>Loading</h1> // todo

    return <Container>
        <Button>Create link</Button>
        {
            links.map(e => <LinkComponent
                    link={e}
                    key={e.createdAt.toString()}
                    save={() => {}}
                    remove={() => {}}
            />)
        }
    </Container>
}

export default LinksPage;
