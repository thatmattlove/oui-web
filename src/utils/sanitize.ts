export function split(value: string): string[] {
    return value.split(/(\r\n|\n\r|\n|\r|\s|,)/);
}
export function sanitize(value: string): string[] {
    const parts = split(value)
        .map((r) =>
            r
                .replaceAll(/[^0-9a-f]/gi, "")
                .trim()
                .toLowerCase()
        )
        .filter((r) => /[0-9a-f]+/gi.test(r))
        .map(decodeURI);
    return parts;
}
