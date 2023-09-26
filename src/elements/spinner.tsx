import { ark } from "@ark-ui/react";
import { spinner } from "~/styled-system/recipes/spinner";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";

export type SpinnerProps = HTMLStyledProps<"div">;

export const Spinner = styled(ark.div, spinner);
