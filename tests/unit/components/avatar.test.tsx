/// <reference types="@types/jest" />
import { render } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components'

import AvatarComponent, { Props } from "@/components/avatar";
import { cleanup } from "@testing-library/react";


describe("Testing avatar component", () => {

    afterEach(cleanup);

    const props: Props = {
        profileImagePath: "https://avatars.githubusercontent.com/u/35657233?v=4"
    };


    test("should renders correctly", () => {
        const { asFragment } = render(<AvatarComponent { ...props }/>);
        expect(asFragment()).toMatchSnapshot();
    });

    test("should render placeholder", () => {
        const { getByTestId } = render(<AvatarComponent/>);
        expect(getByTestId("avatar")).toHaveStyle("background-image: url(\"/images/user-placeholder.png\");");
    });
});
