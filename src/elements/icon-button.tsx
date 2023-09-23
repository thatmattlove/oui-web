import { Button, type ButtonProps } from "./button";

export type IconButtonProps = ButtonProps & { "aria-label": string };

export const IconButton = (props: IconButtonProps) => <Button px="0" {...props} />;
