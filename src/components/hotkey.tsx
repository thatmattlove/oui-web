import { headers } from "next/headers";
import { styled, Stack } from "~/styled-system/jsx";
import { Kbd } from "~/elements/kbd";
import { Search } from "~/icons/search";
import { Icon } from "~/elements/icon";

function getChar(): string {
    const userAgent = headers().get("user-agent");
    if (userAgent?.includes("Mac")) {
        return "⌘";
    }
    return "ctrl";
}

export const HotKey = () => {
    const char = getChar();
    return (
        <Stack
            gap="1.5"
            flexDir="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ base: "none", md: "flex" }}
        >
            <Kbd fontFamily={char === "ctrl" ? "mono" : undefined}>{char}</Kbd>
            <styled.span color="kbd-fg" fontSize="sm">
                +
            </styled.span>
            <Kbd>⏎</Kbd>
            <styled.span color="kbd-fg" fontSize="sm">
                =
            </styled.span>
            <Icon size="xs" color="kbd-fg">
                <Search />
            </Icon>
        </Stack>
    );
};
