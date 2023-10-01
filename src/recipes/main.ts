import { defineRecipe } from "@pandacss/dev";

export const main = defineRecipe({
    className: "main",
    base: {
        w: "100%",
        h: "100%",
        display: "flex",
        flexDir: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { base: "2", sm: "8" },
        pb: { base: "12", md: "24" },
        pt: { base: "2", md: "12" },
    },
});
