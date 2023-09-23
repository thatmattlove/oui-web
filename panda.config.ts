import { defineConfig, defineSemanticTokens } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],
    conditions: {
        light: "[data-color-mode=light] &",
        dark: "[data-color-mode=dark] &",
    },

    // Useful for theme customization
    theme: {
        // semanticTokens: {

        // },
        extend: {
            tokens: {
                fonts: {
                    mono: { value: "var(--font-mono), Melno, monospace" },
                },
            },
        },
    },
    presets: ["@pandacss/dev/presets", "@park-ui/presets"],

    jsxFramework: "react",

    // The output directory for your css system
    outdir: "./src/styled-system",
});
