import qs from "query-string";
import { styled } from "~/styled-system/jsx";
import { Form } from "~/components/form";
import { ResultsSingle } from "~/components/results.single";
import { ResultsMultiple } from "~/components/results.multiple";
import { Divider } from "~/elements/divider";
import { Alert } from "~/components/alert";
import { ExpectedError } from "~/components/expected-error";
import { query } from "../../actions";
import { cleanSearch } from "~/utils/cookies";
import { isMultipleResult, isQueryError, isSingleResult, type QueryResponse } from "~/types/query";
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

async function getData(search: string[]): Promise<QueryResponse> {
    const clean = search.map(cleanSearch);
    const m = clean.join(",");
    const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/query`,
        query: { m },
    });
    const res = await fetch(url);
    const results = await res.json();
    return results as QueryResponse;
}

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

    const results = await getData(mac);
    return (
        <Form action={query} width={{ base: "100%", md: "fit-content" }}>
            {isQueryError(results) ? (
                <ExpectedError title="Error" message={results.error} hideBackButton />
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
