import { Stack, styled } from "~/styled-system/jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableContainer,
    type TableProps,
} from "~/elements/table";
import { useSearch } from "~/hooks/use-search";
import { Badge, BadgeLink } from "~/elements/badge";

import type { SingleQueryResult, SingleQueryResults } from "~/types/query";

interface ResultsProps extends Omit<TableProps, "results"> {
    results: SingleQueryResults;
    search: string;
}

const MACRange = (
    props: Pick<SingleQueryResult, "oui" | "prefixRangeStart" | "prefixRangeStop">
) => (
    <styled.span>
        <styled.span>{props.oui}</styled.span>:
        <styled.span color="green">{props.prefixRangeStart}</styled.span>-
        <styled.span>{props.oui}</styled.span>:
        <styled.span color="red">{props.prefixRangeStop}</styled.span>
    </styled.span>
);

export const ResultsSingle = (props: ResultsProps) => {
    const { results, search, ...rest } = props;
    const searchDisplay = useSearch(search);
    return (
        <Stack alignItems="center">
            <styled.div display="flex">
                <Badge fontFamily="mono" bg="slate.100" _dark={{ bg: "slate.900" }}>
                    {searchDisplay}
                </Badge>
            </styled.div>
            <TableContainer>
                <Table {...rest}>
                    <TableHeader>
                        <TableRow _hover={{ bg: "unset" }}>
                            <TableHead fontWeight="bold">Organization</TableHead>
                            <TableHead fontWeight="bold">MAC Prefix</TableHead>
                            <TableHead fontWeight="bold">MAC Range</TableHead>
                            <TableHead fontWeight="bold">Registry</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((result) => (
                            <TableRow key={result.prefix}>
                                <TableCell color="slate" fontWeight="bold" textWrap="nowrap">
                                    {result.org}
                                </TableCell>
                                <TableCell fontFamily="mono">{result.prefix}</TableCell>
                                <TableCell fontFamily="mono">
                                    <MACRange
                                        oui={result.oui}
                                        prefixRangeStart={result.prefixRangeStart}
                                        prefixRangeStop={result.prefixRangeStop}
                                    />
                                </TableCell>
                                <TableCell>
                                    <BadgeLink
                                        target="_blank"
                                        href={result.registryUrl}
                                        _hover={{ scale: "110%" }}
                                        transition="scale 50ms ease-in-out"
                                    >
                                        {result.registry}
                                    </BadgeLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
