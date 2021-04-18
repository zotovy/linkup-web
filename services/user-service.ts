import client from "@/utils/api/client";
import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";
import { FormValues } from "../pages/signup.page";

export default class UserService {

    static async loginUser(email: string, password: string): Promise<LoginResponse> {
        const response = await client.post(ApiRoutes.authenticate, { email, password });
        if (response.status !== 200) {
            if (response.status === 404) return "invalid_credentials";
            return "invalid_error";
        }

        // save tokens
        AuthHelper.tokens = response.data;
        return "ok";
    }

    static async signupUser(data: User | FormValues): Promise<SignupResponse> {
        const response = await client.post(ApiRoutes.signup, data);
        if (response.status !== 200) {
            if (response.status === 400) {
                if (response.data.error === "email-already-exists-error") return "email_not_unique_error";
                if (response.data.error === "username-already-exists-error") return "username_not_unique_error";
                return "invalid_error";
            }
        }

        // save tokens
        AuthHelper.tokens = response.data;
        return "ok";
    }

    static async fetchUser(id: number): Promise<User | null> {
        const response = await client.get(ApiRoutes.getUserById(id));
        if (response.status !== 200 || !response.data) return null;
        return response.data;
    }

    static async changeTheme(theme: Theme): Promise<ChangeThemeResponse> {
        const response = await client.post(ApiRoutes.updateTheme(AuthHelper.uid, theme));
        if (response.status === 200) return null;

        switch (response.data?.error) {
            case "invalid-theme":
                return "invalid_theme";
            case "no-user-found-error":
                return "no_user_found";
            case "forbidden":
                return "forbidden";
            default:
                return "invalid_error";
        }
    }

    static async changeUserName(user: User | { id: number | string, name: string }): Promise<SaveUserResponse> {
        const response = await client.put(ApiRoutes.updateUser(user.id), {
            name: user.name
        });
        if (response.status === 200) return null;

        switch (response.data?.error) {
            case "validation-error":
                return "validation_error";
            case "forbidden":
                return "forbidden";
            default:
                return "invalid_error";
        }
    }

    static async setAvatar(id: number, file: File): Promise<SetAvatarResponse> {
        const form = new FormData();
        form.append("image", file);
        const response = await client.post(ApiRoutes.changeUserAvatar(id), form);

        if (typeof response?.data === "string") return response.data;
        if (response?.data?.error === "invalid-image-size-error") return "invalid_size"
        return "invalid_error";
    }
}

type ApiValidationError = {
    path: string;
    error: string;
    message?: string;
}
export type LoginResponse = "ok" | "invalid_credentials" | "invalid_error";
export type SignupResponse = "ok" | "email_not_unique_error" | "username_not_unique_error" | "invalid_error";
export type SetAvatarResponse = string | "invalid_size" | "invalid_error";
export type UpdateUserResponse =
    "ok"
    | "email_not_unique_error"
    | "email_format_error"
    | "name_too_long"
    | "invalid_error";
export type ChangeThemeResponse =
    null
    | "invalid_theme"
    | "forbidden"
    | "invalid_error"
    | "no_user_found"
    | "validation_error";
export type SaveUserResponse = null | "validation_error" | "forbidden" | "invalid_error";
