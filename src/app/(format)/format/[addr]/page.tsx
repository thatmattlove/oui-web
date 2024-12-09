import { Formatter } from "~/components/formatter";
import keywords from "../../../_keywords";

import type { Metadata } from "next";

interface PageProps {
    params: { addr: string };
}

export const metadata: Metadata = {
    title: "oui :: MAC Address Formatter",
    description: "Easily convert between common MAC address formats",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://oui.is"),
    applicationName: "oui",
    robots: process.env.NODE_ENV === "production" ? "index, follow" : "noindex, nofollow",
    openGraph: {
        title: "oui :: MAC Address Formatter",
        description: "Easily convert between common MAC address formats",
        siteName: "oui",
        type: "website",
        url: "/format",
    },
    keywords,
};

export default function Format(props: PageProps) {
    const {
        params: { addr },
    } = props;
    return <Formatter initial={addr} />;
}
