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
