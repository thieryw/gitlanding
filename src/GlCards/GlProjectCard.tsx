/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { GlButton } from "../utils/GlButton";
import { makeStyles, Text } from "../theme";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "../theme";
import { useMergedClasses } from "tss-react";

export type GlProjectCardProps = GlCardProps & {
    projectImageUrl: string;
    badgeLabel?: string;
    badgeColor?: string;
    badgeBackgroundColor?: string;
    title: string;
    subtitle?: string;
    text?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]> & {
        footerText?: string;
    };
};

export const GlProjectCard = memo((props: GlProjectCardProps) => {
    const {
        className,
        text,
        projectImageUrl,
        subtitle,
        title,
        badgeLabel,
        link,
        badgeBackgroundColor,
        badgeColor,
    } = props;

    const { classes, cx } = useStyles({
        badgeColor,
        badgeBackgroundColor,
        projectImageUrl,
    });

    const mergedClasses = useMergedClasses(classes, props.classes);

    return (
        <GlCard link={link} className={cx(mergedClasses.root, className)}>
            <div className={mergedClasses.header}>
                {badgeLabel !== undefined && (
                    <GlButton
                        type="submit"
                        className={mergedClasses.button}
                        variant="ternary"
                        href={link?.href}
                        onClick={link?.onClick}
                    >
                        {badgeLabel}
                    </GlButton>
                )}
            </div>
            <div className={mergedClasses.footer}>
                <Text
                    typo="object heading"
                    className={mergedClasses.footerTitle}
                >
                    {title}
                </Text>
                {subtitle !== undefined && (
                    <Text
                        typo="label 2"
                        className={mergedClasses.footerSubtitle}
                    >
                        {subtitle}
                    </Text>
                )}
                {text !== undefined && (
                    <Text className={props.classes?.footerText} typo="label 2">
                        {text}
                    </Text>
                )}
            </div>
        </GlCard>
    );
});

const useStyles = makeStyles<
    Pick<
        GlProjectCardProps,
        "badgeBackgroundColor" | "badgeColor" | "projectImageUrl"
    >
>()((theme, { badgeBackgroundColor, badgeColor, projectImageUrl }) => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "overflow": "hidden",
        "margin": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return undefined;
            }

            return theme.spacing(1);
        })(),
    },

    "footer": {
        "backgroundColor": theme.isDarkModeEnabled
            ? theme.colors.palette.dark.greyVariant1
            : theme.colors.palette.light.light,
        "padding": [4, 5, 4, 5]
            .map(spacing => `${theme.spacing(spacing)}px`)
            .join(" "),
    },

    "footerTitle": {
        "marginBottom": theme.spacing(1),
    },

    "footerSubtitle": {
        "marginBottom": theme.spacing(1),
    },

    "header": {
        "position": "relative",
        "flex": 1,
        "width": "100%",
        "margin": 0,
        "background": `url("${projectImageUrl}")`,
        "backgroundSize": "cover",
        "backgroundPosition": "center",
        "height": 0,
        "paddingTop": "96%",
    },

    "button": {
        "position": "absolute",
        "top": theme.spacing(3),
        "right": theme.spacing(3),
        "border": "none",
        "backgroundColor": badgeBackgroundColor ?? undefined,
        "color": (() => {
            if (badgeColor !== undefined) {
                return `${badgeColor} !important`;
            }

            return undefined;
        })(),
    },
}));
