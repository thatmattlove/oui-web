"use client";
import { useEffect, useMemo } from "react";
import { styled, type HTMLStyledProps } from "~/styled-system/jsx";

type AdSenseProps = {
    client: string;
    slot: string;
    layout?: string;
    layoutKey?: string;
    format?: string;
    responsive?: string;
    pageLevelAds?: boolean;
    adTest?: string;
};

type AdSenseDataProps = {
    "data-ad-client": string;
    "data-ad-slot": string;
    "data-ad-layout"?: string;
    "data-ad-layout-key"?: string;
    "data-ad-format"?: string;
    "data-full-width-responsive"?: string;
    "data-adtest"?: string;
};

type AdProps = AdSenseProps & HTMLStyledProps<"div">;

interface WindowWithAdSense extends Window {
    adsbygoogle?: Record<string, unknown>[];
}

function getAdSenseProps(inProps: AdSenseProps): AdSenseDataProps {
    const final = {} as AdSenseDataProps;
    for (const key of Object.keys(inProps)) {
        switch (key) {
            case "client":
                if (typeof inProps[key] !== "undefined") final["data-ad-client"] = inProps[key];
            case "slot":
                if (typeof inProps[key] !== "undefined") final["data-ad-slot"] = inProps[key];
            case "layout":
                if (typeof inProps[key] !== "undefined") final["data-ad-layout"] = inProps[key];
            case "layoutKey":
                if (typeof inProps[key] !== "undefined") final["data-ad-layout-key"] = inProps[key];
            case "format":
                if (typeof inProps[key] !== "undefined") final["data-ad-format"] = inProps[key];
            case "responsive":
                if (typeof inProps[key] !== "undefined")
                    final["data-full-width-responsive"] = inProps[key];
            case "adTest":
                if (typeof inProps[key] !== "undefined") final["data-adtest"] = inProps[key];
        }
    }
    return final;
}

function useAdsense(props: AdSenseProps): AdSenseDataProps {
    const elementProps = useMemo(
        () => getAdSenseProps(props),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                ((window as WindowWithAdSense).adsbygoogle =
                    (window as WindowWithAdSense).adsbygoogle || []).push({
                    google_ad_client: props.client,
                    enable_page_level_ads: true,
                });
            }
        } catch {
            console.log("failed to add google ads object to window");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return elementProps;
}

export const Ad = (props: AdProps) => {
    const { client, slot, layout, layoutKey, format, responsive, pageLevelAds, adTest, ...rest } =
        props;
    const adProps = useAdsense({
        client,
        slot,
        layout,
        layoutKey,
        format,
        responsive,
        pageLevelAds,
        adTest,
    });
    return (
        <styled.div {...rest}>
            <ins {...adProps} />
        </styled.div>
    );
};
