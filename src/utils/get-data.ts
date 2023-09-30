import "server-only";
import { cache } from "react";
import { prepareMultiple, prepareSingle } from "./prepare";

import type { QueryResponse } from "~/types/query";

export const preload = () => {
    void _getSingle("00:50:56:00:00:00");
};

async function submitFormData(body: FormData): Promise<QueryResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/query`, {
        method: "POST",
        body,
        // headers: new Headers({ "content-type": "multipart/form-data" }),
    });
    const json = await response.json();
    return json as QueryResponse;
}

function createFormData(data: string | string[]): FormData {
    const formData = new FormData();
    if (Array.isArray(data)) {
        formData.set("search", data.join("\n"));
    } else {
        formData.set("search", data);
    }
    return formData;
}

async function _getSingle(search: string): Promise<QueryResponse> {
    const m = prepareSingle(search);
    return await submitFormData(createFormData(m));
}

async function _getMultiple(search: string[]): Promise<QueryResponse> {
    const m = prepareMultiple(search);
    return await submitFormData(createFormData(m));
}

export const getSingle = cache(_getSingle);
export const getMultiple = cache(_getMultiple);
