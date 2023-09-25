import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { alert, type AlertVariantProps } from "~/styled-system/recipes";

export type AlertProps = AlertVariantProps & HTMLStyledProps<typeof ark.div>;
export const Alert = styled(ark.div, alert);
