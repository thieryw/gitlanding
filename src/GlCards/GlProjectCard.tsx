/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";

import { GlButton } from "../utils/GlButton";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";

export type GlProjectCardProps = GlCardProps & {
    projectImageUrl: string;
    badgeLabel?: string;
    title: string;
    subtitle: string;
    date?: string;
};

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles<{
        projectImageUrl: string;
    }>()((theme, { projectImageUrl }) => ({
        "root": {
            "display": "flex",
            "minHeight": 591,
            ...(theme.responsive.down(1440)
                ? {
                      "minHeight": 412,
                  }
                : {}),
            "flexDirection": "column",
            "overflow": "hidden",
            ...(theme.responsive.down("lg")
                ? {
                      "margin": theme.spacing(1),
                  }
                : {}),
        },

        "footer": {
            "backgroundColor": theme.isDarkModeEnabled
                ? theme.colors.palette.dark.greyVariant1
                : theme.colors.palette.light.light,
            "padding": [2, 3, 2, 3]
                .map(spacing => `${theme.spacing(spacing)}px`)
                .join(" "),
        },

        "footerH5": {
            "marginBottom": theme.spacing(1.25),
        },

        "footerH6": {
            "marginBottom": theme.spacing(1.25),
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

    return { useStyles };
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
    } = props;

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles({ projectImageUrl });

    return (
        <GlCard className={cx(classes.root, className)}>
            <div className={classes.header}>
                <div className={classes.buttonWrapper}>
                    {badgeLabel !== undefined && (
                        <GlButton
                            type="submit"
                            className={classes.badge}
                            href={link?.href}
                            onClick={link?.onClick}
                        >
                            {badgeLabel}
                        </GlButton>
                    )}
                </div>
            </div>
            <div className={classes.footer}>
                <Typography variant="h5" className={classes.footerH5}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" className={classes.footerH6}>
                    {subtitle}
                </Typography>
                {date !== undefined && (
                    <Typography variant="subtitle1">{date}</Typography>
                )}
            </div>
        </GlCard>
    );
});
