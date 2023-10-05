import { defineConfig } from "@pandacss/dev";
import { kbd } from "~/recipes/kbd";
import { footer } from "~/recipes/footer";
import { main } from "~/recipes/main";
import { code } from "~/recipes/code";
import { link } from "~/recipes/link";
import { spinner } from "~/recipes/spinner";
import { iconButton } from "~/recipes/icon-button";
import { inputGroup } from "~/recipes/input-group";
import { header } from "~/recipes/header";
import { buttonLink } from "~/recipes/button-link";

export default defineConfig({
    preflight: true,
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
    exclude: [],
    conditions: {
        light: "[data-color-mode=light] &",
        dark: "[data-color-mode=dark] &",
    },
    theme: {
        extend: {
            keyframes: {
                spin: {
                    "0%": {
                        transform: "rotate(0deg)",
                    },
                    "100%": {
                        transform: "rotate(360deg)",
                    },
                },
            },
            recipes: {
                buttonLink,
                code,
                footer,
                header,
                iconButton,
                inputGroup,
                kbd,
                link,
                main,
                spinner,
            },
            semanticTokens: {
                colors: {
                    green: {
                        value: {
                            _light: "{colors.emerald.600}",
                            _dark: "{colors.emerald.300}",
                        },
                    },
                    red: {
                        value: {
                            _light: "{colors.rose.600}",
                            _dark: "{colors.rose.300}",
                        },
                    },
                    slate: {
                        value: {
                            _light: "{colors.slate.600}",
                            _dark: "{colors.slate.400}",
                        },
                    },
                    "badge.accent": {
                        value: {
                            _light: "{colors.slate.100}",
                            _dark: "{colors.slate.900}",
                        },
                    },
                    "kbd-bg": {
                        value: {
                            _light: "{colors.slate.100}",
                            _dark: "{colors.slate.900}",
                        },
                    },
                    "kbd-fg": {
                        value: {
                            _light: "{colors.slate.600}",
                            _dark: "{colors.slate.300}",
                        },
                    },
                    "kbd-border": {
                        value: {
                            _light: "{colors.slate.200}",
                            _dark: "{colors.slate.800}",
                        },
                    },
                    "alert-bg": {
                        value: {
                            _light: "{colors.rose.600}",
                            _dark: "{colors.rose.500}",
                        },
                    },
                    "alert-fg": {
                        value: {
                            _light: "{colors.rose.50}",
                            _dark: "{colors.rose.950}",
                        },
                    },
                    "alert-border": {
                        value: {
                            _light: "{colors.rose.700}",
                            _dark: "{colors.rose.400}",
                        },
                    },
                    "alert-accent": {
                        value: {
                            _light: "{colors.rose.200}",
                            _dark: "{colors.rose.950}",
                        },
                    },
                    badge: {
                        value: {
                            _light: "slate.100",
                            _dark: "slate.900",
                        },
                    },
                },
            },
            tokens: {
                fonts: {
                    mono: { value: "var(--font-mono), Melno, monospace" },
                },
            },
        },
    },
    presets: ["@pandacss/dev/presets", "@park-ui/presets"],
    jsxFramework: "react",
    outdir: "./src/styled-system",
});
