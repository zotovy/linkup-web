declare type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    profileImagePath?: string;
    theme: Theme;
    links: Link[];
    username: string;
}
