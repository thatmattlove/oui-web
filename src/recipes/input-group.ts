import { defineRecipe } from "@pandacss/dev";

export const inputGroup = defineRecipe({
    className: "input-group",
    base: {
        display: "flex",
        flexDirection: "row!",
        alignItems: "center",
        "& :first-child": {
            borderRight: "none",
            borderTopRightRadius: "none",
            borderBottomRightRadius: "none",
        },
        "& :last-child": {
            borderTopLeftRadius: "none",
            borderBottomLeftRadius: "none",
        },
        "& :first-child:is(:focus, [data-focus]), & :last-child:is(:focus, [data-focus])": {
            borderColor: "border.emphasized",
            boxShadow: "unset",
        },
        _focusWithin: {
            borderColor: "border.accent",
            boxShadow: "accent",
        },
        _disabled: {
            opacity: 0.4,
            cursor: "not-allowed",
        },
        borderRadius: "l2",
        transitionDuration: "normal",
        transitionProperty: "border-color, box-shadow",
    },
    defaultVariants: {
        size: "md",
    },
    variants: {
        size: {
            xs: {
                h: "8",
                "& :first-child": {
                    h: "8",
                },
                "& :last-child": {
                    h: "8",
                },
                "& input, & textarea": {
                    p: "1",
                },
            },
            sm: {
                h: "9",
                "& :first-child": {
                    h: "9",
                },
                "& :last-child": {
                    h: "9",
                },
                "& input, & textarea": {
                    p: "1.5",
                },
            },
            md: {
                h: "10",
                "& :first-child": {
                    h: "10",
                },
                "& :last-child": {
                    h: "10",
                },
                "& input, & textarea": {
                    p: "2",
                },
            },
            lg: {
                h: "11",
                "& :first-child": {
                    h: "11",
                },
                "& :last-child": {
                    h: "11",
                },
                "& input, & textarea": {
                    p: "2.5",
                },
            },
            xl: {
                h: "12",
                "& :first-child": {
                    h: "12",
                },
                "& :last-child": {
                    h: "12",
                },
                "& input, & textarea": {
                    p: "3",
                },
            },
            "2xl": {
                h: "16",
                "& :first-child": {
                    h: "16",
                },
                "& :last-child": {
                    h: "16",
                },
                "& input, & textarea": {
                    p: "3.5",
                },
            },
        },
    },
});
