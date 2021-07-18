/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";

import { GlButton } from "../utils/GlButton";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { GlLogo } from "../utils/GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";

export type GlMetricCardProps = GlCardProps & {
    number?: number;
    iconUrl?: string;
    subHeading?: string;
    buttonLabel?: string;
};

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles()(theme => ({
        "root": {
            "position": "relative",
            "display": "flex",
            "gap": theme.spacing(2),
            "justifyContent": "space-between",
            "flexDirection": "column",
            "padding": theme.spacing(3),
            ...(theme.responsive.down("lg")
                ? {
                      "margin": theme.spacing(1),
                  }
                : {}),
        },
        "subHeading": {
            "fontWeight": "normal",
            "textAlign": "center",
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "18px",
                      "lineHeight": "28px",
                  }
                : {}),
        },

        "heading": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": theme.spacing(1.7),
        },

        "headingMetric": {
            "fontSize": "86px",
            "lineHeight": "0px",
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "52px",
                      "lineHeight": "60px",
                  }
                : {}),
        },

        "icon": {
            "width": 50,
            "height": 50,
            "fill": theme.colors.palette.focus.main,
        },

        "buttonWrapper": {
            "textAlign": "center",
        },
    }));

    return { useStyles };
};

export const GlMetricCard = memo((props: GlMetricCardProps) => {
    const { buttonLabel, link, className, iconUrl, subHeading, number } = props;

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles();

    return (
        <GlCard className={cx(classes.root, className)} link={link}>
            <div className={classes.heading}>
                {number !== undefined && (
                    <Typography className={classes.headingMetric} variant="h1">
                        {number}
                    </Typography>
                )}

                {iconUrl !== undefined && (
                    <GlLogo className={cx(classes.icon)} logoUrl={iconUrl} />
                )}
            </div>

            {subHeading && (
                <Typography className={classes.subHeading} variant="h3">
                    {subHeading}
                </Typography>
            )}

            {buttonLabel && (
                <div className={classes.buttonWrapper}>
                    <GlButton
                        type="submit"
                        color="secondary"
                        href={link?.href}
                        onClick={link?.onClick}
                    >
                        {buttonLabel}
                    </GlButton>
                </div>
            )}
        </GlCard>
    );
});
