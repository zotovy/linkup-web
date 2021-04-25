/// <reference types="@types/jest" />
import { render, cleanup, fireEvent } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components';

import LinkComponent, { Props } from "@/components/link";
import { link } from "../../data";

describe("Testing link component", () => {

    afterEach(cleanup);

    const props: Props = {
        link,
        remove: () => {
        },
        save: () => {
        },
        onChange: () => {
        },

    }

    test("should renders correctly", () => {
        const { asFragment } = render(<LinkComponent { ...props } />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("should renders correctly in edit mode", () => {
        const { asFragment, getByTestId } = render(<LinkComponent { ...props } />);
        const header = getByTestId("link-header");
        fireEvent.click(header);

        expect(asFragment()).toMatchSnapshot();
    });

    test("should change title", () => {
        const expectedLink = { ...props.link, title: "HEEEEY" };
        let link: Link | undefined;
        const changeLink = (l: Link) => link = l;

        // Arrange
        const { getByTestId, getByPlaceholderText, getByText } = render(
                <LinkComponent { ...props } save={ changeLink }/>
        );

        // Act
        fireEvent.click(getByTestId("link-header"));
        fireEvent.change(getByPlaceholderText("Title"), { target: { value: expectedLink.title } });
        fireEvent.click(getByText("Save"));

        // Assert
        expect(getByText(expectedLink.title)).toBeTruthy();
        expect(link).toEqual(expectedLink);
    });

    test("should change subtitle", () => {
        const expectedLink = { ...props.link, subtitle: "XD" };
        let link: Link | undefined;
        const changeLink = (l: Link) => link = l;

        // Arrange
        const { getByTestId, getByPlaceholderText, getByText } = render(
                <LinkComponent { ...props } save={ changeLink }/>
        );

        // Act
        fireEvent.click(getByTestId("link-header"));
        fireEvent.change(getByPlaceholderText("Subtitle"), { target: { value: expectedLink.subtitle } });
        fireEvent.click(getByText("Save"));

        // Assert
        expect(getByText(expectedLink.subtitle)).toBeTruthy();
        expect(link).toEqual(expectedLink);
    });

    test("should change href", () => {
        const expectedLink = { ...props.link, href: "https://vk.com/feed" };
        let link: Link | undefined;
        const changeLink = (l: Link) => link = l;

        // Arrange
        const { getByTestId, getByPlaceholderText, getByText } = render(
                <LinkComponent { ...props } save={ changeLink }/>
        );

        // Act
        fireEvent.click(getByTestId("link-header"));
        fireEvent.change(getByPlaceholderText("Link"), { target: { value: expectedLink.href } });
        fireEvent.click(getByText("Save"));

        // Assert
        expect(link).toEqual(expectedLink);
    });

    test("should change icon", () => {
        const expectedLink = { ...props.link, iconName: "logo-instagram" };
        let link: Link | undefined;
        const changeLink = (l: Link) => link = l;

        // Arrange
        const { getByTestId, getByPlaceholderText, getByText } = render(
                <LinkComponent { ...props } save={ changeLink }/>
        );

        // Act
        fireEvent.click(getByTestId("link-header"));
        fireEvent.click(getByTestId("link-icon-selector"));
        fireEvent.change(getByPlaceholderText("Enter your icon name"), { target: { value: "Instagram" } });
        fireEvent.click(getByTestId("icon-variant"));
        fireEvent.click(getByText("Save"));

        // Assert
        expect(link).toEqual(expectedLink);
    });

    test("should delete link", () => {
        let isDeleted = false;
        const deleteLink = () => isDeleted = true;

        // Arrange
        const { getByTestId, getByText } = render(
                <LinkComponent { ...props } remove={ deleteLink }/>
        );

        // Act
        fireEvent.click(getByTestId("link-header"));
        fireEvent.click(getByText("Delete"));

        // Assert
        expect(isDeleted).toEqual(true);
    });

    test("should validate link", () => {
        const wrongData = {
            title: "",
            subtitle: "",
            href: "loook at me",
        }
        let isSaved = false;
        const onSave = () => isSaved = true;
        const { getByPlaceholderText, getByTestId, getByText } = render(<LinkComponent { ...props } save={ onSave }/>)

        // Act
        fireEvent.click(getByTestId("link-header"));
        fireEvent.change(getByPlaceholderText("Title"), { target: { value: wrongData.title } });
        fireEvent.change(getByPlaceholderText("Subtitle"), { target: { value: wrongData.subtitle } });
        fireEvent.change(getByPlaceholderText("Link"), { target: { value: wrongData.href } });
        fireEvent.click(getByText("Save"));

        // Arrange
        expect(isSaved).toBe(false);
        expect(getByTestId("link-header")).toHaveAttribute("open");
        expect(getByPlaceholderText("Title")).toHaveStyle("border: 1.5px solid #ED2E7E;")
        expect(getByPlaceholderText("Subtitle")).toHaveStyle("border: 1.5px solid #ED2E7E;")
        expect(getByPlaceholderText("Link")).toHaveStyle("border: 1.5px solid #ED2E7E;")
    });
});
