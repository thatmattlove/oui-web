import { ButtonLink } from "~/elements/button";
import { styled, VStack } from "~/styled-system/jsx";
import keywords from "../../_keywords";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "oui :: MAC Address Formatter",
    description: "Easily convert between common MAC address formats",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    applicationName: "oui",
    robots: process.env.NODE_ENV === "production" ? "index, follow" : "noindex, nofollow",
    openGraph: {
        title: "oui :: MAC Address Formatter",
        description: "Easily convert between common MAC address formats",
        siteName: "oui",
        type: "website",
        url: "/convert",
    },
    keywords,
};

export default function Layout(props: React.PropsWithChildren) {
    const { children } = props;
    return (
        <VStack
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent={{ base: "space-evenly", md: "center" }}
            gap={{ base: 8, md: 16 }}
        >
            <ButtonLink href="/" variant="link" flexDir="column">
                <styled.h1 fontFamily="mono" fontSize="3xl" fontWeight="bold">
                    oui
                </styled.h1>
                <styled.h2 color="fg.subtle" fontSize="xs" fontWeight="normal">
                    MAC Address Vendor Lookup
                </styled.h2>
            </ButtonLink>
            {children}
        </VStack>
    );
}
