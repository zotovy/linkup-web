export const user: User = {
    name: "Yaroslav Zotov",
    id: 1,
    email: "the1ime@yandex.ru",
    createdAt: new Date(),
    password: "12345678",
    theme: 0,
    links: [],
    profileImagePath: "https://sun9-70.userapi.com/impg/Afr3SX4BeAJzLemVyNMhHhr-5qvMlj1MedV0wA/5B6s0MBC6Y8.jpg?size=1728x2160&quality=96&sign=7a48ae45b2c91959995e58331fa10926&type=album"
}

export const link: Link = {
    createdAt: new Date(),
    href: "https://github.com/zotovY",
    iconName: "logo-github",
    id: 1,
    subtitle: "This is my github account",
    title: "Github",
    user: user,
}
