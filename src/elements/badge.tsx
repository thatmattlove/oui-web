import { ark } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";
import { badge, type BadgeVariantProps } from "~/styled-system/recipes";

export type BadgeProps = BadgeVariantProps & HTMLStyledProps<typeof ark.div>;
export const Badge = styled(ark.div, badge);
