import { ark } from "@ark-ui/react";
import { footer } from "~/styled-system/recipes/footer";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";

export type FooterProps = HTMLStyledProps<typeof ark.footer>;

export const Footer = styled(ark.footer, footer);
