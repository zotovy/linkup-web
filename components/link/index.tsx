import React from "react";
import styled from "styled-components";
import * as icons from "react-ionicons";
import { ChevronForwardOutline } from "react-ionicons";
import UiHelper from "@/helpers/ui-helper";
import theme from "@/utils/theme";

import { ContainerStyles, Information } from "@/components/phone-preview/link";
import IconSelector from "@/components/link/icon-selector";
import Input from "@/components/input";

export type Props = {
    link: Link;
    save: (link: Link) => any;
    remove: (link: Link) => any;
    onChange: (link: Link) => any;
    initialIsOpen?: boolean;
}

type State = {
    link: Link;
    isOpen: boolean;
}


class LinkComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    state: State = {
        isOpen: this.props.initialIsOpen ?? false,
        link: this.props.link,
    }

    close = () => this.setState({ ...this.state, isOpen: false })
    open = () => this.setState({ ...this.state, isOpen: true });

    handleIconChange(iconName: string) {
        const link = this.state.link;
        link.iconName = iconName;
        this.setState({ ...this.state, link });
        this.props.onChange(link);
    }

    handleLinkChange(name: "title" | "subtitle" | "href") {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const link = this.state.link;
            link[name] = e.target.value;
            this.setState({ ...this.state, link });
            this.props.onChange(link);
        }
    }

    handleSave() {
        this.setState({ ...this.state, isOpen: false });
        this.props.save(this.state.link);
    }

    handleRemove = () => this.props.remove(this.state.link);

    render() {

        const iconName = this.state.link.iconName;
        // @ts-ignore because react-icons have badly support ts
        const IconComponent = icons[UiHelper.formatNameToIcon(iconName)];

        return <Container className="link-component" isOpen={ this.state.isOpen } data-testid="link">
            <HeaderContainer open={ this.state.isOpen } userTheme={ 0 } onClick={ this.open } data-testid="link-header">
                <IconComponent { ...this.iconProps } />
                <Information userTheme={ 0 }>
                    <span className="title">{ this.state.link.title.length === 0 ? "Title" : this.state.link.title }</span>
                    <span className="subtitle">{ this.state.link.subtitle.length === 0 ? "Subtitle" : this.state.link.subtitle }</span>
                </Information>

                <OpenTrigger data-open={ this.state.isOpen }>
                    <ChevronForwardOutline cssClasses="chevron" color={ theme.colors.disabled }/>
                    <SaveText onClick={ (e) => {
                        this.close();
                        e.stopPropagation();
                        this.handleSave();
                    } }>
                        Save
                    </SaveText>
                </OpenTrigger>
            </HeaderContainer>

            <EditLinkContainer isOpen={ this.state.isOpen } data-testid="link-edit">
                <Input onChange={ this.handleLinkChange("title") }
                       defaultValue={ this.props.link.title }
                       placeholder="Title"/>
                <Input onChange={ this.handleLinkChange("subtitle") }
                       defaultValue={ this.props.link.subtitle }
                       placeholder="Subtitle"/>
                <Input onChange={ this.handleLinkChange("href") }
                       defaultValue={ this.props.link.href }
                       placeholder="Link"/>

                <DeleteContainer>
                    <IconSelector iconName={ this.props.link.iconName } onIconChange={ this.handleIconChange }/>
                    <DeleteText onClick={ this.handleRemove }>Delete</DeleteText>
                </DeleteContainer>
            </EditLinkContainer>
        </Container>
    }

    readonly iconProps = {
        style: {
            marginRight: "10px",
            marginTop: "5px",
        },
        color: theme.colors.primary,
        width: "36px",
        height: "36px",
    }
}

export default LinkComponent;

const Container = styled.div<{ isOpen: boolean }>`
    height: ${ props => props.isOpen ? "355px" : "69px" };
    transition: height 200ms ease;
    background-color: white;
    border-radius: 16px;
`;

const HeaderContainer = styled.div<{ userTheme: Theme, open: boolean }>`
    ${ ContainerStyles };
    user-select: none;
    height: 69px;
    margin-bottom: 0;
    width: 100%;
    pointer-events: ${ props => props.open ? "none" : "initial" };
`;

const EditLinkContainer = styled.div<{ isOpen: boolean }>`
    width: calc(100% - 20px);
    overflow: hidden;
    height: ${ props => props.isOpen ? "calc(100% - 69px)" : "0" };
    transition: height 300ms ease, border-top 200ms;
    display: flex;
    flex-direction: column;
    border-top: ${ props => props.isOpen ? `1px solid ${ props.theme.colors.disabled }` : "none" };
    margin: 0 10px;
    padding-top: 20px;

    ${ Input } {
        margin-bottom: 20px;
    }
`;

const DeleteContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DeleteText = styled.span`
    font-size: 16px;
    line-height: 24px;
    color: ${ props => props.theme.colors.text.error };
    cursor: pointer;
`;

const SaveText = styled.span`
    font-size: 16px;
    line-height: 24px;
    color: ${ props => props.theme.colors.primary };
    cursor: pointer;
    position: absolute;
    left: 100%;
    z-index: 100;
    pointer-events: all;
`;

const OpenTrigger = styled.div`
    width: 45px;
    height: 24px;
    overflow: hidden;
    position: relative;
    margin-top: 13.5px;

    .chevron {
        position: absolute;
        right: 0;
    }

    ${ SaveText }, .chevron {
        transition: transform 200ms ease;
    }

    &[data-open=true] {
        ${ SaveText } {
            transform: translateX(-100%);
        }

        .chevron {
            transform: translateX(calc(-100% - 22px));
        }
    }
`;


