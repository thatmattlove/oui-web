import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { code, type CodeVariantProps } from "~/styled-system/recipes";

export type CodeProps = CodeVariantProps & HTMLStyledProps<typeof ark.code>;
export const Code = styled(ark.code, code);
