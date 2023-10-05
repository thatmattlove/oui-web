import { defineRecipe } from "@pandacss/dev";

export const header = defineRecipe({
    className: "header",
    base: {
        left: 0,
        right: 0,
        w: "100%",
        top: 0,
        pos: "fixed",
        zIndex: 1,
        display: "flex",
        bg: "bg.canvas",
        alignItems: "center",
        py: { base: 1, md: 2 },
        px: { base: 6, sm: 12 },
        height: { base: 20, md: 16 },
        gap: { base: 2, md: "unset" },
        justifyContent: "flex-end",
    },
});
