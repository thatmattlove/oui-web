import { defineRecipe } from "@pandacss/dev";

export const main = defineRecipe({
    className: "main",
    base: {
        w: "100%",
        display: "flex",
        overflow: "auto",
        flexDir: "column",
        alignItems: "center",
        px: { base: 2, sm: 8 },
        pt: { base: 20, md: 16 },
        pb: 24,
        justifyContent: "flex-start",
        height: { base: "calc(100vh - var(--sizes-20))", md: "calc(100vh - var(--sizes-24))" },
    },
});
