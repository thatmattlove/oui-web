import { useEffect, useState, useCallback } from "react";

export function useInputValue() {
    const [value, setValue] = useState<string>("");
    const [isSupported, setSupported] = useState<boolean>(false);

    const readFromClipboard = useCallback(async () => {
        const value = await navigator.clipboard.readText();
        setValue(value);
    }, []);

    useEffect(() => {
        const supported =
            typeof navigator !== "undefined" && typeof navigator.clipboard !== "undefined";

        if (supported !== isSupported) {
            setSupported(supported);
        }
    }, [isSupported, setSupported]);

    return { value, setValue, isSupported, readFromClipboard };
}
