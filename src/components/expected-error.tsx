"use client";
import { styled, Stack } from "~/styled-system/jsx";
import { Alert } from "~/elements/alert";
import { Icon } from "~/elements/icon";
import { WarningIcon } from "~/icons/warning";
import { LeftArrowFill } from "~/icons/left-arrow-fill";
import { IconButtonLink } from "~/elements/icon-button";

interface ExpectedErrorProps {
    title: string;
    message?: string;
    hideBackButton?: boolean;
    isServerError?: boolean;
}

export const ExpectedError = (props: ExpectedErrorProps) => {
    const { title, message, hideBackButton, isServerError } = props;
    return (
        <Alert
            layerStyle="badge-critical"
            height="fit-content"
            width={{ base: "100%", md: "xl" }}
            {...(isServerError ? { "data-server-error": "" } : {})}
        >
            <Stack gap="4" direction={{ base: "column", md: "row" }} justifyContent="space-between">
                <Stack gap="4" direction={{ base: "column", md: "row" }}>
                    <Icon fill="currentColor">
                        <WarningIcon />
                    </Icon>
                    <Stack gap="4">
                        <styled.h1 fontSize="2xl" fontWeight="medium">
                            {title}
                        </styled.h1>
                        {message && <styled.p fontSize="md">{message}</styled.p>}
                    </Stack>
                </Stack>
                {!hideBackButton && (
                    <IconButtonLink
                        href="/"
                        variant="link"
                        alignSelf="center"
                        aria-label="Go Back"
                        transition="ease-in-out 0.1s opacity"
                        _hover={{ opacity: 0.9 }}
                    >
                        <Icon fill="currentColor" size="xl">
                            <LeftArrowFill />
                        </Icon>
                    </IconButtonLink>
                )}
            </Stack>
        </Alert>
    );
};
