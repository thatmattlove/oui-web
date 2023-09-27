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
import { IconButton } from "~/elements/icon-button";
import { ClipboardPlus } from "~/icons/clipboard-plus";
import { Icon } from "~/elements/icon";
import { InputGroup } from "~/elements/input-group";
import { useInputValue } from "~/hooks/use-input-value";
import { Portal } from "@ark-ui/react";
import {
    Tooltip,
    TooltipArrow,
    TooltipArrowTip,
    TooltipContent,
    TooltipPositioner,
    TooltipTrigger,
} from "~/elements/tooltip";

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
    const { value, setValue, readFromClipboard, isSupported } = useInputValue();
    return (
        <Card
            width={{ base: "100%", md: "sm" }}
            height={{ base: "md", md: "unset" }}
            borderWidth={{ base: "0 ", md: "1px" }}
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
                    <Stack>
                        {children}
                        <InputGroup size="lg">
                            <Textarea
                                rows={1}
                                required
                                size="lg"
                                name="mac"
                                minLength={6}
                                resize="none"
                                value={value}
                                fontFamily="mono"
                                scrollbar="hidden"
                                textAlign="center"
                                aria-label="MAC Address"
                                autoComplete="new-password"
                                placeholder="00:53:00:00:b3:3f"
                                onInput={(e) => setValue(e.currentTarget.value)}
                            />
                            <Tooltip
                                positioning={{ placement: "right" }}
                                openDelay={0}
                                closeDelay={0}
                            >
                                <TooltipTrigger asChild>
                                    <IconButton
                                        disabled={!isSupported}
                                        _disabled={{ borderColor: "border.emphasized" }}
                                        size="lg"
                                        variant="outline"
                                        onClick={() => readFromClipboard()}
                                        aria-label={
                                            isSupported
                                                ? "Paste From Clipboard"
                                                : "Clipboard Inaccessible"
                                        }
                                    >
                                        <Icon>
                                            <ClipboardPlus />
                                        </Icon>
                                    </IconButton>
                                </TooltipTrigger>
                                <Portal>
                                    <TooltipPositioner>
                                        <TooltipContent bg="kbd-bg" color="kbd-fg">
                                            <TooltipArrow>
                                                <TooltipArrowTip />
                                            </TooltipArrow>
                                            {isSupported
                                                ? "Paste From Clipboard"
                                                : "Clipboard Inaccessible"}
                                        </TooltipContent>
                                    </TooltipPositioner>
                                </Portal>
                            </Tooltip>
                        </InputGroup>
                    </Stack>
                </CardContent>
                <CardFooter justifyContent="center" gap="3">
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
};
