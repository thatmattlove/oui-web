import { defineRecipe } from "@pandacss/dev";

export const kbd = defineRecipe({
    className: "kbd",
    base: {
        px: 1,
        minW: 0,
        bg: "kbd-bg",
        width: "1.25",
        height: "1.25",
        fontSize: "sm",
        color: "kbd-fg",
        borderRadius: "l2",
        lineHeight: "1.75",
        textAlign: "center",
        fontWeight: "medium",
        display: "inline-flex",
        boxShadow: "0 0 0 1px var(--colors-kbd-border)",
        "&:first-of-type": {
            ml: ".5",
        },
    },
});
