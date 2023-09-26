"use client";
import { css } from "~/styled-system/css";
import { IconButton } from "~/elements/icon-button";
import { Icon } from "~/elements/icon";
import { useTheme } from "next-themes";
import { LightBulb } from "~/icons/light-bulb";
import { useMounted } from "~/hooks/use-mounted";

function useThemeSwitch() {
    const theme = useTheme();
    const { setTheme, resolvedTheme } = theme;

    const mounted = useMounted();
    const isDark = mounted && resolvedTheme === "dark";

    const toggleTheme = () => setTheme(isDark ? "light" : "dark");

    const iconText = `Turn ${isDark ? "On" : "Off"} the Bright Lights`;

    return {
        isDark,
        iconText,
        toggleTheme,
    };
}

const switchStyle = css({
    px: "2",
    py: "1",
    textStyle: "xl",
    fontWeight: "semibold",
    letterSpacing: "tight",
    rounded: "md",
    _hover: {
        bg: "bg.emphasized.hover",
    },
});

export function ThemeSwitchIconButton() {
    const { iconText, toggleTheme, isDark } = useThemeSwitch();

    return (
        <IconButton
            w="6"
            h="8"
            variant="ghost"
            title={iconText}
            color="slate.600"
            onClick={toggleTheme}
            aria-label={iconText}
            className={switchStyle}
            _hover={{ bg: "bg.muted" }}
            _dark={{ color: "slate.400" }}
        >
            <Icon>
                <LightBulb outline={!isDark} />
            </Icon>
        </IconButton>
    );
}
