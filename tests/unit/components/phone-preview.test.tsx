/// <reference types="@types/jest" />
import { render } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components';

import PhonePreview, { Props } from "@/components/phone-preview";
import { cleanup } from "@testing-library/react";
import { user } from "../../data";

describe("Testing PhonePreview component", () => {

    afterEach(cleanup);

    const props: Props = user;

    test("should renders correctly", () => {
        const { asFragment } = render(<PhonePreview { ...props } />);
        expect(asFragment()).toMatchSnapshot();
    });
});
