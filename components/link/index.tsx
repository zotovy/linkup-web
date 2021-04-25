import React from "react";
import styled from "styled-components";
import * as icons from "react-ionicons";
import { ChevronForwardOutline } from "react-ionicons";
import UiHelper from "@/helpers/ui-helper";
import theme from "@/utils/theme";
import { withTranslation } from "next-i18next";

import { ContainerStyles, Information } from "@/components/phone-preview/link";
import IconSelector from "@/components/link/icon-selector";
import Input from "@/components/input";
import ValidationHelper from "@/helpers/validation-helper";
import { WithTranslation } from "react-i18next";

export type Props = {
    link: Link;
    save: (link: Link) => any;
    remove: (link: Link) => any;
    onChange: (link: Link) => any;
    initialIsOpen?: boolean;
};

type State = {
    link: Link;
    isOpen: boolean;
    errors: {
        title?: boolean,
        subtitle?: boolean,
        href?: boolean,
    }
}


class LinkComponent extends React.Component<Props & WithTranslation, State> {

    constructor(props: Props & WithTranslation) {
        super(props);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.validate = this.validate.bind(this);
    }

    state: State = {
        isOpen: this.props.initialIsOpen ?? false,
        link: this.props.link,
        errors: {},
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
        if (!this.validate()) return;
        this.props.save(this.state.link);
    }

    validate(): boolean {
        const link = {
            title: this.state.link.title,
            subtitle: this.state.link.subtitle,
            href: this.state.link.href,
        }
        try {
            ValidationHelper.LinkValidator.validateSync(link, { abortEarly: false });
            this.setState({ ...this.state, isOpen: false, errors: {} });
            return true;
        } catch (e) {
            const errors = {
                title: e.errors.includes("title"),
                subtitle: e.errors.includes("subtitle"),
                href: e.errors.includes("href"),
            };
            this.setState({ ...this.state, errors });
            return false;
        }
    }

    handleRemove = () => this.props.remove(this.state.link);

    render() {
        const t = this.props.t;
        const iconName = this.state.link.iconName;
        // @ts-ignore because react-icons have badly support ts
        const IconComponent = icons[UiHelper.formatNameToIcon(iconName)];

        return <Container className={`link-component lang-${ this.props.i18n.language }`} isOpen={ this.state.isOpen } data-testid="link">
            <HeaderContainer open={ this.state.isOpen } userTheme={ 0 } onClick={ this.open } data-testid="link-header">
                <IconComponent { ...this.iconProps } />
                <Information userTheme={ 0 }>
                    <span className="title">{ this.state.link.title.length === 0 ? "Title" : this.state.link.title }</span>
                    <span className="subtitle">{ this.state.link.subtitle.length === 0 ? "Subtitle" : this.state.link.subtitle }</span>
                </Information>

                <OpenTrigger data-open={ this.state.isOpen }>
                    <ChevronForwardOutline cssClasses="chevron" color={ theme.colors.disabled }/>
                    <SaveText onClick={ (e) => {
                        e.stopPropagation();
                        this.handleSave();
                    } }>
                        { t("save") }
                    </SaveText>
                </OpenTrigger>
            </HeaderContainer>

            <EditLinkContainer isOpen={ this.state.isOpen } data-testid="link-edit">
                <Input onChange={ this.handleLinkChange("title") }
                       defaultValue={ this.props.link.title }
                       error={ this.state.errors.title }
                       placeholder={ t("title") } />
                <Input onChange={ this.handleLinkChange("subtitle") }
                       defaultValue={ this.props.link.subtitle }
                       error={ this.state.errors.subtitle }
                       placeholder={ t("subtitle") }/>
                <Input onChange={ this.handleLinkChange("href") }
                       defaultValue={ this.props.link.href }
                       error={ this.state.errors.href }
                       placeholder={ t("link") }/>

                <DeleteContainer>
                    <IconSelector iconName={ this.props.link.iconName } onIconChange={ this.handleIconChange }/>
                    <DeleteText onClick={ this.handleRemove }>{ t("delete") }</DeleteText>
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

export default withTranslation("link-component")(LinkComponent);

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
    flex: 0 0 45px;
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

const Container = styled.div<{ isOpen: boolean }>`
    height: ${ props => props.isOpen ? "355px" : "69px" };
    transition: height 200ms ease;
    background-color: white;
    border-radius: 16px;
    
    &.lang-ru ${OpenTrigger} {
        flex: 0 0 81px;

        &[data-open=true] {
            .chevron {
                transform: translateX(calc(-100% - 60px));
            }
        }
    }
`;


