import { Stack, styled } from "~/styled-system/jsx";
import { Icon } from "~/elements/icon";
import { Alert as AlertElement, type AlertProps as AlertElementProps } from "~/elements/alert";
import { WarningIcon } from "~/icons/warning";

export interface AlertProps extends AlertElementProps {
    title: string;
    message?: string;
    icon?: JSX.Element;
}

export const Alert = (props: AlertProps) => {
    const { title, message, icon, ...rest } = props;
    return (
        <AlertElement
            layerStyle="badge"
            borderWidth="1px"
            width={{ base: "100%", md: "lg" }}
            {...rest}
        >
            <Stack gap="4" direction="row">
                <Icon fill="currentColor">{icon || <WarningIcon />}</Icon>
                <Stack gap="1">
                    <styled.h5 fontWeight="medium">{title}</styled.h5>
                    {message && <styled.p>{message}</styled.p>}
                </Stack>
            </Stack>
        </AlertElement>
    );
};
