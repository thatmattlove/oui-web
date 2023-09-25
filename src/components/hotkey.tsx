"use client";
import { useMemo } from "react";
import { styled, Stack } from "~/styled-system/jsx";
import { Kbd } from "~/elements/kbd";
import { Search } from "~/icons/search";
import { Icon } from "~/elements/icon";

export const HotKey = () => {
    const char = useMemo(() => {
        if (typeof window === "undefined") {
            return "⊞";
        }
        const { userAgent } = navigator;
        if (userAgent.search("Mac")) {
            return "";
        }
        return "⊞";
    }, []);
    return (
        <Stack
            gap="1.5"
            flexDir="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ base: "none", md: "flex" }}
        >
            <Kbd>{char}</Kbd>
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
