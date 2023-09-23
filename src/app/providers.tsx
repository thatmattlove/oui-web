"use client";

import { ThemeProvider } from "next-themes";

export const Providers = (props: React.PropsWithChildren) => (
    <ThemeProvider enableSystem enableColorScheme attribute="data-color-mode" {...props} />
);
