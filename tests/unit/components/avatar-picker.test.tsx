/// <reference types="@types/jest" />
import { fireEvent, cleanup, render } from "../../test-utils";
import '@testing-library/jest-dom';
import 'jest-styled-components'

import AvatarPicker, { Props } from "@/components/avatar-picker";


describe("Testing avatar picker component", () => {

    afterEach(cleanup);

    const props: Props = {
        profileImagePath: "https://avatars.githubusercontent.com/u/35657233?v=4",
        onPick: () => {},
    };


    test("should renders correctly", () => {
        const { asFragment } = render(<AvatarPicker { ...props }/>);

        expect(asFragment()).toMatchSnapshot();
    });

    test("should pick image", () => {
        let file: File | undefined;
        const targetFile: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

        const { getByTestId } = render(<AvatarPicker { ...props } onPick={(f) => file = f}/>);
        const input = getByTestId("input");

        // Act
        fireEvent.change(input, {
            target: { files: [targetFile] },
        });

        // Assert
        expect(file).toBeTruthy();
        expect(file?.name).toBe("chucknorris.png");
        expect(file?.type).toBe("image/png");

    });
});
