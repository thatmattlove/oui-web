import { styled } from "~/styled-system/jsx";

export const Container = styled("main", {
    base: {
        w: "100%",
        h: "100%",
        py: { base: "12", md: "24" },
        px: { base: "2", sm: "8" },
        flexDir: "column",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
});
