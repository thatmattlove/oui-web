import { ImageResponse, type ImageResponseOptions } from "next/server";
import { isQueryError, type SingleQueryResults, QueryError } from "~/types/query";
import { formatMacAddress } from "~/utils/format-mac";

export const runtime = "edge";

export const alt = "oui";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

async function getMAC(mac: string[]): Promise<string> {
    if (mac.length === 1) {
        try {
            const body = new FormData();
            body.set("search", mac[0]);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/query`, {
                method: "POST",
                body,
            });
            const data = (await res.json()) as SingleQueryResults | QueryError;
            if (isQueryError(data)) {
                console.error(data.error);
                return "";
            }
            return data[0].org;
        } catch (err) {
            console.error(err);
            return "";
        }
    }
    return "";
}

function getFontSize(vendor: string): number {
    if (vendor.length <= 72) {
        return 64;
    }
    return 32;
}

async function loadFonts(): Promise<{ firaCode: ArrayBuffer; inter: ArrayBuffer }> {
    const firaCode = await fetch(
        new URL("../../../../public/FiraCode-SemiBold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const inter = await fetch(new URL("../../../../public/Inter-Light.ttf", import.meta.url)).then(
        (res) => res.arrayBuffer()
    );
    return { firaCode, inter };
}

const Standard = (props: React.PropsWithChildren) => (
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
        {...props}
    />
);

const WithVendor = (props: React.PropsWithChildren) => (
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
        {...props}
    />
);

export async function GET(req: Request) {
    const { firaCode, inter } = await loadFonts();
    const fonts: ImageResponseOptions["fonts"] = [
        {
            name: "Fira Code",
            data: firaCode,
            style: "normal",
            weight: 600,
        },
        {
            name: "Inter",
            data: inter,
            style: "normal",
            weight: 300,
        },
    ];

    const url = new URL(req.url);
    const mac = url.pathname.split("/").filter((p) => p !== "" && p !== "og");

    const base = new ImageResponse(
        (
            <Standard>
                <div style={{ fontFamily: '"Fira Code"', fontSize: 256 }}>oui</div>
                <div style={{ fontFamily: "Inter", fontSize: 64 }}>MAC Address Vendor Lookup</div>
            </Standard>
        ),
        { ...size, fonts }
    );

    if (mac.length === 0) {
        return base;
    }

    const vendor = await getMAC(mac);
    if (vendor === "") {
        return base;
    }

    const formatted = formatMacAddress(mac[0]);

    return new ImageResponse(
        (
            <WithVendor>
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
            </WithVendor>
        ),
        { ...size, fonts }
    );
}
