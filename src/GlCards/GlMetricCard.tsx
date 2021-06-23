/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { GlButton } from "../GlButton";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { GlLogo } from "../GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";

export type GlMetricCardProps = GlCardProps & {
    heading?: {
        number?: number;
        iconUrl?: string;
    };
    subHeading?: string;
    button?: {
        title: string;
    };
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
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

    return { useClassNames };
};

export const GlMetricCard = memo((props: GlMetricCardProps) => {
    const { button, link, className, heading, subHeading } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        "hasButton": button !== undefined,
    });

    return (
        <GlCard className={cx(classNames.root, className)} link={link}>
            {heading && (
                <div className={classNames.heading}>
                    {heading.number !== undefined && (
                        <Typography
                            className={classNames.headingMetric}
                            variant="h1"
                        >
                            {heading.number}
                        </Typography>
                    )}

                    {heading.iconUrl !== undefined && (
                        <GlLogo
                            className={cx(classNames.icon)}
                            logoUrl={heading.iconUrl}
                        />
                    )}
                </div>
            )}

            {subHeading && (
                <Typography className={classNames.subHeading} variant="h3">
                    {subHeading}
                </Typography>
            )}

            {button && (
                <div className={classNames.buttonWrapper}>
                    <GlButton
                        type="submit"
                        color="secondary"
                        href={link?.href}
                        onClick={link?.onClick}
                    >
                        {button.title}
                    </GlButton>
                </div>
            )}
        </GlCard>
    );
});
