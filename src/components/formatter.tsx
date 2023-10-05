"use client";
import { useCallback, useState, useMemo } from "react";
import { Stack, VStack } from "~/styled-system/jsx";
import { Input } from "~/elements/input";
import { MACFormatter } from "~/utils/format-mac";
import { prepareSingle } from "~/utils/prepare";
import { Label } from "~/elements/label";
import { InputGroup } from "~/elements/input-group";
import { IconButton } from "~/elements/icon-button";
import { Icon } from "~/elements/icon";
import { ClipboardCopy } from "~/icons/clipboard-copy";
import { Check } from "~/icons/check";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitleH3,
    CardDescriptionH4,
    type CardProps,
} from "~/elements/card";
import useClipboard from "react-use-clipboard";

interface FormatterProps extends CardProps {
    initial?: string;
}

interface FormattedInputProps {
    name: string;
    value: string;
    label: string;
}

const FormattedInput = (props: FormattedInputProps) => {
    const { name, label, value } = props;
    const [isCopied, setCopied] = useClipboard(value, { successDuration: 750 });
    return (
        <Stack w="100%">
            <Label htmlFor={name}>{label}</Label>
            <InputGroup>
                <Input
                    disabled
                    opacity={1}
                    name={name}
                    value={value}
                    cursor="default"
                    color="fg.subtle"
                    fontFamily="mono"
                />
                <IconButton aria-label="Copy to Clipboard" onClick={setCopied} variant="outline">
                    <Icon
                        w="1em"
                        h="1em"
                        position="absolute"
                        opacity={isCopied ? "0" : "1"}
                        transition="opacity ease 150ms"
                    >
                        <ClipboardCopy />
                    </Icon>
                    <Icon
                        w="1em"
                        h="1em"
                        fill="green"
                        position="absolute"
                        opacity={isCopied ? "1" : "0"}
                        transition="opacity ease 150ms"
                    >
                        <Check />
                    </Icon>
                </IconButton>
            </InputGroup>
        </Stack>
    );
};

function useFormatter(initial: string) {
    const [value, _setValue] = useState<string>(initial);
    const formatter = useMemo(() => new MACFormatter(value), [value]);
    const withColons = useMemo(() => formatter.withColons(), [formatter]);
    const withDots = useMemo(() => formatter.withDots(), [formatter]);
    const withDashes = useMemo(() => formatter.withDashes(), [formatter]);
    const setValue = useCallback((newValue: string) => {
        const clean = prepareSingle(newValue);
        _setValue(clean);
    }, []);
    return { value, setValue, withColons, withDots, withDashes };
}

export const Formatter = (props: FormatterProps) => {
    const { initial = "", ...rest } = props;
    const { value, setValue, withColons, withDashes, withDots } = useFormatter(initial);
    return (
        <Card
            maxWidth="100%"
            width={{ base: "100%", md: "sm" }}
            height={{ base: "xs", md: "unset" }}
            borderWidth={{ base: "0 ", md: "1px" }}
            justifyContent={{ base: "space-evenly", md: "unset" }}
            {...rest}
        >
            <CardHeader alignItems="center" gap={2}>
                <CardTitleH3>MAC Address Formatter</CardTitleH3>
                <CardDescriptionH4 color="fg.subtle">
                    Convert between common MAC address formats
                </CardDescriptionH4>
            </CardHeader>
            <CardContent gap="4" flex={{ base: "0 0 0%", md: "unset" }}>
                <VStack alignItems="center" gap={{ base: 2, md: 8 }}>
                    <Input
                        name="mac"
                        autoFocus
                        value={value}
                        fontFamily="mono"
                        aria-label="MAC Address"
                        placeholder="00:53:00:00:b3:3f"
                        onChange={(e) => setValue(e.currentTarget.value)}
                    />
                    <FormattedInput name="with-colons" label="With Colons" value={withColons} />
                    <FormattedInput name="with-dots" label="With Dots" value={withDots} />
                    <FormattedInput name="with-dashes" label="With Dashes" value={withDashes} />
                </VStack>
            </CardContent>
        </Card>
    );
};
