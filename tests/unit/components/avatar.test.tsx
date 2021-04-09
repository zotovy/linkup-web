/// <reference types="@types/jest" />
import { ThemeWrapper } from "../../test-utils";
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

import AvatarComponent, { Props } from "@/components/avatar";
import { cleanup } from "@testing-library/react";


describe("Testing avatar component", () => {

    afterEach(cleanup);

    const props: Props = {
        profileImagePath: "https://avatars.githubusercontent.com/u/35657233?v=4"
    };


    test("should renders correctly", () => {
        const tree = renderer
                .create(<ThemeWrapper><AvatarComponent { ...props }/></ThemeWrapper>)
                .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
