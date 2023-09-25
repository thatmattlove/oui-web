import { defineRecipe } from "@pandacss/dev";

export const kbd = defineRecipe({
    className: "kbd",
    base: {
        color: "kbd-fg",
        bg: "kbd-bg",
        boxShadow: "0 0 0 1px var(--colors-kbd-border)",
        display: "inline-flex",
        height: "1.25",
        width: "1.25",
        borderRadius: "l2",
        textAlign: "center",
        lineHeight: "1.75",
        px: 1,
        minW: 0,
        fontWeight: "medium",
        fontSize: "sm",
        "&:first-of-type": {
            ml: ".5",
        },
    },
});
