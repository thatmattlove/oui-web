"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSearchCookie } from "~/utils/cookies";
import { sanitize } from "~/utils/sanitize";

export async function query(formData: FormData) {
    const raw = formData.get("mac")?.toString() ?? "";
    if (raw.length < 6) {
        throw new Error("At least 6 characters are required.");
    }
    const parts = sanitize(raw);
    let pathParts: string[] = [];
    for (const part of parts) {
        if (part.length > 24) {
            throw new Error(`EUI-64 is the maximum supported address length (${part}).`);
        }
        const [clean, key, value] = createSearchCookie(part);
        cookies().set(key, value);
        pathParts = [...pathParts, clean];
    }
    const path = pathParts.join("/");
    return redirect(`/r/${path}`);
}
