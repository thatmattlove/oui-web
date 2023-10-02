import { defineRecipe } from "@pandacss/dev";

export const main = defineRecipe({
    className: "main",
    base: {
        w: "100%",
        display: "flex",
        overflow: "auto",
        flexDir: "column",
        alignItems: "center",
        px: { base: "2", sm: "8" },
        pt: { base: "2", md: "12" },
        pb: { base: "24", md: "24" },
        justifyContent: { base: "flex-start", md: "center" },
        height: { base: "calc(100vh - var(--sizes-20))", md: "calc(100vh - var(--sizes-12))" },
    },
});
