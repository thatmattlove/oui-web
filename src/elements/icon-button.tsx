import NextLink, { type LinkProps } from "next/link";
import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { iconButton, type IconButtonVariantProps } from "~/styled-system/recipes";

export type IconButtonProps = IconButtonVariantProps &
    HTMLStyledProps<typeof ark.button> & { "aria-label": string };

export type IconButtonLinkProps = LinkProps &
    IconButtonVariantProps &
    HTMLStyledProps<typeof NextLink> & { "aria-label": string };

export const IconButton = styled(ark.button, iconButton);

export const IconButtonLink = styled(NextLink, iconButton);
