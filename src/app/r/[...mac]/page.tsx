import { styled } from "~/styled-system/jsx";
import { Form } from "~/components/form";
import { ResultsSingle } from "~/components/results.single";
import { ResultsMultiple } from "~/components/results.multiple";
import { Divider } from "~/elements/divider";
import { Alert } from "~/components/alert";
import { ExpectedError } from "~/components/expected-error";
import { query } from "../../actions";
import { getMultiple } from "~/utils/get-data";
import { isMultipleResult, isQueryError, isSingleResult } from "~/types/query";
import type { Metadata, NextPage } from "next";

export interface ResultPageProps {
    params: { mac: string[] };
}

export function generateMetadata(props: ResultPageProps) {
    const {
        params: { mac },
    } = props;
    const isValid = mac.every((m) => m.length >= 6);
    const title = isValid ? `oui results for ${mac.length} addresses` : "oui results";
    const metadata: Metadata = {
        title,
        description: "MAC Address Vendor Lookup",
        metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
        openGraph: {
            title,
            description: "MAC Address Vendor Lookup",
            siteName: "oui",
            type: "website",
            url: process.env.NEXT_PUBLIC_BASE_URL,
        },
    };
    return metadata;
}

const Lead = styled("div", {
    base: {
        textTransform: "uppercase",
        fontSize: "xs",
        color: "fg.muted",
        fontWeight: "bold",
    },
});

const Page: NextPage<ResultPageProps> = async (props) => {
    const {
        params: { mac },
    } = props;

    const isValid = mac.every((m) => m.length >= 6);
    if (!isValid) {
        return (
            <ExpectedError title="Invalid Search" message="At least 6 characters are required." />
        );
    }

    console.log(mac);

    const results = await getMultiple(mac);
    return (
        <Form action={query} width={{ base: "100%", md: "fit-content" }}>
            {isQueryError(results) ? (
                <ExpectedError title="Error" message={results.error} hideBackButton isServerError />
            ) : isSingleResult(results) ? (
                <ResultsSingle search={mac[0]} results={results} />
            ) : isMultipleResult(results) ? (
                <ResultsMultiple results={results} />
            ) : (
                <Alert title="No Results Found" />
            )}
            <Divider mx="-6" />
            <Lead>Search Again</Lead>
        </Form>
    );
};

export default Page;
