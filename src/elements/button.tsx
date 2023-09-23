import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { button, type ButtonVariantProps, type ButtonRecipe } from "~/styled-system/recipes";

export type ButtonProps = ButtonVariantProps & HTMLStyledProps<typeof ark.button>;
export const Button = styled(ark.button, button);
