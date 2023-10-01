import { useEffect, useState, useCallback } from "react";

export function useInputValue() {
    const [value, setValue] = useState<string>("");
    const [isSupported, setSupported] = useState<boolean>(false);

    const readFromClipboard = useCallback(async () => {
        const value = await navigator.clipboard.readText();
        setValue(value);
    }, []);

    useEffect(() => {
        if (typeof navigator !== "undefined") {
            const hasClipboard =
                typeof navigator.clipboard !== "undefined" &&
                typeof navigator.clipboard.readText === "function";
            navigator.permissions
                .query({ name: "clipboard-read" as PermissionName })
                .then((value) => {
                    console.log(value.state);
                    if (value.state !== "denied" && hasClipboard) {
                        if (!isSupported) {
                            setSupported(true);
                        }
                    }
                })
                .catch(() => {
                    if (isSupported && !hasClipboard) {
                        setSupported(false);
                    } else if (!isSupported && hasClipboard) {
                        setSupported(true);
                    }
                });
        }
    }, [isSupported, setSupported]);

    return { value, setValue, isSupported, readFromClipboard };
}
