import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import styled from "styled-components";
import { link } from "../stories/data";
import PhonePreviewContainer from "@/components/phone-preview";
import Button from "@/components/button";
import AuthHelper from "@/helpers/auth-helper";
import { useRouter } from "next/router";

const user: User = {
    username: "zotovy",
    name: "Yaroslav Zotov",
    id: 1,
    email: "the1ime@yandex.ru",
    createdAt: new Date(),
    password: "12345678",
    theme: 0,
    links: [
        link,
        {
            ...link,
            title: "Instagram",
            subtitle: "My main IG account",
            href: "https://www.instagram.com/_zotovy/",
            iconName: "logo-instagram",
        },
        {
            ...link,
            title: "Vk",
            subtitle: "Me on vk.com",
            href: "https://vk.com/zotovy",
            iconName: "logo-vk",
        },
    ],
    profileImagePath: "https://sun9-70.userapi.com/impg/Afr3SX4BeAJzLemVyNMhHhr-5qvMlj1MedV0wA/5B6s0MBC6Y8.jpg?size=1728x2160&quality=96&sign=7a48ae45b2c91959995e58331fa10926&type=album"
}

const PromoPage: NextPage = () => {
    const router = useRouter();

    const handleStart = () => {
        const authorized = !isNaN(AuthHelper.uid);
        if (authorized) router.push("/admin");
        else router.push("/signup");
    }

    return <React.Fragment>
        <Head><title>Linkup | The best link tool</title></Head>
        <Page>
            <section className="main">
                <h1>Only One Link For Your Need</h1>
                <p className="subtitle">
                    Create a link with all your contacts inside.
                </p>
                <Button onClick={ handleStart }>Get started</Button>
                <div className="phone-container">
                    <PhonePreviewContainer { ...user } />
                    <div className="card tiktok"><img src="/icons/tiktok.png" alt=""/></div>
                    <div className="card instagram"><img src="/icons/instagram.png" alt=""/></div>
                    <div className="card youtube"><img src="/icons/youtube.png" alt=""/></div>
                    <div className="card vk"><img src="/icons/vk.png" alt=""/></div>
                </div>
            </section>
            <section className="advantage first-advantage">
                <div className="info">
                    <h3 className="title">One link for everything</h3>
                    <p>
                        Create your LinkUp link and use it everywhere.
                        There's no need to remember every social media
                        account, just use LinkUp!
                    </p>
                </div>
                <div className="preview">
                    <img src="/images/promo-2.png" alt="promo"/>
                </div>
            </section>
            <section className="advantage second-advantage">
                <div className="info">
                    <h3 className="title">Convenient for your subscribers</h3>
                    <p>
                        You can put anything your subscribers might
                        try to find on your link page.
                        It is very good if everything is in one place.
                    </p>
                </div>
                <div className="preview">
                    <img src="/images/promo-1.png" alt="promo"/>
                </div>
            </section>
            <section className="advantage third-advantage">
                <div className="info">
                    <h3 className="title">Easily to customize</h3>
                    <p>
                        Intuitive link builder make your life much easily.
                        Just enter link and choose one of beautiful themes
                    </p>
                </div>
                <div className="preview">
                    <img src="/images/promo-3.png" alt="promo"/>
                </div>
            </section>
            <section className="final">
                <h2>Start using LinkUp now!</h2>
                <Button onClick={ handleStart }>Get started</Button>
            </section>
        </Page>
    </React.Fragment>;
}

export default PromoPage;

const fade = `animation: fadeAnim 1s ease; animation-fill-mode: both;`;

const Page = styled.main`
    width: 100%;
    height: 100%;
    padding: 20px;

    @keyframes fadeAnim {
        from {
            transform: translateY(100%);
            opacity: 0;
        }

        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .button {
        ${ fade };
        animation-delay: 400ms;
        margin-top: 35px;

        button {
            padding: 18px 40px;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            border-radius: 16px;
        }
    }

    h1, h2 {
        ${ fade };
        font-size: 56px;
        font-weight: 500;
        margin-bottom: 20px;
        text-align: center;
        
        @media screen and (max-width: 960px) {
            font-size: 42px;
        }
    }

    section.main {
        margin-top: 200px;
        display: flex;
        align-items: center;
        flex-direction: column;

        p.subtitle {
            font-size: 24px;
            color: ${ props => props.theme.colors.text.secondary };
            ${ fade };
            animation-delay: 300ms;
            text-align: center;

            @media screen and (max-width: 960px) {
                font-size: 18px;
            }
        }

        .phone-container {
            margin-top: 120px;
            position: relative;
            
            @media screen and (max-width: 960px) {
                transform: scale(0.75);
            }

            .card {
                position: absolute;
                width: 100px;
                height: 100px;
                border-radius: 30px;
                box-shadow: 0 3px 20px rgba(17, 3, 34, 0.07);
                display: flex;
                align-items: center;
                justify-content: center;
                ${ fade };
                animation-delay: 300ms;

                &.youtube {
                    top: 50px;
                    left: -63px;
                    background-color: #FF0000;
                }

                &.tiktok {
                    bottom: 180px;
                    right: -30px;
                    background-color: white;
                    animation-delay: 350ms;
                }

                &.instagram {
                    top: 125px;
                    left: -20px;
                    background-color: white;
                    animation-delay: 360ms;
                }

                &.vk {
                    bottom: 30px;
                    left: -55px;
                    background-color: #4F82B9;
                    animation-delay: 375ms;
                }
            }
        }
    }

    section.advantage {
        display: flex;
        max-width: 1200px;
        margin: 0 auto;
        justify-content: space-between;

        .info {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 30px;

            .title {
                font-size: 24px;
                font-weight: 500;
                color: #111;
                margin-bottom: 10px;
            }

            p {
                font-size: 20px;
                color: ${ props => props.theme.colors.text.secondary };
            }
        }

        .preview {
            width: 500px;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            img {
                max-width: 100%;
            }

            @media screen and (max-width: 960px) {
                max-width: calc(100vw - 40px);
            }
        }

        @media screen and (max-width: 960px) {
            flex-direction: column !important;

            .info {
                width: 100%;
                text-align: center;
                margin: 0 !important;
            }
        }

        &.first-advantage {
            margin-top: 250px;

            .preview {
                display: flex;
                align-items: center;

                img {
                    width: 100%;
                }
            }
        }

        &.second-advantage {
            margin-top: 75px;
            flex-direction: row-reverse;

            .info {
                margin-right: 0;
                margin-left: 30px;
            }

            .preview {
                display: flex;
                align-items: center;
                padding: 15px;

                img {
                    width: 100%;
                }
            }
        }

        &.third-advantage {
            margin-top: 100px;
        }
    }

    section.final {
        display: flex;
        flex-direction: column;
        max-width: 1200px;
        margin: 250px auto 200px;
        align-items: center;
    }
`;
