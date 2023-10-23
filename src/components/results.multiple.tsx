import { Stack, styled } from "~/styled-system/jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableArrow,
    TableContainer,
    type TableProps,
} from "~/elements/table";
import { Alert } from "~/components/alert";
import { Badge, BadgeLink } from "~/elements/badge";
import {
    isError,
    isNotFound,
    type SingleQueryResult,
    type MultipleQueryResults,
} from "~/types/query";

interface ResultsProps extends Omit<TableProps, "results"> {
    results: MultipleQueryResults;
}

const MACRange = (
    props: Pick<SingleQueryResult, "oui" | "prefixRangeStart" | "prefixRangeStop">
) => (
    <styled.span>
        <styled.span>{props.oui}</styled.span>:
        <styled.span color="text-green">{props.prefixRangeStart}</styled.span>-
        <styled.span>{props.oui}</styled.span>:
        <styled.span color="text-red">{props.prefixRangeStop}</styled.span>
    </styled.span>
);

export const ResultsMultiple = (props: ResultsProps) => {
    const { results, ...rest } = props;
    return (
        <Stack alignItems="center">
            {Object.keys(results).length === 0 ? (
                <Alert title="No Results Found" />
            ) : (
                <TableContainer>
                    <Table {...rest}>
                        <TableHeader>
                            <TableRow _hover={{ bg: "unset" }}>
                                <TableHead fontWeight="bold">OUI</TableHead>
                                <TableHead fontWeight="bold">Organization</TableHead>
                                <TableHead fontWeight="bold">MAC Range</TableHead>
                                <TableHead fontWeight="bold">Registry</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(results).map(([oui, def]) => (
                                <TableRow key={oui}>
                                    {isError(def) ? (
                                        <>
                                            <TableCell>
                                                <Badge
                                                    fontFamily="mono"
                                                    layerStyle="badge-critical"
                                                >
                                                    {oui}
                                                </Badge>
                                            </TableCell>
                                            <TableCell
                                                colSpan={3}
                                                color="text-red"
                                                fontWeight="bold"
                                                textWrap="nowrap"
                                            >
                                                {def.error}
                                            </TableCell>
                                        </>
                                    ) : isNotFound(def) ? (
                                        <>
                                            <TableCell>
                                                <Badge layerStyle="badge-warning" fontFamily="mono">
                                                    {oui}
                                                </Badge>
                                            </TableCell>
                                            <TableCell
                                                colSpan={3}
                                                textWrap="nowrap"
                                                color="text-yellow"
                                                fontStyle="italic"
                                                opacity={0.7}
                                            >
                                                Not Found
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>
                                                <Badge fontFamily="mono" layerStyle="badge">
                                                    {oui}
                                                </Badge>
                                            </TableCell>
                                            <TableCell
                                                fontWeight="bold"
                                                textWrap="nowrap"
                                                color="text-slate"
                                            >
                                                {def.org}
                                            </TableCell>
                                            <TableCell fontFamily="mono">
                                                <MACRange
                                                    oui={def.oui}
                                                    prefixRangeStop={def.prefixRangeStop}
                                                    prefixRangeStart={def.prefixRangeStart}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <BadgeLink
                                                    target="_blank"
                                                    href={def.registryUrl}
                                                    _hover={{ scale: "110%" }}
                                                    transition="scale 50ms ease-in-out"
                                                >
                                                    {def.registry}
                                                </BadgeLink>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <TableArrow />
        </Stack>
    );
};
