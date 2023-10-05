"use client";
import { Portal } from "@ark-ui/react";
import { HStack } from "~/styled-system/jsx";
import { ButtonLink } from "~/elements/button";
import { IconButton } from "~/elements/icon-button";
import { List } from "~/icons/list";
import { Icon } from "~/elements/icon";
import {
    Menu,
    MenuContent,
    MenuItem,
    MenuItemGroup,
    MenuItemGroupLabel,
    MenuPositioner,
    MenuSeparator,
    MenuTrigger,
    type MenuProps,
} from "~/elements/menu";

export const Tools = (props: MenuProps) => {
    const { size = "sm", ...rest } = props;
    return (
        <Menu size={size} {...rest}>
            <MenuTrigger asChild>
                <IconButton aria-label="Open Tools Menu" variant="outline" size={size}>
                    <Icon>
                        <List />
                    </Icon>
                </IconButton>
            </MenuTrigger>
            <Portal>
                <MenuPositioner>
                    <MenuContent>
                        <MenuItemGroup id="tools">
                            <MenuItemGroupLabel
                                htmlFor="tools"
                                textTransform="uppercase"
                                fontSize="xs"
                            >
                                Tools
                            </MenuItemGroupLabel>
                            <MenuSeparator />
                            <MenuItem id="format">
                                <HStack gap="6" justify="space-between" flex="1">
                                    <HStack gap="2">
                                        <ButtonLink href="/format" variant="link">
                                            MAC Address Formatter
                                        </ButtonLink>
                                    </HStack>
                                </HStack>
                            </MenuItem>
                        </MenuItemGroup>
                    </MenuContent>
                </MenuPositioner>
            </Portal>
        </Menu>
    );
};
