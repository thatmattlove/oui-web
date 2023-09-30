"use server";
import { redirect } from "next/navigation";
import { setCookies } from "~/utils/cookies";
import { sanitize } from "~/utils/sanitize";

export async function query(formData: FormData) {
    const raw = formData.get("mac")?.toString() ?? "";
    if (raw.length < 6) {
        throw new Error("At least 6 characters are required.");
    }
    setCookies(raw);
    const parts = sanitize(raw);
    let pathParts: string[] = [];
    for (const part of parts) {
        if (part.length > 24) {
            throw new Error(`EUI-64 is the maximum supported address length (${part}).`);
        }
        pathParts = [...pathParts, part];
    }
    const path = pathParts.join("/");
    return redirect(`/r/${path}`);
}
