import { Stack } from "~/styled-system/jsx";
import { Button } from "~/elements/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    type CardProps,
} from "~/elements/card";
import { Input } from "~/elements/input";
import { Search } from "~/icons/search";

export const Form = (props: CardProps) => {
    return (
        <Card width="sm" {...props}>
            <CardHeader alignItems="center" gap={2}>
                <CardTitle fontFamily="mono" fontSize="3xl">
                    oui
                </CardTitle>
                <CardDescription fontSize="xs">MAC Address Vendor Lookup</CardDescription>
            </CardHeader>
            <CardContent gap="4">
                <Stack gap="1.5">
                    <Input
                        id="mac"
                        size="lg"
                        type="text"
                        fontFamily="mono"
                        textAlign="center"
                        aria-label="MAC Address"
                        placeholder="00:53:00:b3:3f"
                    />
                </Stack>
            </CardContent>
            <CardFooter justifyContent="center" gap="3">
                <Button w="100%" aria-label="Search">
                    <Search w="1.25em" h="1.25em" />
                </Button>
            </CardFooter>
        </Card>
    );
};
