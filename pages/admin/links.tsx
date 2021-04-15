import React from "react";
import Head from "next/head";
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
    links?: Link[],
    onLinksUpdate: (links: Link[]) => any,
    onLinkCreate: () => any,
    onLinkDelete: (i: number) => any,
    addedLinkIndex?: number,
}

const LinksPage: React.FC<Props> = ({ links, onLinksUpdate, addedLinkIndex, onLinkCreate, onLinkDelete }) => {
    if (!links) return <h1>Loading</h1> // todo

    const handleChange = (link: Link, i: number) => {
        links[i] = link;
        onLinksUpdate(links);
    }

    return <React.Fragment>
        <Head>
            <title>Links</title>
        </Head>
        <Container>
            <Button onClick={ onLinkCreate }>Create link</Button>
            {
                links.map((e, i) => <LinkComponent
                        onChange={ (link) => handleChange(link, i) }
                        link={ e }
                        initialIsOpen={ addedLinkIndex === i }
                        key={ e.createdAt.toString() }
                        save={ () => {
                        } }
                        remove={ () => onLinkDelete(i) }
                />)
            }
        </Container>
    </React.Fragment>
}

export default LinksPage;
