import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import styled from "styled-components";
import { link } from "../stories/data";
import PhonePreviewContainer from "@/components/phone-preview";
import Button from "@/components/button";
import { LogoYoutube } from "react-ionicons";

const user: User = {
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
    return <React.Fragment>
        <Head><title>Linkup | The best link tool</title></Head>
        <Page>
            <section className="main">
                <h1>Only One Link For Your Need</h1>
                <p className="subtitle">
                    Create a link with all your contacts inside.
                </p>
                <Button>Get started</Button>
                <div className="phone-container">
                    <PhonePreviewContainer {...user} />
                    <div className="card tiktok"><img src="/icons/tiktok.png" alt=""/></div>
                    <div className="card instagram"><img src="/icons/instagram.png" alt=""/></div>
                    <div className="card youtube"><img src="/icons/youtube.png" alt=""/></div>
                    <div className="card vk"><img src="/icons/vk.png" alt=""/></div>
                </div>
            </section>
        </Page>
    </React.Fragment>;
}

export default PromoPage;

const fade = `animation: fadeAnim 1s ease; animation-fill-mode: both;`;

const Page = styled.main`
    width: 100%;
    height: 100%;

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

    section.main {
        margin-top: 200px;
        display: flex;
        align-items: center;
        flex-direction: column;

        h1 {
            ${ fade };
            font-size: 56px;
            font-weight: 500;
            margin-bottom: 20px;
        }

        p.subtitle {
            font-size: 24px;
            color: ${ props => props.theme.colors.text.secondary };
            ${ fade };
            animation-delay: 300ms;
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

        .phone-container {
            margin-top: 120px;
            position: relative;

            .card {
                position: absolute;
                width: 100px;
                height: 100px;
                border-radius: 30px;
                box-shadow: 0 3px 20px rgba(17, 3, 34, 0.07);
                display: flex;
                align-items: center;
                justify-content: center;
                ${fade};
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
`;
