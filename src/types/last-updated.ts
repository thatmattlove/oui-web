export interface LastUpdatedResponse {
    utc: string;
    local: string;
}

export function isLastUpdatedResponse(obj: unknown): obj is LastUpdatedResponse {
    return (
        !Array.isArray(obj) &&
        typeof obj === "object" &&
        obj !== null &&
        "utc" in obj &&
        "local" in obj
    );
}
