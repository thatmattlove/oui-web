"use client";
import { ark } from "@ark-ui/react";
import { styled, HTMLStyledProps } from "~/styled-system/jsx";
import { table, type TableVariantProps } from "~/styled-system/recipes";
import { createStyleContext } from "~/utils/create-style-context";
import { RightArrow } from "~/icons/right-arrow";
import { Icon } from "./icon";

const { withProvider, withContext } = createStyleContext(table);

export type TableProps = TableVariantProps & HTMLStyledProps<typeof ark.table>;

const TableRoot = withProvider(styled(ark.table), "root");
export const TableBody = withContext(styled(ark.tbody), "body");
export const TableCaption = withContext(styled(ark.caption), "caption");
export const TableCell = withContext(styled(ark.td), "cell");
export const TableFooter = withContext(styled(ark.tfoot), "footer");
export const TableHead = withContext(styled(ark.th, { base: { _hover: { bg: "unset" } } }), "head");
export const TableHeader = withContext(styled(ark.thead), "header");
export const TableRow = withContext(styled(ark.tr), "row");

export const TableContainer = styled(ark.div, {
    base: { overflowX: "auto", width: { base: "100%", md: "fit-content" } },
});

export const Table = Object.assign(TableRoot, {
    Root: TableRoot,
    Body: TableBody,
    Caption: TableCaption,
    Cell: TableCell,
    Footer: TableFooter,
    Head: TableHead,
    Header: TableHeader,
    Row: TableRow,
});

export const TableArrow = (props: HTMLStyledProps<"div">) => (
    <styled.div
        display={{ base: "flex", md: "none" }}
        justifyContent="flex-end"
        w="100%"
        opacity={0.5}
        {...props}
    >
        <Icon size="sm">
            <RightArrow />
        </Icon>
    </styled.div>
);
