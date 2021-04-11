import React from "react";
import styled from "styled-components";
import * as iconsRaw from "react-ionicons";
import theme from "@/utils/theme";
import Input from "@/components/input";

export type Props = {
    onChoose: (iconName: string) => any;
}
type State = {
    search?: string;
}

class IconSelectorWindow extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.isIconSuitableForShow = this.isIconSuitableForShow.bind(this);
    }

    state: State = {
        search: "",
    }

    handleSelection = (icon: string) => this.props.onChoose(icon);

    handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        let search: string | undefined = e.target.value.toLowerCase();
        if (search === "") search = undefined;
        this.setState({ ...this.state, search });
    }

    isIconSuitableForShow(iconName: string): boolean {
        if (!this.state.search) return true;
        iconName = iconName.toLowerCase();
        return iconName.includes(this.state.search);
    }

    render() {
        const icons = Object.keys(iconsRaw);

        return <Container>
            <Window className="scrollable">
                <Input onChange={ this.handleSearch } placeholder="Enter your icon name"/>
                <IconsGrid>
                    {
                        icons.map(e => {
                            if (!this.isIconSuitableForShow(e)) return <React.Fragment key={ e }/>

                            // @ts-ignore because react-icons have badly support ts
                            const Icon = iconsRaw[e];
                            return <IconContainer
                                    key={ e }
                                    data-testid="icon-variant"
                                    onClick={ () => this.handleSelection(e) }>
                                <Icon
                                        style={ { marginTop: "8px" } }
                                        color={ theme.colors.primary }
                                        width="48px"/>
                            </IconContainer>;
                        })
                    }
                </IconsGrid>
            </Window>
        </Container>
    }
}

const Window = styled.div`
    margin: 20px;
    pointer-events: all;
    width: 100%;
    height: 100%;
    max-width: 776px;
    max-height: 500px;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    overflow-y: scroll;
    transition: transform 200ms ease;

    ${ Input } {
        margin-bottom: 20px;
    }
`

const IconsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 64px);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
`;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.1);
    transition: opacity 250ms;
`;

const IconContainer = styled.div`
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${ props => props.theme.colors.lightPrimary };
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 100ms ease;

    &:hover {
        background-color: ${ props => props.theme.colors.lightPrimaryHover };
    }
`

export default IconSelectorWindow;
