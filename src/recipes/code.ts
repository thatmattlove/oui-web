import { defineRecipe } from "@pandacss/dev";

export const code = defineRecipe({
    className: "code",
    base: {
        alignItems: "center",
        borderRadius: "l2",
        color: "fg.emphasized",
        display: "inline-flex",
        fontFamily: "var(--font-mono)",
        fontWeight: "medium",
    },
    defaultVariants: {
        size: "md",
        variant: "subtle",
    },
    variants: {
        variant: {
            outline: {
                borderWidth: "1px",
            },
            ghost: {
                bg: "bg.subtle",
            },
            subtle: {},
        },
        size: {
            sm: {
                height: "5",
                px: "0.5",
                textStyle: "xs",
            },
            md: {
                height: "6",
                px: "1",
                textStyle: "sm",
            },
            lg: {
                height: "7",
                px: "1.5",
                textStyle: "md",
            },
        },
    },
});
