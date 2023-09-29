import "server-only";
import { cache } from "react";
import qs from "query-string";
import { cleanSearch } from "./cookies";

import type { QueryResponse } from "~/types/query";

export const preload = () => {
    void _getSingle("00:50:56:00:00:00");
};

async function _getSingle(search: string): Promise<QueryResponse> {
    const m = cleanSearch(search);
    const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/query`,
        query: { m },
    });
    const res = await fetch(url);
    const results = await res.json();
    return results as QueryResponse;
}

async function _getMultiple(search: string[]): Promise<QueryResponse> {
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

export const getSingle = cache(_getSingle);

export const getMultiple = cache(_getMultiple);
