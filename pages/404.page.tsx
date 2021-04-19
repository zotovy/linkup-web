import Head  from "next/head";
import { NextPage } from "next";
import ErrorPageLayout from "@/layouts/error-page";

const Page404: NextPage = () => {
    return <ErrorPageLayout>
        <Head>
            <title>404 | LinkUp</title>
        </Head>
        <h1>404</h1>
        <span>We looked everywhere but couldn't find this page. Is this a mistake?</span>
    </ErrorPageLayout>;
}

export default Page404;
