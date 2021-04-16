import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";
import client from "@/utils/api/client";

export default class LinkService {

    private static _handleError(data: any): ActionLinkError {
        switch (data?.error) {
            case "no-user-found-error":
                return ActionLinkError.noUserFound;
            case "validation-error":
                return ActionLinkError.validationError;
            case "forbidden":
                return ActionLinkError.Forbidden
            default:
                return ActionLinkError.invalidError;
        }
    }

    /// Create received link
    static async createLink(link: Link): Promise<ActionLinkResponse> {
        const body = {
            userId: AuthHelper.uid,
            title: link.title,
            subtitle: link.subtitle,
            href: link.href,
            iconName: link.iconName,
        }

        const res = await client.post(ApiRoutes.createLink, body);

        if (res.status === 200) return;
        return LinkService._handleError(res.data);
    }

    static async updateLink(link: Link): Promise<ActionLinkResponse> {
        const body = {
            title: link.title,
            subtitle: link.subtitle,
            href: link.href,
            iconName: link.iconName,
        }

        const res = await client.put(ApiRoutes.updateLink(link.id), body);

        if (res.status === 200) return;
        return LinkService._handleError(res.data);
    }
}

export type ActionLinkResponse = undefined | ActionLinkError;
export enum ActionLinkError {
    noUserFound,
    invalidError,
    validationError,
    Forbidden
}
