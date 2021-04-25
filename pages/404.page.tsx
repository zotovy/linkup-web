import Head  from "next/head";
import { GetStaticPropsContext, NextPage } from "next";
import ErrorPageLayout from "@/layouts/error-page";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page404: NextPage = () => {
    const { t } = useTranslation("error-pages");

    return <ErrorPageLayout>
        <Head>
            <title>404 | LinkUp</title>
        </Head>
        <h1>404</h1>
        <span>{ t("404") }</span>
    </ErrorPageLayout>;
}

export default Page404;

// Used only for translation
export const getStaticProps = async (args: GetStaticPropsContext) => {
    return {
        props: {
            ...await serverSideTranslations(args.locale as string, ["error-pages"]),
        }
    };
}
