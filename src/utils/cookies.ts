import { cookies } from "next/headers";
import { sanitize, split } from "./sanitize";

const prefix = "search-value--";

export function getCookieKey(value: string): string {
    const sanitized = sanitize(value);
    return `${prefix}${sanitized}`;
}

export function setCookies(raw: string): void {
    const parts = split(raw);
    for (const part of parts) {
        const key = getCookieKey(part);
        cookies().set(key, part);
    }
}
