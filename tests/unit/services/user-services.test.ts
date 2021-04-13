/// <reference types="@types/jest" />

import axiosRaw from "axios";
import UserService from "@/services/user-service";
import { user } from "../../data";
import ApiRoutes from "@/utils/api/routes";
import client from "@/utils/api/client";
import { deleteAllCookies } from "../../test-utils";

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
                success: true,
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

