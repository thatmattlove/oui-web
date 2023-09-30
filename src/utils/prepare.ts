export function prepareSingle(search: string): string {
    return encodeURI(
        search
            .replaceAll(/[^0-9a-f]/gi, "")
            .trim()
            .toLowerCase()
    );
}

export function prepareMultiple(search: string[]): string[] {
    return search.map(prepareSingle).filter((r) => /[0-9a-f]+/gi.test(r));
}
