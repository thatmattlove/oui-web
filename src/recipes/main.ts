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
        py: { base: "12", md: "24" },
    },
});
