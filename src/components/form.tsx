"use client";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Stack } from "~/styled-system/jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    type CardProps,
} from "~/elements/card";
import { Textarea } from "~/elements/textarea";
import { SubmitButton } from "~/components/submit-button";

export type FormProps = CardProps & { action: (args: FormData) => Promise<void> };

export const Form = (props: FormProps) => {
    const { children, action, ...rest } = props;
    const formRef = useRef<HTMLFormElement>(null);
    useHotkeys(
        "mod+enter, mod+return",
        () => {
            formRef.current?.requestSubmit();
        },
        { enableOnFormTags: true }
    );
    return (
        <Card
            borderWidth={{ base: "0 ", md: "1px" }}
            width={{ base: "100%", md: "sm" }}
            height={{ base: "md", md: "unset" }}
            justifyContent={{ base: "space-evenly", md: "unset" }}
            {...rest}
        >
            <form action={action} autoComplete="off" ref={formRef}>
                <CardHeader alignItems="center" gap={2}>
                    <CardTitle fontFamily="mono" fontSize="3xl">
                        oui
                    </CardTitle>
                    <CardDescription color="fg.subtle" fontSize="xs">
                        MAC Address Vendor Lookup
                    </CardDescription>
                </CardHeader>
                <CardContent gap="4" flex={{ base: "0 0 0%", md: "unset" }}>
                    <Stack gap="1.5">
                        {children}
                        <Textarea
                            rows={1}
                            required
                            size="lg"
                            name="mac"
                            paddingY={4}
                            minLength={6}
                            resize="none"
                            fontFamily="mono"
                            scrollbar="hidden"
                            textAlign="center"
                            aria-label="MAC Address"
                            autoComplete="new-password"
                            placeholder="00:53:00:00:b3:3f"
                        />
                    </Stack>
                </CardContent>
                <CardFooter justifyContent="center" gap="3">
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
};
