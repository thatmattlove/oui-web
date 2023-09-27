import qs from "query-string";
import { styled, Stack } from "~/styled-system/jsx";
import { Form } from "~/components/form";
import { ResultsSingle } from "~/components/results.single";
import { ResultsMultiple } from "~/components/results.multiple";
import { Divider } from "~/elements/divider";
import { Icon } from "~/elements/icon";
import { Alert } from "~/elements/alert";
import { ExpectedError } from "~/components/expected-error";
import { WarningIcon } from "~/icons/warning";
import { query } from "../../actions";
import { cleanSearch } from "~/utils/cookies";
import { isMultipleResult, isQueryError, isSingleResult, type QueryResponse } from "~/types/query";
import type { Metadata, NextPage } from "next";

export interface ResultPageProps {
    params: { mac: string[] };
}

export const metadata: Metadata = {
    title: "oui",
    description: "MAC Address Vendor Lookup",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
};

const Lead = styled("div", {
    base: {
        textAlign: "center",
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
    for (const search of mac) {
        if (search.length < 6) {
            return (
                <ExpectedError
                    title="Invalid Search"
                    message="At least 6 characters are required."
                />
            );
        }
    }

    const results = await getData(mac);
    return (
        <Form action={query} width={{ base: "100%", md: "fit-content" }}>
            {isQueryError(results) ? (
                <Alert width={{ base: "100%", md: "lg" }} bg="red">
                    <Stack gap="4" direction={{ base: "column", sm: "row" }}>
                        <Icon>
                            <WarningIcon />
                        </Icon>
                        <Stack gap="1">
                            <styled.h5 fontWeight="medium">Error</styled.h5>
                            <styled.p>{results.error}</styled.p>
                        </Stack>
                    </Stack>
                </Alert>
            ) : isSingleResult(results) ? (
                <ResultsSingle search={mac[0]} results={results} />
            ) : isMultipleResult(results) ? (
                <ResultsMultiple results={results} />
            ) : (
                <Alert width={{ base: "100%", md: "lg" }} bg="badge.accent">
                    <Stack gap="4" direction={{ base: "column", sm: "row" }}>
                        <Icon>
                            <WarningIcon />
                        </Icon>
                        <styled.h5 fontWeight="medium">No Results Found</styled.h5>
                    </Stack>
                </Alert>
            )}

            <Divider mx="-6" />
            <Lead mb="2">Search Again</Lead>
        </Form>
    );
};

export default Page;
