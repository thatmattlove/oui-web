import { defineRecipe } from "@pandacss/dev";

export const main = defineRecipe({
    className: "main",
    base: {
        w: "100%",
        height: { base: "calc(100vh - var(--spacing-20))", md: "calc(100vh - var(--spacing-12))" },
        display: "flex",
        flexDir: "column",
        overflow: "auto",
        alignItems: "center",
        justifyContent: { base: "flex-start", md: "center" },
        px: { base: "2", sm: "8" },
        pb: { base: "12", md: "24" },
        pt: { base: "2", md: "12" },
    },
});
