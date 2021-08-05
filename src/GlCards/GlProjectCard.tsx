/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { GlButton } from "../utils/GlButton";
import { makeStyles, Text } from "../theme";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "onyxia-ui";

export type GlProjectCardProps = GlCardProps & {
    projectImageUrl: string;
    badgeLabel?: string;
    title: string;
    subtitle: string;
    date?: string;
};

const useStyles = makeStyles<{
    projectImageUrl: string;
}>()((theme, { projectImageUrl }) => ({
    "root": {
        "display": "flex",
        "minHeight": (() => {
            if (theme.windowInnerWidth >= 1650) {
                return 591;
            }

            return 412;
        })(),
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
        "flex": 1,
        "width": "100%",
        "margin": 0,
        "background": `url(${projectImageUrl}) no-repeat center`,
        "backgroundSize": "cover",
    },
    "buttonWrapper": {
        "display": "flex",
        "justifyContent": "flex-end",
        "padding": theme.spacing(2),
    },
    "badge": { "alignSelf": "right" },
}));

export const GlProjectCard = memo((props: GlProjectCardProps) => {
    const {
        className,
        date,
        projectImageUrl,
        subtitle,
        title,
        badgeLabel,
        ...rest
    } = props;

    const { classes, cx } = useStyles({ projectImageUrl });

    return (
        <GlCard {...rest} className={cx(classes.root, className)}>
            <div className={classes.header}>
                <div className={classes.buttonWrapper}>
                    {badgeLabel !== undefined && (
                        <GlButton
                            type="submit"
                            className={classes.badge}
                            href={rest.link?.href}
                            onClick={rest.link?.onClick}
                        >
                            {badgeLabel}
                        </GlButton>
                    )}
                </div>
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
