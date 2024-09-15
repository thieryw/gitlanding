import { memo } from "react";
import Link from "@mui/material/Link";
import { tss } from "../tss";
import { Text } from "onyxia-ui/Text";

export type GlFooterInfoProps = {
    className?: string;
    email?: string;
    phoneNumber?: string;
};

export const GlFooterInfo = memo((props: GlFooterInfoProps) => {
    const { email, phoneNumber, className } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            {email !== undefined && (
                <Link className={classes.email} href={`mailto:${email}`}>
                    {email}
                </Link>
            )}

            {phoneNumber !== undefined && (
                <Text typo="body 2">{phoneNumber}</Text>
            )}
        </div>
    );
});

const useStyles = tss.withName({ GlFooterInfo }).create(({ theme }) => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        ...(() => {
            const value = theme.spacing(4);

            return {
                "paddingTop": value,
                "paddingBottom": value,
            };
        })(),
    },
    "email": {
        "color": theme.colors.useCases.typography.textSecondary,
        "marginBottom": theme.spacing(1),
        "textDecoration": "none",
    },
}));
