import EnvHelper from "@/helpers/env-helper";

export default class ApiRoutes {

    private static _baseRoute = EnvHelper.serverUrl;
    private static _apiVersion = "1.0";
    private static buildRoute = (route: string) => `${ApiRoutes._baseRoute}/api/${ApiRoutes._apiVersion}${route}`;

    static authenticate = ApiRoutes.buildRoute("/user/authenticate");
    static signup = ApiRoutes.buildRoute("/user");
    static updateToken = ApiRoutes.buildRoute("/user/reauthenticate");
    static getUserById = (id: number | string) => ApiRoutes.buildRoute(`/user/${id}`);
    static createLink = ApiRoutes.buildRoute("/link");
    static updateLink = (id: number | string) => ApiRoutes.buildRoute(`/link/${id}`);
    static removeLink = (id: number | string) => ApiRoutes.buildRoute(`/link/${id}`);
    static updateTheme = (id: number | string, theme: number | string) => ApiRoutes.buildRoute(`/user/${id}/theme/${theme}`);
    static updateUser = (id: number | string) => ApiRoutes.buildRoute(`/user/${id}`);
    static changeUserAvatar = (id: number | string) => ApiRoutes.buildRoute(`/user/${id}/change-profile-image`)
}
