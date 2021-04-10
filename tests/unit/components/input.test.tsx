/// <reference types="@types/jest" />
import { render } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components'

import Input, { Props } from "@/components/input";
import { cleanup } from "@testing-library/react";

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
