export function prepareSingle(search: string): string {
    return decodeURI(
        search
            .replaceAll(/[^0-9a-f]/gi, "")
            .trim()
            .toLowerCase()
    );
}

export function prepareMultiple(search: string[]): string {
    return decodeURI(
        search
            .map(prepareSingle)
            .filter((r) => /[0-9a-f]+/gi.test(r))
            .join(",")
    );
}
