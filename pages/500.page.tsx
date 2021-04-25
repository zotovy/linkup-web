import Head  from "next/head";
import { GetStaticPropsContext, NextPage } from "next";
import ErrorPageLayout from "@/layouts/error-page";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page500: NextPage = () => {
    const { t } = useTranslation("error-pages");

    return <ErrorPageLayout>
        <Head>
            <title>500 | LinkUp</title>
        </Head>
        <h1>500</h1>
        <span>{ t("500") }</span>
    </ErrorPageLayout>;
}

export default Page500;

// Used only for translation
export const getStaticProps = async (args: GetStaticPropsContext) => {
    return {
        props: {
            ...await serverSideTranslations(args.locale as string, ["error-pages"]),
        }
    };
}
