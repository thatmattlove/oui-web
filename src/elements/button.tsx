import NextLink, { type LinkProps } from "next/link";
import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { button, type ButtonVariantProps, type ButtonRecipe } from "~/styled-system/recipes";

export type ButtonProps = ButtonVariantProps & HTMLStyledProps<typeof ark.button>;
export type ButtonLinkProps = LinkProps & ButtonVariantProps & HTMLStyledProps<typeof ark.a>;

export const Button = styled(ark.button, button);
export const ButtonLink = styled(NextLink, button);
