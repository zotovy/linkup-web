/// <reference types="@types/jest" />

import axiosRaw from "axios";
import UserService from "@/services/user-service";
import { user } from "../../data";
import ApiRoutes from "@/utils/api/routes";
import client from "@/utils/api/client";
import { deleteAllCookies } from "../../test-utils";
import AuthHelper from "@/helpers/auth-helper";

// jest.mock(
//     "axios",
//     () => {
//         return {
//             post: jest.fn(),
//             default: jest.fn(),
//             create: jest.fn(() => ({
//                 get: jest.fn(),
//                 post: jest.fn(() => Promise.resolve({ data: { lol: 123, } })),
//                 interceptors: {
//                     request: { use: jest.fn(), eject: jest.fn() },
//                     response: { use: jest.fn(), eject: jest.fn() }
//                 }
//             }))
//         }
//     }
// );
// const axios = axiosRaw as jest.Mocked<typeof axiosRaw>;
// const axios = jest.genMockFromModule('axios') as jest.Mocked<typeof axiosRaw>;
// axios.create = jest.fn(() => axios);


const tokens = {
    access: "123.123.123",
    refresh: "456.456.456",
}

describe("Login user", () => {
    let axios: jest.SpyInstance;

    beforeEach(() => {
        axios = jest.spyOn(client, "post");
    })

    afterEach(() => {
        jest.clearAllMocks();
        deleteAllCookies();
    });

    test("should login user sample", async () => {
        // Arrange
        const data = {
            status: 200,
            data: {
                uid: user.id,
                tokens,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.loginUser(user.email, user.password);

        // Assert
        expect(res).toEqual("ok");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith(
            ApiRoutes.authenticate,
            {
                email: user.email,
                password: user.password,
            },
        );
        expect(document.cookie).toEqual(
            `accessToken=${tokens.access}; refreshToken=${tokens.refresh}; uid=${user.id}`
        );
    });

    test("should return 'invalid_credentials'", async () => {
        // Arrange
        const invalidEmail = "lol@mail.com";
        const data = {
            status: 404,
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.loginUser(invalidEmail, user.password);

        // Assert
        expect(res).toEqual("invalid_credentials");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith(
            ApiRoutes.authenticate,
            {
                email: invalidEmail,
                password: user.password,
            },
        );
        expect(document.cookie).toEqual("");
    });
});

describe("Signup user", () => {
    let axios: jest.SpyInstance;

    beforeEach(() => {
        axios = jest.spyOn(client, "post");
    })

    afterEach(() => {
        jest.clearAllMocks();
        deleteAllCookies();
    });

    test("should create user", async () => {
        // Arrange
        const data = {
            status: 200,
            data: {
                uid: user.id,
                tokens,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.signupUser(user);

        // Assert
        expect(res).toEqual("ok");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith(
            ApiRoutes.signup,
            user,
        );
        expect(document.cookie).toEqual(
            `accessToken=${tokens.access}; refreshToken=${tokens.refresh}; uid=${user.id}`
        );
    });

    test("shouldn't create user if user email uniqueness error", async () => {
        // Arrange
        const data = {
            status: 400,
            data: {
                success: true,
                error: "email-already-exists-error"
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.signupUser(user);

        // Assert
        expect(res).toEqual("email_not_unique_error");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith(
            ApiRoutes.signup,
            user,
        );
        expect(document.cookie).toEqual("");
    });

    test("shouldn't create user if username uniqueness error", async () => {
        // Arrange
        const data = {
            status: 400,
            data: {
                success: false,
                error: "username-already-exists-error"
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.signupUser(user);

        // Assert
        expect(res).toEqual("username_not_unique_error");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith(
            ApiRoutes.signup,
            user,
        );
        expect(document.cookie).toEqual("");
    });
});

describe("Test change theme", () => {
    let axios: jest.SpyInstance;

    beforeEach(() => {
        axios = jest.spyOn(client, "post");
    });

    beforeAll(() => {
        const mockUid = jest.fn(() => 1);
        Object.defineProperty(AuthHelper, "uid", {
            get: mockUid,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should change theme", async () => {
        // Arrange
        const data = {
            status: 200,
            data: {
                success: true,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeTheme(0);

        // Assert
        expect(res).toBeNull();
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toBeCalledWith(ApiRoutes.updateTheme(1, 0),);
    });

    test("should handle invalid-theme", async () => {
        // Arrange
        const data = {
            status: 400,
            data: {
                success: false,
                error: "invalid-theme"
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeTheme(0);

        // Assert
        expect(res).toEqual("invalid_theme");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toBeCalledWith(ApiRoutes.updateTheme(1, 0),);
    });

    test("should handle no-user-found-error", async () => {
        // Arrange
        const data = {
            status: 400,
            data: {
                success: false,
                error: "no-user-found-error"
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeTheme(0);

        // Assert
        expect(res).toEqual("no_user_found");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toBeCalledWith(ApiRoutes.updateTheme(1, 0),);
    });

    test("should handle forbidden", async () => {
        // Arrange
        const data = {
            status: 400,
            data: {
                success: false,
                error: "forbidden"
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeTheme(0);

        // Assert
        expect(res).toEqual("forbidden");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toBeCalledWith(ApiRoutes.updateTheme(1, 0),);
    });

    test("should handle invalid-error", async () => {
        // Arrange
        const data = {}
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeTheme(0);

        // Assert
        expect(res).toEqual("invalid_error");
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toBeCalledWith(ApiRoutes.updateTheme(1, 0),);
    });
});

describe("Test update user name", () => {
    let axios: jest.SpyInstance;

    beforeEach(() => {
        axios = jest.spyOn(client, "put");
    });

    beforeAll(() => {
        const mockUid = jest.fn(() => 1);
        Object.defineProperty(AuthHelper, "uid", {
            get: mockUid,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should change name", async () => {
        // Arrange
        const data = {
            status: 200,
            data: {
                success: true,
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeUserName(user);

        // Assert
        expect(res).toBeNull();
        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toBeCalledWith(
            ApiRoutes.updateUser(user.id),
            {
                name: user.name,
            }
            );
    });

    test("should handle validation-error", async () => {
        // Arrange
        const data = {
            status: 400,
            data: {
                success: false,
                error: "validation-error"
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeUserName(user);

        // Assert
        expect(res).toEqual("validation_error");
        expect(axios).toHaveBeenCalledTimes(1);
    });

    test("should handle forbidden", async () => {
        // Arrange
        const data = {
            status: 400,
            data: {
                success: false,
                error: "forbidden"
            }
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeUserName(user);

        // Assert
        expect(res).toEqual("forbidden");
        expect(axios).toHaveBeenCalledTimes(1);
    });

    test("should handle invalid-error", async () => {
        // Arrange
        const data = {}
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const res = await UserService.changeUserName(user);

        // Assert
        expect(res).toEqual("invalid_error");
        expect(axios).toHaveBeenCalledTimes(1);
    });
});

describe("Test setAvatar", () => {
    let axios: jest.SpyInstance;

    beforeEach(() => {
        axios = jest.spyOn(client, "post");
    });

    beforeAll(() => {
        const mockUid = jest.fn(() => 1);
        Object.defineProperty(AuthHelper, "uid", {
            get: mockUid,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should change pic", async () => {
        const data = {
            statusCode: 200,
            data: "https://domain.my/some-image.png",
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const targetFile: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const res = await UserService.setAvatar(targetFile);

        // Assert
        expect(res).toBe(data.data);
        expect(axios).toHaveBeenCalledTimes(1);

        const form = new FormData();
        form.append("image", targetFile);
        expect(axios).toBeCalledWith(
            ApiRoutes.changeUserAvatar(user.id),
            form
        );
    });

    test("should handle invalid-image-size-error", async () => {
        const data = {
            statusCode: 400,
            data: {
                success: false,
                error: "invalid-image-size-error"
            },
        }
        axios.mockImplementationOnce(() => Promise.resolve(data));

        // Act
        const targetFile: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const res = await UserService.setAvatar(targetFile);

        // Assert
        expect(res).toBe("invalid_size");
        expect(axios).toHaveBeenCalledTimes(1);
    });

    test("should handle invalid error", async () => {
        axios.mockImplementationOnce(() => undefined);

        // Act
        const targetFile: File = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const res = await UserService.setAvatar(targetFile);

        // Assert
        expect(res).toBe("invalid_error");
        expect(axios).toHaveBeenCalledTimes(1);
    });
});
