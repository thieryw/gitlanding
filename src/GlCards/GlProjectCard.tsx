/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { GlButton } from "../utils/GlButton";
import { makeStyles, Text } from "../theme";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "../theme";

export type GlProjectCardProps = GlCardProps & {
    projectImageUrl: string;
    badgeLabel?: string;
    badgeColor?: string;
    badgeBackgroundColor?: string;
    title: string;
    subtitle: string;
    date?: string;
};

export const GlProjectCard = memo((props: GlProjectCardProps) => {
    const {
        className,
        date,
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

    return (
        <GlCard link={link} className={cx(classes.root, className)}>
            <div className={classes.header}>
                {badgeLabel !== undefined && (
                    <GlButton
                        type="submit"
                        className={classes.badge}
                        variant="ternary"
                        href={link?.href}
                        onClick={link?.onClick}
                    >
                        {badgeLabel}
                    </GlButton>
                )}
            </div>
            <div className={classes.footer}>
                <Text typo="object heading" className={classes.footerH5}>
                    {title}
                </Text>
                <Text typo="label 2" className={classes.footerH6}>
                    {subtitle}
                </Text>
                {date !== undefined && <Text typo="label 2">{date}</Text>}
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

    "footerH5": {
        "marginBottom": theme.spacing(1),
    },

    "footerH6": {
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

    "badge": {
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
