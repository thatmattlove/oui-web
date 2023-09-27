import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { inputGroup, type InputGroupVariantProps } from "~/styled-system/recipes";

export type InputGroupProps = InputGroupVariantProps & HTMLStyledProps<typeof ark.div>;
export const InputGroup = styled(ark.div, inputGroup);
