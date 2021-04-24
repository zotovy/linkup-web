import client from "@/utils/api/client";
import { link } from "../../data";
import LinkService, { ActionLinkError } from "@/services/link-service";
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
        expect(res).toBe(ActionLinkError.noUserFound);
    });

    test("should handle invalidError error", async () => {
        const data = {}
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.createLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.invalidError);
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
        expect(res).toBe(ActionLinkError.validationError);
    });

    test("should handle forbidden error", async () => {
        const data = {
            status: 403,
            data: {
                success: false,
                error: "forbidden",
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.createLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.Forbidden);
    });

});

describe("Test update link", () => {
    let axios: jest.SpyInstance;

    beforeAll(() => {
        const mockUid = jest.fn(() => 1);
        Object.defineProperty(AuthHelper, "uid", {
            get: mockUid,
        });
    });

    beforeEach(() => {
        axios = jest.spyOn(client, "put");
    })

    test("should update sample link", async () => {
        const data = {
            status: 200,
            data: {
                success: true,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.updateLink(link);

        // Assert
        expect(res).toBeUndefined();
        expect(axios).toBeCalledWith(
            ApiRoutes.updateLink(1),
            {
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
        const res = await LinkService.updateLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.noUserFound);
    });

    test("should handle invalidError error", async () => {
        const data = {}
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.updateLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.invalidError);
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
        const res = await LinkService.updateLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.validationError);
    });

    test("should handle forbidden error", async () => {
        const data = {
            status: 403,
            data: {
                success: false,
                error: "forbidden",
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.updateLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.Forbidden);
    });

});

describe("Test remove link", () => {
    let axios: jest.SpyInstance;

    beforeAll(() => {
        const mockUid = jest.fn(() => 1);
        Object.defineProperty(AuthHelper, "uid", {
            get: mockUid,
        });
    });

    beforeEach(() => {
        axios = jest.spyOn(client, "delete");
    })

    test("should remove sample link", async () => {
        const data = {
            status: 200,
            data: {
                success: true,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.removeLink(link);

        // Assert
        expect(res).toBeUndefined();
        expect(axios).toBeCalledWith(ApiRoutes.removeLink(1));
    });

    test("should remove sample link if I pass number", async () => {
        const data = {
            status: 200,
            data: {
                success: true,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.removeLink(link.id);

        // Assert
        expect(res).toBeUndefined();
        expect(axios).toBeCalledWith(ApiRoutes.removeLink(1));
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
        const res = await LinkService.removeLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.noUserFound);
    });

    test("should handle invalidError error", async () => {
        const data = {}
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.removeLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.invalidError);
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
        const res = await LinkService.removeLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.validationError);
    });

    test("should handle forbidden error", async () => {
        const data = {
            status: 403,
            data: {
                success: false,
                error: "forbidden",
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await LinkService.removeLink(link);

        // Assert
        expect(res).toBe(ActionLinkError.Forbidden);
    });
});
