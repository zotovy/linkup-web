/// <reference types="@types/jest" />
import { render, screen } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components'

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
        const { asFragment } = render(<Button />);
        expect(asFragment()).toMatchSnapshot();
    });
});
