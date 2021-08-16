/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { GlButton } from "../utils/GlButton";
import { makeStyles, Text } from "../theme";
import { GlLogo } from "../utils/GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "onyxia-ui";

export type GlMetricCardProps = GlCardProps & {
    number?: number;
    iconUrl?: string;
    subHeading?: string;
    buttonLabel?: string;
};

const useStyles = makeStyles()(theme => ({
    "root": {
        "position": "relative",
        "display": "flex",
        "gap": theme.spacing(4),
        "justifyContent": "space-between",
        "flexDirection": "column",
        "padding": theme.spacing(3),
        "zIndex": 1,
        "margin": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return undefined;
            }

            return theme.spacing(1);
        })(),
    },
    "subHeading": {
        "fontWeight": "normal",
        "textAlign": "center",
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return {};
            }
            return {
                "fontSize": "18px",
                "lineHeight": "28px",
            };
        })(),
    },
    "heading": {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "gap": theme.spacing(2),
    },

    "headingMetric": {
        "fontSize": "86px",
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return {};
            }

            return {
                "fontSize": "52px",
                "lineHeight": "60px",
            };
        })(),
    },
    "icon": {
        ...(() => {
            const value = theme.spacing(6.5);
            return {
                "width": value,
                "height": value,
            };
        })(),
    },
    "buttonWrapper": {
        "textAlign": "center",
    },
}));

export const GlMetricCard = memo((props: GlMetricCardProps) => {
    const { buttonLabel, iconUrl, subHeading, number, className, link } = props;

    const { classes, cx } = useStyles();

    return (
        <GlCard link={link} className={cx(classes.root, className)}>
            <div className={classes.heading}>
                {number !== undefined && (
                    <Text
                        className={classes.headingMetric}
                        typo="display heading"
                    >
                        {number}
                    </Text>
                )}

                {iconUrl !== undefined && (
                    <GlLogo className={cx(classes.icon)} logoUrl={iconUrl} />
                )}
            </div>

            {subHeading && (
                <Text className={classes.subHeading} typo="subtitle">
                    {subHeading}
                </Text>
            )}

            {buttonLabel && (
                <div className={classes.buttonWrapper}>
                    <GlButton
                        type="submit"
                        href={link?.href}
                        variant="secondary"
                        onClick={link?.onClick}
                    >
                        {buttonLabel}
                    </GlButton>
                </div>
            )}
        </GlCard>
    );
});
