import client from "@/utils/api/client";
import { link } from "../../data";
import LinkService, { CreateLinkError } from "@/services/link-service";
import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";

describe("Test create link", () => {
    let axios: jest.SpyInstance;

    beforeAll(() => {
        const mockUid = jest.fn(() => 1);
        Object.defineProperty(AuthHelper, "uid", {
            get: mockUid,
        });
    });

    beforeEach(() => {
        axios = jest.spyOn(client, "post");
    })

    test("should create sample link", async () => {
        const data = {
            status: 200,
            data: {
                success: true,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.createLink(link);

        // Assert
        expect(res).toBeUndefined();
        expect(axios).toBeCalledWith(
            ApiRoutes.createLink,
            {
                userId: 1,
                title: link.title,
                subtitle: link.subtitle,
                href: link.href,
                iconName: link.iconName
            }
        );
    });

    test("should handle noUserFound error", async () => {
        const data = {
            status: 403,
            data: {
                success: false,
                error: "no-user-found-error",
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.createLink(link);

        // Assert
        expect(res).toBe(CreateLinkError.noUserFound);
    });

    test("should handle invalidError error", async () => {
        const data = {}
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.createLink(link);

        // Assert
        expect(res).toBe(CreateLinkError.invalidError);
    });

    test("should handle validationError error", async () => {
        const data = {
            status: 403,
            data: {
                success: false,
                error: "validation-error",
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.createLink(link);

        // Assert
        expect(res).toBe(CreateLinkError.validationError);
    });

});
