"use client";
import { useRef } from "react";
import { track } from "@vercel/analytics";
import { useHotkeys } from "react-hotkeys-hook";
import { Stack, VStack } from "~/styled-system/jsx";
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

export type FormProps = CardProps & {
	action: (args: FormData) => Promise<void>;
};

export const Form = (props: FormProps) => {
	const { children, action, ...rest } = props;
	const formRef = useRef<HTMLFormElement>(null);
	useHotkeys(
		"mod+enter, mod+return",
		() => {
			formRef.current?.requestSubmit();
		},
		{ enableOnFormTags: true },
	);
	const { value, setValue, readFromClipboard, isSupported } = useInputValue();
	const label = isSupported ? "Paste From Clipboard" : "Clipboard Inaccessible";
	return (
		<Card
			mt={{ md: "auto" }}
			mb={{ md: "auto" }}
			width={{ base: "100%", md: "sm" }}
			height={{ base: "xs", md: "unset" }}
			borderWidth={{ base: "0 ", md: "1px" }}
			justifyContent={{ base: "flex-start", md: "unset" }}
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
								autoFocus
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
							<IconButton
								size="lg"
								title={label}
								variant="outline"
								aria-label={label}
								disabled={!isSupported}
								onClick={() => readFromClipboard()}
								_disabled={{ borderColor: "border.emphasized" }}
							>
								<Icon>
									<ClipboardPlus />
								</Icon>
							</IconButton>
						</InputGroup>
					</Stack>
				</CardContent>
				<CardFooter justifyContent="center" gap="3">
					<SubmitButton
						onClick={() => track("lookup", { source: "web-form", value })}
					/>
				</CardFooter>
			</form>
		</Card>
	);
};
