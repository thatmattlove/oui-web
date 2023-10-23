export type SingleQueryResults = SingleQueryResult[];

export interface SingleQueryResult {
    org: string;
    prefix: string;
    registry: string;
    registryUrl: string;
    prefixLength: number;
    prefixRange: string;
    prefixRangeStart: string;
    prefixRangeStop: string;
    oui: string;
    notFound: boolean;
    error: string;
}

export interface NotFoundResult extends SingleQueryResult {
    notFound: true;
    org: "";
    prefix: "";
    registry: "";
    registryUrl: "";
    prefixRange: "";
    prefixRangeStart: "";
    prefixRangeStop: "";
}

export interface QueryError {
    error: string;
}

export interface MultipleQueryResults {
    [oui: string]: SingleQueryResult;
}

export type QueryResponse = SingleQueryResults | MultipleQueryResults | QueryError;

function isSingleQueryResult(obj: unknown): obj is SingleQueryResult {
    return typeof obj === "object" && obj !== null && "org" in obj;
}

export function isSingleResult(res: unknown): res is SingleQueryResults {
    if (Array.isArray(res)) {
        return isSingleQueryResult(res[0]);
    }
    return false;
}

export function isMultipleResult(obj: unknown): obj is MultipleQueryResults {
    if (!Array.isArray(obj) && typeof obj === "object" && obj !== null) {
        for (const value of Object.values(obj)) {
            return isSingleQueryResult(value);
        }
    }
    return false;
}

export function isQueryError(res: unknown): res is QueryError {
    return !Array.isArray(res) && typeof res === "object" && res !== null && "error" in res;
}

export function isNotFound(res: SingleQueryResult): res is NotFoundResult {
    return res.notFound === true && res.error === "" && res.registry === "";
}

export function isError(res: SingleQueryResult): res is NotFoundResult {
    return res.notFound === true && res.error.length > 0 && res.registry === "";
}
