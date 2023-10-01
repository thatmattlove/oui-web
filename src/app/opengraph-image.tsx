import { ImageResponse, type ImageResponseOptions } from "next/server";

export const runtime = "edge";

export const alt = "oui";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

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

export default async function Image() {
    const firaCode = fetch(new URL("../../public/FiraCode-SemiBold.ttf", import.meta.url)).then(
        (res) => res.arrayBuffer()
    );
    const inter = fetch(new URL("../../public/Inter-Light.ttf", import.meta.url)).then((res) =>
        res.arrayBuffer()
    );
    const fonts: ImageResponseOptions["fonts"] = [
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
    ];

    return new ImageResponse(
        (
            <Standard>
                <div style={{ fontFamily: '"Fira Code"', fontSize: 256 }}>oui</div>
                <div style={{ fontFamily: "Inter", fontSize: 64 }}>MAC Address Vendor Lookup</div>
            </Standard>
        ),
        { ...size, fonts }
    );
}
