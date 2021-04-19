import Head  from "next/head";
import { NextPage } from "next";
import ErrorPageLayout from "@/layouts/error-page";

const Page404: NextPage = () => {
    return <ErrorPageLayout>
        <Head>
            <title>500 | LinkUp</title>
        </Head>
        <h1>500</h1>
        <span>Looks like something goes wrong... Can you try later please? :)</span>
    </ErrorPageLayout>;
}

export default Page404;
