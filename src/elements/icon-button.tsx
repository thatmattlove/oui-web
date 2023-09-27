import { Button, ButtonLink, type ButtonLinkProps, type ButtonProps } from "./button";

export type IconButtonProps = ButtonProps & { "aria-label": string };
export type IconButtonLinkProps = ButtonLinkProps & { "aria-label": string };

export const IconButton = (props: IconButtonProps) => <Button px="0" {...props} />;

export const IconButtonLink = (props: IconButtonLinkProps) => <ButtonLink px="0" {...props} />;
