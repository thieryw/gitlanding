import { memo } from "react";
import { validateEmail } from "../tools/validateEmail";
import { validatePhoneNumber } from "../tools/validatePhoneNumber";
import Link from "@material-ui/core/Link";
import { makeStyles, Text } from "../theme";

export type GlFooterInfoProps = {
    className?: string;
    email?: string;
    phoneNumber?: string;
};

const useStyles = makeStyles()(theme => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "gap": theme.spacing(1),
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
    },
}));

export const GlFooterInfo = memo((props: GlFooterInfoProps) => {
    const { email, phoneNumber, className } = props;

    if (email !== undefined && !validateEmail(email)) {
        throw new Error("email entered as prop is not valid!");
    }

    if (phoneNumber !== undefined && !validatePhoneNumber(phoneNumber)) {
        throw new Error("phone number not valid!");
    }

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
