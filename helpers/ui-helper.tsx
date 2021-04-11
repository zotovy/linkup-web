import React from "react";
import { Slide, toast } from "react-toastify";
import themeStyles from "@/utils/theme";

export default class UiHelper {

    static showToast(message: string) {
        toast.error(
                message,
                {
                    closeButton: () => <React.Fragment/>,
                    transition: Slide,
                    hideProgressBar: true,
                    position: "bottom-center",
                }
        );
    }

    static getThemedStyles(theme: Theme): ThemedStyles {
        if (theme === 0)  return  {
            text: {
                primary: themeStyles.colors.text.primary,
                secondary: themeStyles.colors.text.secondary,
            },
            bg: {
                primary: themeStyles.colors.bg,
                secondary: "#FFFFFF",
                hover: "#fEfEfE",
            },
        };

        return {
            text: {
                primary: "#e9e9eb",
                secondary: "#7a7c95",
            },
            bg: {
                primary: "#14142b",
                secondary: "rgba(255, 255, 255, 0.03)",
                hover: "rgba(255, 255, 255, 0.04)",
            },
        };
    }

    /// Formats to react-ionicons icon name
    /// logo-github --> LogoGithub
    static formatNameToIcon(icon: string) {
        if (!icon) return "";
        icon = icon.split("-").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join("")
        return icon;
    }

    /// Formats react-ionicons to domain icon name
    /// LogoGithub --> logo-github
    static formatIconToName(icon: string) {
        if (!icon) return "";

        const arr = [];
        let lastI = 0;

        for (let i = 1; i < icon.length; i++) {
            if (icon[i].toUpperCase() == icon[i]) {
                arr.push(icon.slice(lastI, i).toLowerCase());
                lastI = i
            }
        }
        arr.push(icon.substr(lastI).toLowerCase());
        return arr.join("-");
    }
}

export type ThemedStyles = {
    text: {
        primary: string,
        secondary: string,
    },
    bg: {
        primary: string,
        secondary: string,
        hover: string;
    },
}
