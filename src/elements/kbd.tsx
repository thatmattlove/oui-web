import { ark } from "@ark-ui/react";
import { kbd } from "~/styled-system/recipes/kbd";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";

export type KBDProps = HTMLStyledProps<"kbd">;

export const Kbd = styled(ark.kbd, kbd);
