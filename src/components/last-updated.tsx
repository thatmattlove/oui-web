"use client";
import { styled, VStack, type VstackProps } from "~/styled-system/jsx";
import { isQueryError } from "~/types/query";
import { isLastUpdatedResponse, type LastUpdatedResponse } from "~/types/last-updated";
import useSWRImmutable from "swr/immutable";
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

function useLastUpdated(): { data?: LastUpdatedResponse; error?: Error } {
    const url = useMemo(() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/last-updated`);
        url.searchParams.set("tz", tz);
        return url;
    }, []);

    const { data, error } = useSWRImmutable<LastUpdatedResponse, Error>(url, get);
    return { data, error };
}

function useFormattedTime(time: string, tz?: string): string {
    return useMemo(() => {
        const date = Date.parse(time);
        const fmt = new Intl.DateTimeFormat(undefined, {
            dateStyle: "short",
            timeStyle: "long",
            timeZone: tz,
        }).format(date);
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
                    <TooltipContent layerStyle="badge">
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

export const LastUpdated = (props: VstackProps) => {
    const { data, error } = useLastUpdated();
    if (typeof error !== "undefined") {
        console.group("Failed to get last updated time");
        console.error(error);
        console.groupEnd();
    }
    return (
        <VStack gap="0.5" alignItems={{ base: "flex-start", md: "flex-end" }} {...props}>
            {typeof error !== "undefined" && (
                <styled.span fontSize="xs" color="text-red">
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
        </VStack>
    );
};
