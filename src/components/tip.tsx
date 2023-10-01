import { Badge, type BadgeProps } from "~/elements/badge";
import { Stars } from "~/icons/stars";
import { Icon } from "~/elements/icon";

export const Tip = (props: BadgeProps) => {
    const { children, ...rest } = props;
    return (
        <Badge
            variant="outline"
            borderWidth="1px"
            borderColor="green.600"
            color="green.600"
            _dark={{
                borderColor: "green.300",
                color: "green.300",
            }}
            borderRadius="l3"
            {...rest}
        >
            <Icon size="xs">
                <Stars />
            </Icon>
            {children}
        </Badge>
    );
};
