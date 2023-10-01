import { VStack, Stack } from "~/styled-system/jsx";
import { Form } from "~/components/form";
import { Tip } from "~/components/tip";
import { query } from "./actions";
import { Code } from "~/elements/code";
import { Link } from "~/elements/link";
import { preload } from "~/utils/get-data";
import { InfoCard, InfoCardTitle } from "~/elements/info-card";

export default function Home() {
    preload();
    return (
        <VStack width="100%" alignItems="center" gap={{ base: 8, md: 24 }}>
            <Form action={query} />
            <Stack direction={{ base: "column", md: "row" }} width="100%" justify="center">
                <InfoCard
                    title={
                        <InfoCardTitle>
                            What is <Code textStyle={{ base: "md", md: "lg" }}>oui</Code>?
                        </InfoCardTitle>
                    }
                >
                    Use <Code>oui</Code> to quickly search any MAC Address or{" "}
                    <Link href="https://standards.ieee.org/faqs/regauth/" target="_blank">
                        OUI
                    </Link>{" "}
                    to determine its manufacturer.
                    <Tip mt={1}>You can search more than just one address!</Tip>
                </InfoCard>
                <InfoCard title="Where does the data come from?">
                    <Code>oui</Code> retrieves its data directly from the source: the{" "}
                    <Link
                        href="https://standards.ieee.org/products-programs/regauth/"
                        target="_blank"
                    >
                        IEEE Registration Authority
                    </Link>{" "}
                    MA-L, MA-M, MA-S, IAB, and CID registries.
                </InfoCard>
                <InfoCard title="How frequently is the database updated?">
                    <Code>oui</Code>
                    {` updates its database every 12 hours so you can be sure you're getting the latest information.`}
                </InfoCard>
            </Stack>
        </VStack>
    );
}
