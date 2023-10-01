import { defineRecipe } from "@pandacss/dev";

export const link = defineRecipe({
    className: "link",
    base: {
        gap: "2",
        color: "fg.muted",
        cursor: "pointer",
        alignItems: "center",
        fontWeight: "medium",
        display: "inline-flex",
        transitionDuration: "normal",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "opacity, font-weight",
    },
    defaultVariants: {
        variant: "standard",
    },
    variants: {
        variant: {
            standard: {
                _hover: {
                    opacity: 0.8,
                    textDecoration: "underline",
                    textDecorationThickness: "from-font",
                },
            },
        },
    },
});
