import React from "react";
import styled from "styled-components";
import * as icons from "react-ionicons";
import UiHelper from "@/helpers/ui-helper";
import theme from "@/utils/theme";
import IconSelectorWindow from "@/components/link/icon-selector-window";
import { WithTranslation, withTranslation } from "next-i18next";


export type Props = {
    iconName: string;
    onIconChange: (iconName: string) => any,
} & WithTranslation

type State = {
    iconName: string;
    isSelectorOpen: boolean;
}

class IconSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.openSelector = this.openSelector.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
    }

    state: State = {
        iconName: UiHelper.formatNameToIcon(this.props.iconName),
        isSelectorOpen: false,
    }

    openSelector = (): void => this.setState({ ...this.state, isSelectorOpen: true });

    handleIconChange(iconName: string): void {
        this.setState({ ...this.state, iconName, isSelectorOpen: false });
        iconName = UiHelper.formatIconToName(iconName);
        this.props.onIconChange(iconName);
    }

    render() {
        // @ts-ignore because react-icons have badly support ts
        const Icon = icons[this.state.iconName];

        return <React.Fragment>
            <Container onClick={ this.openSelector } data-testid="link-icon-selector">
                <IconContainer>
                    <Icon color={ theme.colors.primary }
                          width="42px"
                          height="42px"/>
                </IconContainer>
                <ChangeIconText>{ this.props.t("change-icon") }</ChangeIconText>
            </Container>

            {
                this.state.isSelectorOpen
                        ? <IconSelectorWindow onChoose={ this.handleIconChange }/>
                        : <React.Fragment/>
            }
        </React.Fragment>
    }
}

export default withTranslation("link-component")(IconSelector);

export const IconContainer = styled.div`
    background: #F3EFFF;
    border-radius: 16px;
    padding: 9px;
    width: 60px;
    height: 60px;
    cursor: pointer;
`;

export const ChangeIconText = styled.span`
    font-size: 16px;
    line-height: 24px;
    color: ${ props => props.theme.colors.primary };
    cursor: pointer;
`;


const Container = styled.div`
    display: flex;
    align-items: center;

    ${ IconContainer } {
        margin-right: 20px;
    }
`;

