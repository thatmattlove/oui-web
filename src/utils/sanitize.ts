export function sanitize(value: string): string[] {
    const parts = value
        .split(/(\n|\r|\s)/)
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
