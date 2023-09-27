import NextLink from "next/link";
import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { badge, type BadgeVariantProps } from "~/styled-system/recipes";

export type BadgeLinkProps = BadgeVariantProps & HTMLStyledProps<typeof NextLink>;
export type BadgeProps = BadgeVariantProps & HTMLStyledProps<typeof ark.div>;
export const Badge = styled(ark.div, badge);
export const BadgeLink = styled(NextLink, badge);
