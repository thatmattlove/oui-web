import { styled } from "~/styled-system/jsx";

export const Footer = (props: React.PropsWithChildren) => (
    <styled.footer
        w="100%"
        display="flex"
        maxH="24"
        pos="absolute"
        bottom={0}
        right={0}
        left={0}
        py={{ base: "1", md: "2" }}
        px={{ base: "0", sm: "8" }}
        justifyContent="flex-end"
        alignItems="center"
        bg="bg.subtle"
        {...props}
    />
);
