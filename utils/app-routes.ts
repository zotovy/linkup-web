export default class AppRoutes {

    static homepage = "/";
    static signup = "/signup";
    static login = "/login";
    static error404 = "/404"
    static error500 = "/500"
    static links = "/admin?tab=links";
    static theme = "/admin?tab=theme";
    static settings = "/admin?tab=settings";
    static userPage = (username: string | number) => `/${username}`;

    static authorLinks = {
        instagram: "https://www.instagram.com/_zotovy/"
    }
}
