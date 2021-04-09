/// <reference types="@types/jest" />
import { render, screen, ThemeWrapper } from "../../test-utils";
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import 'jest-styled-components'

import ThemeComponent, { Props } from "@/components/theme";
import { cleanup, fireEvent } from "@testing-library/react";


describe("Testing theme component", () => {

    afterEach(cleanup);

    const props: Props = {
        isSelected: false,
        gradient: ["#3A3A60", "#19192F"],
        name: "Dark theme",
    };

    test("should select a theme", () => {
        let isSelected = false;
        const onSelect = () => isSelected = !isSelected;

        // Arrange
        const { rerender, getByText } = render(
                <ThemeComponent
                        { ...props }
                        isSelected={ isSelected }
                        onClick={ onSelect }/>
        );
        const component = screen.getByTestId("theme");
        expect(getByText(props.name)).toHaveStyle("font-weight: normal");

        // Act
        fireEvent.click(component);
        rerender(<ThemeComponent { ...props } isSelected={ isSelected } onClick={ onSelect }/>);

        // Assert
        expect(isSelected).toBe(true);
        expect(getByText(props.name)).toHaveStyle("font-weight: 500");
    });

    test("should renders correctly", () => {
        const tree = renderer
                .create(<ThemeWrapper><ThemeComponent { ...props }/></ThemeWrapper>)
                .toJSON();

        expect(tree).toMatchSnapshot();
    });

    test("should renders correctly as selected", () => {
        const tree = renderer
                .create(<ThemeWrapper><ThemeComponent { ...props } isSelected={ true }/></ThemeWrapper>)

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
