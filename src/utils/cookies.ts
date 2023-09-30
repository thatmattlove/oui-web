import { prepareSingle } from "./prepare";

const prefix = "search-value--";

export function getCookieKey(clean: string): string {
    return `${prefix}${clean}`;
}

export function createSearchCookie(search: string): [string, string, string] {
    const clean = prepareSingle(search);
    const key = getCookieKey(clean);
    return [clean, key, search];
}
