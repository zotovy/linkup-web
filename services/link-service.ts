import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";
import client from "@/utils/api/client";

export default class LinkService {

    /// Create received link
    static async createLink(link: Link): Promise<CreateLinkResponse> {
        const body = {
            userId: AuthHelper.uid,
            title: link.title,
            subtitle: link.subtitle,
            href: link.href,
            iconName: link.iconName,
        }

        const res = await client.post(ApiRoutes.createLink, body);

        if (res.status === 200) return;

        switch (res.data?.error) {
            case "no-user-found-error":
                return CreateLinkError.noUserFound;
            case "validation-error":
                return CreateLinkError.validationError;
            default:
                return CreateLinkError.invalidError;
        }
    }
}

export type CreateLinkResponse = undefined | CreateLinkError;
export enum CreateLinkError {
    noUserFound,
    invalidError,
    validationError
}
