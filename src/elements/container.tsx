import { Flex } from "~/styled-system/jsx";

export const Container = (props: React.PropsWithChildren) => (
    <Flex
        w="100%"
        h="100%"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
        flexDir="column"
        justify="center"
        align="center"
        {...props}
    />
);
