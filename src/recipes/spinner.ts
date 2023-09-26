import { defineRecipe } from "@pandacss/dev";

export const spinner = defineRecipe({
    className: "spinner",
    base: {
        display: "inline-block",
        borderColor: "currentColor",
        borderStyle: "solid",
        borderRadius: "99999px",
        borderWidth: "2px",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
        animation: `spin 0.45s linear infinite`,
        height: "4",
        width: "4",
    },
});
