/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { GlButton } from "../utils/GlButton";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";

export type GlProjectCardProps = GlCardProps & {
    projectImageUrl: string;
    badgeLabel?: string;
    title: string;
    subtitle: string;
    date?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
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

    return { useClassNames };
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

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({ projectImageUrl });

    return (
        <GlCard className={cx(classNames.root, className)}>
            <div className={classNames.header}>
                <div className={classNames.buttonWrapper}>
                    {badgeLabel !== undefined && (
                        <GlButton
                            type="submit"
                            className={classNames.badge}
                            href={link?.href}
                            onClick={link?.onClick}
                        >
                            {badgeLabel}
                        </GlButton>
                    )}
                </div>
            </div>
            <div className={classNames.footer}>
                <Typography variant="h5" className={classNames.footerH5}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" className={classNames.footerH6}>
                    {subtitle}
                </Typography>
                {date !== undefined && (
                    <Typography variant="subtitle1">{date}</Typography>
                )}
            </div>
        </GlCard>
    );
});
