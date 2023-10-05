import { ark } from "@ark-ui/react";
import { header } from "~/styled-system/recipes/header";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";

export type HeaderProps = HTMLStyledProps<typeof ark.header>;

export const Header = styled(ark.header, header);
