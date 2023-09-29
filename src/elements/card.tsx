"use client";
import { ark } from "@ark-ui/react";
import { styled, HTMLStyledProps } from "~/styled-system/jsx";
import { card, type CardVariantProps } from "~/styled-system/recipes";
import { createStyleContext } from "~/utils/create-style-context";

const { withProvider, withContext } = createStyleContext(card);

export type CardProps = CardVariantProps & HTMLStyledProps<typeof ark.div>;

const CardRoot = withProvider(styled(ark.div), "root");
export const CardContent = withContext(styled(ark.div), "content");
export const CardDescription = withContext(styled(ark.h2), "description");
export const CardFooter = withContext(styled(ark.div), "footer");
export const CardHeader = withContext(styled(ark.div), "header");
export const CardTitle = withContext(styled(ark.h1), "title");

export const Card = Object.assign(CardRoot, {
    Root: CardRoot,
    Content: CardContent,
    Description: CardDescription,
    Footer: CardFooter,
    Header: CardHeader,
    Title: CardTitle,
});
