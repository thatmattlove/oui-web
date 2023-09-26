import { ark } from "@ark-ui/react";
import { main } from "~/styled-system/recipes/main";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";

export type MainProps = HTMLStyledProps<"main">;

export const Main = styled(ark.main, main);
