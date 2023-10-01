import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { link, type LinkVariantProps } from "~/styled-system/recipes/link";

export type LinkProps = LinkVariantProps & HTMLStyledProps<typeof ark.a>;

export const Link = styled(ark.a, link);
