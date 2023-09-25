"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "~/elements/button";
import { Spinner } from "~/elements/spinner";
import { Search } from "~/icons/search";
import { Icon } from "~/elements/icon";

export const SubmitButton = (props: ButtonProps) => {
    const { pending } = useFormStatus();
    return (
        <Button w="100%" aria-label="Search" type="submit" {...props}>
            <Icon w="1.25em" h="1.25em">
                {pending ? <Spinner /> : <Search />}
            </Icon>
        </Button>
    );
};
