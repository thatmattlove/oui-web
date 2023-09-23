"use client";
import { css } from "~/styled-system/css";
import { token } from "~/styled-system/tokens";
import { IconButton } from "~/elements/icon-button";
import { useTheme } from "next-themes";
import { LightBulb } from "~/icons/light-bulb";
import { useMounted } from "~/hooks/use-mounted";

function useThemeSwitch() {
    const theme = useTheme();
    const { setTheme, resolvedTheme } = theme;

    const mounted = useMounted();
    const isDark = mounted && resolvedTheme === "dark";

    const toggleTheme = () => setTheme(isDark ? "light" : "dark");

    const fill: string = isDark ? token("colors.amber.300") : "currentColor";

    const iconText = isDark ? "Dark" : "Light";

    return {
        isDark,
        fill,
        mounted,
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
    const { fill, iconText, toggleTheme, mounted, isDark } = useThemeSwitch();

    return (
        <IconButton
            w="6"
            h="8"
            variant="ghost"
            className={switchStyle}
            onClick={toggleTheme}
            aria-label={iconText}
            _hover={{ bg: "bg.muted" }}
        >
            <LightBulb style={{ fill }} w="0.8em" h="0.8em" outline={!isDark} />
        </IconButton>
    );
}
