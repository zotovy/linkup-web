import React from "react";
import Head from "next/head";
import { GetStaticPropsContext, NextPage } from "next";
import styled from "styled-components";
import { link } from "../stories/data";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PhonePreviewContainer from "@/components/phone-preview";
import AuthHelper from "@/helpers/auth-helper";
import Button from "@/components/button";
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
    const { t } = useTranslation("promo");

    const handleStart = () => {
        const authorized = !isNaN(AuthHelper.uid);
        if (authorized) router.push("/admin");
        else router.push("/signup");
    }

    return <React.Fragment>
        <Head><title>{ t("title") }</title></Head>
        <Page>
            <section className="main">
                <h1>{ t("main_title") }</h1>
                <p className="subtitle">{ t("main_subtitle") }</p>
                <Button onClick={ handleStart }>{ t("button_text") }</Button>
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
                    <h3 className="title">{ t("adv1_title") }</h3>
                    <p>{ t("adv1_subtitle") }</p>
                </div>
                <div className="preview">
                    <img src="/images/promo-2.png" alt="promo"/>
                </div>
            </section>
            <section className="advantage second-advantage">
                <div className="info">
                    <h3 className="title">{ t("adv2_title") }</h3>
                    <p>{ t("adv2_subtitle") }</p>
                </div>
                <div className="preview">
                    <img src="/images/promo-1.png" alt="promo"/>
                </div>
            </section>
            <section className="advantage third-advantage">
                <div className="info">
                    <h3 className="title">{ t("adv3_title") }</h3>
                    <p>{ t("adv3_subtitle") }</p>
                </div>
                <div className="preview">
                    <img src="/images/promo-3.png" alt="promo"/>
                </div>
            </section>
            <section className="final">
                <h2>{ t("footer_title") }</h2>
                <Button onClick={ handleStart }>{ t("button_text") }</Button>
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

// Used only for translation
export const getStaticProps = async (args: GetStaticPropsContext) => {
    return {
        props: {
            ...await serverSideTranslations(args.locale as string, ["promo"]),
        }
    };
}
