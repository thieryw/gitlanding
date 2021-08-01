/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import type { ReactNode } from "react";
import { Text } from "../theme";
import { makeStyles } from "../theme";
import { breakpointsValues } from "onyxia-ui";

export type GlCardsProps = {
    className?: string;
    title?: string;
    children?: ReactNode;
};

const useStyles = makeStyles()(theme => ({
    "title": {
        "textAlign": "center",
        ...(() => {
            const value = theme.spacing(5);
            return {
                "marginTop": value,
                "marginBottom": value,
            };
        })(),
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return {};
            }
            return {
                "fontSize": "22px",
                "lineHeight": "24px",
            };
        })(),
    },

    "cards": {
        "display": "flex",
        "flexWrap": "wrap",
        "& > *": {
            "flex": (() => {
                if (theme.windowInnerWidth >= 1400) {
                    return "1 1 30%";
                }

                if (theme.windowInnerWidth >= 686) {
                    return "1 1 40%";
                }

                return "1 1 100%";
            })(),
        },
    },
}));

export const GlCards = memo((props: GlCardsProps) => {
    const { title, children, className } = props;

    const { classes } = useStyles();

    return (
        <section className={className}>
            {title && (
                <Text className={classes.title} typo="page heading">
                    {title}
                </Text>
            )}
            <div className={classes.cards}>{children}</div>
        </section>
    );
});
