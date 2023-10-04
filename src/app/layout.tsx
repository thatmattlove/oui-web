import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Fira_Code } from "next/font/google";
import { Main } from "~/elements/main";
import { Footer } from "~/elements/footer";
import { IconButtonLink } from "~/elements/icon-button";
import { Icon } from "~/elements/icon";
import { ThemeSwitchIconButton } from "~/components/theme-switch-button";
import { styled, Stack, HStack } from "~/styled-system/jsx";
import { HotKey } from "~/components/hotkey";
import { LastUpdated } from "~/components/last-updated";
import { GitHub } from "~/icons/github";
import { Providers } from "./providers";
import keywords from "./_keywords";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const firaCode = Fira_Code({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
    title: "oui :: MAC Address Search",
    description: "The easy to remember MAC Address OUI lookup tool",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    applicationName: "oui",
    robots: process.env.NODE_ENV === "production" ? "index, follow" : "noindex, nofollow",
    openGraph: {
        title: "oui :: MAC Address Search",
        description: "The easy to remember MAC Address OUI lookup tool",
        siteName: "oui",
        type: "website",
        url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    keywords,
};

const Body = styled("body", {
    base: {
        w: "100vw",
        h: { base: "calc(100vh - var(--sizes-20))", md: "calc(100vh - var(--sizes-12))" },
        "& *::selection": {
            _dark: {
                bg: "slate.700",
                color: "slate.100",
            },
            _light: {
                bg: "slate.500",
                color: "slate.50",
            },
        },
    },
});

const GitHubLink = () => (
    <IconButtonLink
        variant="link"
        target="_blank"
        aria-label="GitHub"
        href="https://github.com/thatmattlove/oui-web"
    >
        <Icon>
            <GitHub />
        </Icon>
    </IconButtonLink>
);

export default async function RootLayout(props: React.PropsWithChildren) {
    const { children } = props;

    return (
        <html
            lang="en"
            className={`${inter.variable} ${firaCode.variable}`}
            suppressHydrationWarning
        >
            <Body>
                <Providers>
                    <Main>{children}</Main>
                    <Footer>
                        <HotKey />
                        <Stack
                            direction="row"
                            gap="4"
                            align="center"
                            w="100%"
                            justify={{ base: "space-between", md: "flex-end" }}
                        >
                            <LastUpdated />
                            <HStack>
                                <GitHubLink />
                                <ThemeSwitchIconButton />
                            </HStack>
                        </Stack>
                    </Footer>
                </Providers>
                <Analytics />
            </Body>
        </html>
    );
}
