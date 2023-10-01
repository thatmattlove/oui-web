import { Stack, styled, type StackProps } from "~/styled-system/jsx";

export interface InfoCardProps extends Omit<StackProps, "title"> {
    title: string | React.ReactNode;
    content?: string;
}

export const InfoCardTitle = styled("h3", { base: { textStyle: { base: "md", md: "lg" } } });

export const InfoCard = (props: InfoCardProps) => {
    const { title, content, children, ...rest } = props;
    const child = content || children;
    return (
        <Stack
            align="center"
            bg="bg.subtle"
            justify="center"
            borderRadius="l3"
            p={{ base: "4", lg: "6" }}
            gap={{ base: "6", lg: "8" }}
            maxW={{ base: "100%", md: "md" }}
            {...rest}
        >
            <Stack textAlign="center">
                {typeof title === "string" ? <InfoCardTitle>{title}</InfoCardTitle> : title}
                <styled.div textStyle={{ base: "sm", md: "md" }} color="fg.subtle">
                    {child}
                </styled.div>
            </Stack>
        </Stack>
    );
};
