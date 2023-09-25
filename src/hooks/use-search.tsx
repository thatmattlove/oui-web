import { getCookieKey } from "~/utils/cookies";
import { cookies } from "next/headers";

export function useSearch(clean: string): string {
    const key = getCookieKey(clean);
    const value = cookies().get(key);
    return value?.value ?? "?";
}
