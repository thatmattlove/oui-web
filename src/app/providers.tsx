"use client";

import { ThemeProvider } from "next-themes";

type ProvidersProps = React.PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
    const { children } = props;
    return (
        <ThemeProvider enableSystem enableColorScheme attribute="data-color-mode">
            {children}
        </ThemeProvider>
    );
};
