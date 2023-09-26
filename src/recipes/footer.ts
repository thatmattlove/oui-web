import { defineRecipe } from "@pandacss/dev";

export const footer = defineRecipe({
    className: "footer",
    base: {
        left: 0,
        right: 0,
        w: "100%",
        h: "100%",
        bottom: 0,
        pos: "absolute",
        display: "flex",
        bg: "bg.subtle",
        alignItems: "center",
        py: { base: 1, md: 2 },
        px: { base: 6, sm: 8 },
        maxH: { base: 20, md: 12 },
        justifyContent: "space-between",
        borderTop: "1px solid var(--colors-border-default)",
    },
});
