import qs from "query-string";
import { styled } from "~/styled-system/jsx";
import { ExpectedError } from "~/components/expected-error";
import { Form } from "~/components/form";
import { ResultsSingle } from "~/components/results.single";
import { ResultsMultiple } from "~/components/results.multiple";
import { Alert } from "~/components/alert";
import { Divider } from "~/elements/divider";
import { isMultipleResult, isQueryError, isSingleResult, type QueryResponse } from "~/types/query";
import { cleanSearch } from "~/utils/cookies";
import { formatMacAddress } from "~/utils/format-mac";

import { query } from "../../actions";

import type { Metadata, NextPage } from "next";

export interface ResultPageProps {
    params: { mac: string };
}

export function generateMetadata(props: ResultPageProps) {
    const {
        params: { mac },
    } = props;
    const isValid = mac.length < 6;
    const title = isValid ? `oui results for ${formatMacAddress(mac)}` : "oui results";
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

async function getData(search: string): Promise<QueryResponse> {
    const m = cleanSearch(search);
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

    if (mac.length < 6) {
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
                <ResultsSingle search={mac} results={results} />
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
