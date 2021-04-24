import Cookies from 'universal-cookie';


export default class AuthHelper {

    static get accessToken() {
        const cookies = new Cookies();
        return cookies.get("accessToken");
    }

    static set tokens(data: TokensBody) {
        const cookies = new Cookies();

        if (typeof window === "undefined") return;

        const opts = {
            expires: new Date(Date.now() + (10 * 365 * 24 * 60 * 60)),
            httpOnly: false,
        }

        cookies.set('accessToken', data.tokens.access, opts);
        cookies.set('refreshToken', data.tokens.refresh, opts);
        cookies.set('uid', data.uid, opts);
    }

    static get header() {
        if (typeof window === "undefined") return "";
        return `Bearer ${AuthHelper.accessToken}`;
    }

    static get tokensBody() {
        const cookies = new Cookies();

        return {
            tokens: {
                access: cookies.get("accessToken") as string,
                refresh: cookies.get("refreshToken") as string,
            },
            uid: cookies.get("uid") as string,
        }
    }

    static destroyTokens(): void {
        const cookies = new Cookies();
        cookies.remove("uid");
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
    }

    static get uid(): number {
        const cookies = new Cookies();
        return parseInt(cookies.get("uid") ?? "");
    }
}

export type TokensBody = {
    tokens: {
        access: string;
        refresh: string;
    },
    uid: string;
}
