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
import { Icon } from "~/elements/icon";
import { Alert } from "~/elements/alert";
import { Badge } from "~/elements/badge";
import { WarningIcon } from "~/icons/warning";

import type { SingleQueryResult, MultipleQueryResults } from "~/types/query";

interface ResultsProps extends Omit<TableProps, "results"> {
    results: MultipleQueryResults;
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

export const ResultsMultiple = (props: ResultsProps) => {
    const { results, ...rest } = props;
    return (
        <Stack alignItems="center">
            {Object.keys(results).length === 0 ? (
                <Alert width={{ base: "100%", md: "lg" }} bg="red">
                    <Stack gap="4" direction={{ base: "column", sm: "row" }}>
                        <Icon fill="red">
                            <WarningIcon />
                        </Icon>
                        <Stack gap="1">
                            <styled.h5 fontWeight="medium">No Results Found</styled.h5>
                        </Stack>
                    </Stack>
                </Alert>
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
                                    <TableCell>
                                        <Badge fontFamily="mono" bg="badge.accent">
                                            {oui}
                                        </Badge>
                                    </TableCell>
                                    <TableCell color="slate" fontWeight="bold" textWrap="nowrap">
                                        {def.org}
                                    </TableCell>
                                    <TableCell fontFamily="mono">
                                        <MACRange
                                            oui={def.oui}
                                            prefixRangeStart={def.prefixRangeStart}
                                            prefixRangeStop={def.prefixRangeStop}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Badge>{def.registry}</Badge>
                                    </TableCell>
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
