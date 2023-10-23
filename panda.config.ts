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
            layerStyles: {
                badge: {
                    value: {
                        _light: {
                            backgroundColor: "slate.100",
                            color: "slate.600",
                            borderColor: "slate.200",
                        },
                        _dark: {
                            backgroundColor: "slate.900",
                            color: "slate.300",
                            borderColor: "slate.800",
                        },
                    },
                },
                "badge-critical": {
                    value: {
                        _light: {
                            backgroundColor: "rose.600",
                            color: "rose.50",
                            borderColor: "rose.700",
                        },
                        _dark: {
                            backgroundColor: "rose.500",
                            color: "rose.950",
                            borderColor: "rose.400",
                        },
                    },
                },
                "badge-warning": {
                    value: {
                        _light: {
                            backgroundColor: "yellow.300",
                            color: "yellow.950",
                            borderColor: "yellow.400",
                        },
                        _dark: {
                            backgroundColor: "yellow.800",
                            color: "yellow.50",
                            borderColor: "yellow.700",
                        },
                    },
                },
            },
            semanticTokens: {
                colors: {
                    "text-slate": {
                        value: {
                            _light: "{colors.slate.600}",
                            _dark: "{colors.slate.400}",
                        },
                    },
                    "text-green": {
                        value: {
                            _light: "{colors.emerald.600}",
                            _dark: "{colors.emerald.300}",
                        },
                    },
                    "text-red": {
                        value: {
                            _light: "{colors.rose.600}",
                            _dark: "{colors.rose.300}",
                        },
                    },
                    "text-yellow": {
                        value: {
                            _light: "{colors.yellow.700}",
                            _dark: "{colors.yellow.600}",
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
