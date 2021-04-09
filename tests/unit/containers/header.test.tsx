/// <reference types="@types/jest" />
import { render, cleanup, fireEvent } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components';

import Header, { Props } from "@/containers/header";
import { user } from "../../data";

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
    query: { tab: 'settings' },
}))

describe("Testing Header component", () => {
    afterEach(cleanup);

    const props: Props = {
        user,
    };

    test("should render correctly authorized", () => {
        const { asFragment } = render(<Header { ...props } />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("should render correctly loading", () => {
        const { asFragment } = render(<Header loading={true} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("should show user window", () => {
        // Arrange
        const { getByTestId } = render(<Header { ...props } />);
        expect(getByTestId("user-modal-in-header")).toHaveStyle("transform: translateX(-50px)");
        expect(getByTestId("user-modal-in-header")).toHaveStyle("opacity: 0;");
        expect(getByTestId("user-modal-in-header")).toHaveStyle("pointer-events: none;");

        // Act
        const userInHeader = getByTestId("user-in-header");
        fireEvent.click(userInHeader);

        // Assert
        expect(getByTestId("user-modal-in-header")).toHaveStyle("transform: translateX(0)");
        expect(getByTestId("user-modal-in-header")).toHaveStyle("opacity: 1;");
        expect(getByTestId("user-modal-in-header")).not.toHaveStyle("pointer-events: none;");

        // Act 2
        fireEvent.click(userInHeader);

        // Assert
        expect(getByTestId("user-modal-in-header")).toHaveStyle("transform: translateX(-50px)");
        expect(getByTestId("user-modal-in-header")).toHaveStyle("opacity: 0;");
        expect(getByTestId("user-modal-in-header")).toHaveStyle("pointer-events: none;");

        // TODO: test click "My page" & "Logout"
    });

    test("should show mobile menu slide", () => {
        // Arrange
        const { getByTestId } = render(<Header { ...props } />);
        expect(getByTestId("mobile-slide-slide")).toHaveStyle("transform: translateX(100%)");

        // Act
        const burger = getByTestId("burger-menu");
        fireEvent.click(burger);

        // Assert
        expect(getByTestId("mobile-slide-slide")).toHaveStyle("transform: translateX(0)");

        // Act 2
        fireEvent.click(burger);

        // Assert 2
        expect(getByTestId("mobile-slide-slide")).toHaveStyle("transform: translateX(100%)");
    });
});
