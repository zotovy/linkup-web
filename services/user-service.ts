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

    // static async setAvatar(id: number, file: File): Promise<SetAvatarResponse> {
    //     const form = new FormData();
    //     form.append("image", file);
    //     const response = await client.post(ApiRoutes.changeUserAvatar(id), form);
    //
    //     if (typeof response.data === "string") return "ok";
    //     if (response.data.error === "invalid-image-size-error") return "invalid_size"
    //     return "invalid_error";
    // }

    // static async updateUser(id: number, data: User | { email?: string, password?: string }): Promise<UpdateUserResponse> {
    //     const response = await client.put(ApiRoutes.updateUser(id), data);
    //
    //     if (response.status === 200) return "ok";
    //     if (response.data.errors) {
    //         const errors = response.data.errors as ApiValidationError[];
    //         if (errors.find(x => x.path === "name")) return "name_too_long";
    //         if (errors.find(x => x.path === "email")) return "email_format_error";
    //         return "invalid_error";
    //     }
    //     if (response.data.error === "email-unique-error") return "email_not_unique_error";
    //     return "invalid_error";
    // }
}

type ApiValidationError = {
    path: string;
    error: string;
    message?: string;
}
export type LoginResponse = "ok" | "invalid_credentials" | "invalid_error";
export type SignupResponse = "ok" | "email_not_unique_error" | "username_not_unique_error" | "invalid_error";
export type SetAvatarResponse = "ok" | "invalid_size" | "invalid_error";
export type UpdateUserResponse = "ok" | "email_not_unique_error" | "email_format_error" | "name_too_long" | "invalid_error";
