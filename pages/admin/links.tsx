import React from "react";
import Head from "next/head";
import styled from "styled-components";

import { LayoutStyles } from "@/layouts/admin-layout";
import LinkSkeleton from "@/components/link/skeleton";
import LinkComponent from "@/components/link";
import Button from "@/components/button";

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
    links: Link[],
    onLinkUpdate: (link: Link, i: number) => any,
    onLinkCreate: () => any,
    onLinkDelete: (i: number) => any,
    onLinkSave: (link: Link) => any,
    addedLinkIndex?: number,
}

const LinksPage: React.FC<Props> = ({
                                        links,
                                        onLinkUpdate,
                                        addedLinkIndex,
                                        onLinkSave,
                                        onLinkCreate,
                                        onLinkDelete
                                    }) => {
    const handleChange = (link: Link, i: number) => {
        links[i] = link;
        onLinkUpdate(link, i);
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
                        save={ onLinkSave }
                        remove={ () => onLinkDelete(i) }
                />)
            }
        </Container>
    </React.Fragment>
}

export default LinksPage;

export const LinksLoading: React.FC = () => {
    return <React.Fragment>
        <Head>
            <title>Links</title>
        </Head>
        <Container>
            <LinkSkeleton/>
            <LinkSkeleton/>
            <LinkSkeleton/>
            <LinkSkeleton/>
        </Container>
    </React.Fragment>
}
