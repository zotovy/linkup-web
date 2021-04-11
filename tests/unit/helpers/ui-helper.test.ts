/// <reference types="@types/jest" />
import UiHelper from "@/helpers/ui-helper";

describe("Test formatIconToName", () => {

    test("should work", () => {
        const input = "LogoGithub";
        const expected = "logo-github";

        expect(UiHelper.formatIconToName(input)).toEqual(expected);
    });

    test("should work with multiple words", () => {
        const input = "LogoGithubHeyItsMeLol";
        const expected = "logo-github-hey-its-me-lol";

        expect(UiHelper.formatIconToName(input)).toEqual(expected);
    });

    test("should work with empty string", () => {
        const input = "";
        const expected = "";

        expect(UiHelper.formatIconToName(input)).toEqual(expected);
    });

    test("should work with undefined", () => {
        // @ts-ignore only for test
        const input: string = undefined;
        const expected = "";

        expect(UiHelper.formatIconToName(input)).toEqual(expected);
    });
});

describe("Test formatNameToIcon", () => {

    test("should work", () => {
        const input = "logo-github";
        const expected = "LogoGithub";

        expect(UiHelper.formatNameToIcon(input)).toEqual(expected);
    });

    test("should work with multiple dashes", () => {
        const input = "logo-github-hey-its-me-lol";
        const expected = "LogoGithubHeyItsMeLol";

        expect(UiHelper.formatNameToIcon(input)).toEqual(expected);
    });

    test("should work with empty string", () => {
        const input = "";
        const expected = "";

        expect(UiHelper.formatNameToIcon(input)).toEqual(expected);
    });

    test("should work with undefined", () => {
        // @ts-ignore only for test
        const input: string = undefined;
        const expected = "";

        expect(UiHelper.formatNameToIcon(input)).toEqual(expected);
    });
});
