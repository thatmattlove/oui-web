import "./globals.css";
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { Main } from "~/elements/main";
import { Footer } from "~/elements/footer";
import { IconButtonLink } from "~/elements/icon-button";
import { Icon } from "~/elements/icon";
import { ThemeSwitchIconButton } from "~/components/theme-switch-button";
import { styled } from "~/styled-system/jsx";
import { HotKey } from "~/components/hotkey";

import { Providers } from "./providers";
import { GitHub } from "~/icons/github";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const firaCode = Fira_Code({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
    title: "oui",
    description: "MAC Address Vendor Lookup",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    openGraph: {
        title: "oui",
        description: "MAC Address Vendor Lookup",
        siteName: "oui",
        type: "website",
        url: process.env.NEXT_PUBLIC_BASE_URL,
    },
};

const Body = styled("body", {
    base: {
        w: "100vw",
        h: "100vh",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${firaCode.variable}`}
            suppressHydrationWarning
        >
            <Body>
                <Providers>
                    <Main>
                        {children}
                        <Footer justifyContent={{ base: "flex-end", md: "space-between" }}>
                            <GitHubLink />
                            <ThemeSwitchIconButton />
                            <HotKey />
                        </Footer>
                    </Main>
                </Providers>
            </Body>
        </html>
    );
}
