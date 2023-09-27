import { ImageResponse } from "next/server";
import { isQueryError, type SingleQueryResults, QueryError } from "~/types/query";
import { formatMacAddress } from "~/utils/format-mac";

import type { ResultPageProps } from "./page";

export const runtime = "edge";

export const alt = "oui";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

async function getMAC(mac: string): Promise<string> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/query?m=${mac}`);
        const data = (await res.json()) as SingleQueryResults | QueryError;
        if (isQueryError(data)) {
            return "";
        }
        return data[0].org;
    } catch (err) {
        return "";
    }
}

function getFontSize(vendor: string): number {
    const len = vendor.length;
    switch (true) {
        case len <= 72:
            return 64;
        default:
            return 32;
    }
}

export default async function Image(props: ResultPageProps) {
    const firaCode = fetch(
        new URL("../../../../public/FiraCode-SemiBold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const inter = fetch(new URL("../../../../public/Inter-Light.ttf", import.meta.url)).then(
        (res) => res.arrayBuffer()
    );

    const {
        params: { mac },
    } = props;

    const vendor = await getMAC(mac);

    const formatted = formatMacAddress(mac);

    if (vendor === "") {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        color: "#e2e8f0",
                        alignItems: "center",
                        background: "#1e293b",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <div style={{ fontFamily: '"Fira Code"', fontSize: 256 }}>oui</div>
                    <div style={{ fontFamily: "Inter", fontSize: 64 }}>
                        MAC Address Vendor Lookup
                    </div>
                </div>
            ),
            {
                ...size,
                fonts: [
                    {
                        name: "Fira Code",
                        data: await firaCode,
                        style: "normal",
                        weight: 600,
                    },
                    {
                        name: "Inter",
                        data: await inter,
                        style: "normal",
                        weight: 300,
                    },
                ],
            }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    color: "#e2e8f0",
                    paddingTop: "5rem",
                    alignItems: "center",
                    background: "#1e293b",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                <div style={{ fontFamily: '"Fira Code"', fontSize: 112 }}>oui</div>
                <div
                    style={{
                        width: "100%",
                        height: "1px",
                        marginTop: "1rem",
                        marginBottom: "2rem",
                        background: "#64748b",
                    }}
                ></div>
                <div style={{ fontFamily: '"Fira Code"', fontSize: 96 }}>{formatted}</div>
                <div
                    style={{
                        maxWidth: "80%",
                        wordWrap: "normal",
                        fontFamily: "Inter",
                        fontSize: getFontSize(vendor),
                    }}
                >
                    {vendor}
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "Fira Code",
                    data: await firaCode,
                    style: "normal",
                    weight: 600,
                },
                {
                    name: "Inter",
                    data: await inter,
                    style: "normal",
                    weight: 300,
                },
            ],
        }
    );
}
