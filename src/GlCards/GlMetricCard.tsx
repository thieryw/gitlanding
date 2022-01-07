/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { GlButton } from "../utils/GlButton";
import { makeStyles, Text } from "../theme";
import { GlLogo } from "../utils/GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "../theme";
import { useNumberCountUpAnimation } from "../tools/useNumberCountUpAnimation";
import { useMergedClasses } from "tss-react";

export type GlMetricCardProps = GlCardProps & {
    number?: number;
    iconUrl?: string;
    subHeading?: string;
    buttonLabel?: string;
    isNumberAnimated?: boolean;
    timeIntervalBetweenNumbersMs?: number;
    classes?: Omit<Partial<ReturnType<typeof useStyles>["classes"]>, "root"> & {
        number?: string;
        button?: string;
    };
};

export const GlMetricCard = memo((props: GlMetricCardProps) => {
    const {
        buttonLabel,
        iconUrl,
        subHeading,
        number,
        className,
        link,
        isNumberAnimated,
        timeIntervalBetweenNumbersMs,
    } = props;
    const { classes, cx, theme } = useStyles();
    const mergedClasses = useMergedClasses(classes, props.classes);

    return (
        <GlCard link={link} className={cx(classes.root, className)}>
            <div className={mergedClasses.heading}>
                {number !== undefined && (
                    <Number
                        className={props.classes?.number}
                        isNumberAnimated={isNumberAnimated ?? false}
                        number={number}
                        timeIntervalBetweenNumbersMs={
                            timeIntervalBetweenNumbersMs ?? 25
                        }
                    />
                )}

                {iconUrl !== undefined && (
                    <GlLogo
                        fill={theme.colors.useCases.buttons.actionHoverPrimary}
                        className={mergedClasses.icon}
                        logoUrl={iconUrl}
                    />
                )}
            </div>

            {subHeading && (
                <Text className={mergedClasses.subHeading} typo="subtitle">
                    {subHeading}
                </Text>
            )}

            {buttonLabel && (
                <div className={mergedClasses.buttonWrapper}>
                    <GlButton
                        className={props.classes?.button}
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

const { Number } = (() => {
    type Props = Required<
        Pick<
            GlMetricCardProps,
            "number" | "isNumberAnimated" | "timeIntervalBetweenNumbersMs"
        >
    > & {
        className?: string;
    };

    const Number = memo((props: Props) => {
        const {
            isNumberAnimated,
            number,
            timeIntervalBetweenNumbersMs,
            className,
        } = props;

        const { ref, renderedNumber } = useNumberCountUpAnimation({
            "intervalMs": timeIntervalBetweenNumbersMs,
            number,
        });

        const { classes, cx } = useStyles();

        return (
            <Text
                className={cx(classes.root, className)}
                typo="display heading"
                ref={ref}
            >
                {isNumberAnimated ? renderedNumber : number}
            </Text>
        );
    });

    const useStyles = makeStyles()(theme => ({
        "root": {
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
    }));

    return { Number };
})();
