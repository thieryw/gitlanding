/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { GlButton } from "../utils/GlButton";
import { makeStyles, Text } from "../theme";
import { GlLogo } from "../utils/GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "../theme";
import { useNumberCountUpAnimation } from "../tools/useNumberCountUpAnimation";

export type GlMetricCardProps = GlCardProps & {
    number?: number;
    iconUrl?: string;
    subHeading?: string;
    buttonLabel?: string;
    hasNumberCountAnimation?: boolean;
};

const useStyles = makeStyles()(theme => ({
    "root": {
        "position": "relative",
        "display": "flex",
        "justifyContent": "space-between",
        "flexDirection": "column",
        "padding": theme.spacing({
            "rightLeft": 3,
            "topBottom": 4,
        }),
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
        "marginBottom": theme.spacing(4),
    },

    "headingMetric": {
        "fontSize": "86px",
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return {};
            }

            return {
                "fontSize": "52px",
            };
        })(),
    },
    "icon": {
        "borderRadius": "50%",
        "padding": theme.spacing(2),
        "backgroundColor": !theme.isDarkModeEnabled
            ? theme.colors.useCases.surfaces.background
            : theme.colors.palette.light.greyVariant1,
        "fill": "orange",
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
        "marginTop": theme.spacing(4),
    },
}));

export const GlMetricCard = memo((props: GlMetricCardProps) => {
    const {
        buttonLabel,
        iconUrl,
        subHeading,
        number,
        className,
        link,
        hasNumberCountAnimation,
    } = props;
    const { classes, cx, theme } = useStyles();

    const numberAnimation = (() => {
        if (!hasNumberCountAnimation) {
            return;
        }

        return useNumberCountUpAnimation({
            "intervalMs": 25,
            number,
        });
    })();

    return (
        <GlCard link={link} className={cx(classes.root, className)}>
            <div className={classes.heading}>
                {number !== undefined && (
                    <Text
                        className={classes.headingMetric}
                        typo="display heading"
                        ref={numberAnimation?.ref ?? undefined}
                    >
                        {numberAnimation
                            ? numberAnimation.renderedNumber
                            : number}
                    </Text>
                )}

                {iconUrl !== undefined && (
                    <GlLogo
                        fill={theme.colors.useCases.buttons.actionHoverPrimary}
                        className={classes.icon}
                        logoUrl={iconUrl}
                    />
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
