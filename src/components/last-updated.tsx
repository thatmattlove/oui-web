"use client";
import qs from "query-string";
import { styled, Stack, type StackProps } from "~/styled-system/jsx";
import { isQueryError } from "~/types/query";
import { isLastUpdatedResponse, type LastUpdatedResponse } from "~/types/last-updated";
import useSWR from "swr/immutable";
import { useMemo } from "react";
import { Portal } from "@ark-ui/react";
import {
    Tooltip,
    TooltipArrow,
    TooltipArrowTip,
    TooltipContent,
    TooltipPositioner,
    TooltipTrigger,
} from "~/elements/tooltip";

async function get(url: string): Promise<LastUpdatedResponse> {
    const res = await fetch(url);
    const data = await res.json();
    if (isQueryError(data)) {
        throw new Error(data.error);
    }
    if (isLastUpdatedResponse(data)) {
        return data;
    }
    throw new Error("unknown response");
}

function useLastUpdated() {
    const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
    const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/last-updated`,
        query: { tz },
    });
    return useSWR<LastUpdatedResponse, Error>(url, get);
}

function useFormattedTime(time: string, tz?: string): string {
    return useMemo(() => {
        const date = Date.parse(time);
        const fmt = new Intl.DateTimeFormat(undefined, { timeStyle: "long", timeZone: tz }).format(
            date
        );
        return fmt;
    }, [time, tz]);
}

const Time = (props: LastUpdatedResponse) => {
    const { utc, local } = props;
    const utcFmt = useFormattedTime(utc, "UTC");
    const localFmt = useFormattedTime(local);
    return (
        <Tooltip positioning={{ placement: "top" }} openDelay={0} closeDelay={0}>
            <TooltipTrigger asChild>
                <styled.span fontSize="xs" fontWeight="bold" color="fg.emphasized">
                    {localFmt}
                </styled.span>
            </TooltipTrigger>
            <Portal>
                <TooltipPositioner>
                    <TooltipContent bg="kbd-bg" color="kbd-fg">
                        <TooltipArrow>
                            <TooltipArrowTip />
                        </TooltipArrow>
                        <styled.span fontSize="xs" fontWeight="bold" color="fg.emphasized">
                            {utcFmt}
                        </styled.span>
                    </TooltipContent>
                </TooltipPositioner>
            </Portal>
        </Tooltip>
    );
};

export const LastUpdated = (props: StackProps) => {
    const { data, error } = useLastUpdated();
    if (typeof error !== "undefined") {
        console.group("Failed to get last updated time");
        console.error(error);
        console.groupEnd();
    }
    return (
        <Stack direction="column" gap="0.5" justify="center" align="flex-end" {...props}>
            {typeof error !== "undefined" && (
                <styled.span fontSize="xs" color="red">
                    Failed to Retrieve Last Updated Time
                </styled.span>
            )}
            {typeof data !== "undefined" && (
                <>
                    <Time {...data} />
                    <styled.span fontSize="xx-small" display="flex" color="fg.muted">
                        Last Updated
                    </styled.span>
                </>
            )}
        </Stack>
    );
};
