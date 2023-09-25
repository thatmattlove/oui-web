const pattern = new RegExp(`[^0-9a-fA-F]`, "g");
const prefix = "search-value--";

export function cleanSearch(search: string): string {
    return search.replaceAll(pattern, "");
}

export function getCookieKey(clean: string): string {
    return `${prefix}${clean}`;
}

export function createSearchCookie(search: string): [string, string, string] {
    const clean = cleanSearch(search);
    const key = getCookieKey(clean);
    return [clean, key, search];
}
