/// <reference types="@types/jest" />
import { render } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components'

import Input, { Props } from "@/components/input";
import PasswordInput from "@/components/input/password";
import ErrorInput from "@/components/input/error";
import { cleanup, fireEvent } from "@testing-library/react";

describe("Testing input component", () => {

    afterEach(cleanup);

    const props: Props = {
        placeholder: "Hello my friend!",
    }

    /**
     * No need for testing onClick and so one props
     * because Input component is pure styled component
     * I'm sure about the libraries I use and do not
     * consider it necessary to rewrite the tests of
     * the styled command
     */

    test("should renders correctly", () => {
        const { asFragment } = render(<Input { ...props } />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("should renders correctly with error", () => {
        const { asFragment } = render(<Input { ...props } error={true} />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Test password input", () => {
    afterEach(cleanup);

    test("should renders correctly", () => {
        const { asFragment } = render(<PasswordInput />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("show password button should work", () => {
        const { getByTestId, getByRole } = render(<PasswordInput data-testid="password" />);

        const input = getByTestId("password");
        const button = getByRole("img");
        expect(button).toHaveAttribute("src", "/icons/closed-eye.png")

        // Act
        fireEvent.input(input, "my password 123");
        expect(input).toHaveStyle("letter-spacing: 7px");
        fireEvent.click(button);
        expect(input).toHaveStyle("letter-spacing: initial");
        expect(button).toHaveAttribute("src", "/icons/open-eye.png");

        fireEvent.click(button);
        expect(input).toHaveStyle("letter-spacing: 7px");
        expect(button).toHaveAttribute("src", "/icons/closed-eye.png")
    });
});

describe("Test input with error label", () => {
    test("should renders correctly with error", () => {
        const { asFragment } = render(<ErrorInput error="This field is required"/>);
        expect(asFragment()).toMatchSnapshot();
    });

    test("should renders correctly without", () => {
        const { asFragment } = render(<ErrorInput/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
