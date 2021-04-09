/// <reference types="@types/jest" />
import { render, screen, ThemeWrapper } from "../../test-utils";
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

import Button from "@/components/button";
import { cleanup, fireEvent } from "@testing-library/react";


describe("Testing button component", () => {

    afterEach(cleanup);

    const props = {
        text: "hello there"
    }

    test("should handle click", () => {
        let value = false;
        const onSelect = () => value = !value;

        // Arrange
        const { getByText } = render(<Button onClick={onSelect}>{ props.text }</Button>);
        const component = screen.getByTestId("button");
        expect(getByText(props.text)).not.toBeFalsy();

        // Act
        fireEvent.click(component);

        // Assert
        expect(value).toBe(true);
    });

    test("should renders correctly", () => {
        const tree = renderer
                .create(<ThemeWrapper><Button>{ props.text }</Button></ThemeWrapper>)
                .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
