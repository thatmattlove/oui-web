import { styled } from "~/styled-system/jsx";

export const Spinner = styled("div", {
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
