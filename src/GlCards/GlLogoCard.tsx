/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { GlLogo } from "../GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";

export type GlLogoCardProps = GlCardProps & {
    iconUrls?: string[];
    title?: string;
    paragraph?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "padding": theme.spacing(3),
            "boxShadow": theme.shadows[1],
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "space-between",
            "alignItems": "center",
            ...(theme.responsive.down("lg")
                ? {
                      "margin": theme.spacing(1),
                  }
                : {}),
        },

        "iconWrapper": {
            "display": "grid",
            "columnGap": theme.spacing(2),
            "gridAutoFlow": "column",
        },

        "icon": {
            "width": 50,
            "height": 50,
            "fill": theme.colors.palette.focus.main,
            "& svg": {
                "width": 50,
                "height": 50,
            },
        },
        "title": {
            "marginTop": theme.spacing(3),
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "18px",
                      "lineHeight": "20px",
                  }
                : {}),
        },

        "paragraph": {
            "marginTop": theme.spacing(3),

            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "16px",
                      "lineHeight": "2Opx",
                  }
                : {}),
        },

        "description": {
            "textAlign": "center",
        },
    }));

    return { useClassNames };
};

export const GlLogoCard = memo((props: GlLogoCardProps) => {
    const { className, iconUrls, link, paragraph, title } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <GlCard link={link} className={cx(classNames.root, className)}>
            {iconUrls && (
                <div className={classNames.iconWrapper}>
                    {iconUrls.map((url, index) => (
                        <GlLogo className={cx(classNames.icon)} logoUrl={url} key={index} />
                    ))}
                </div>
            )}

            <div className={classNames.description}>
                {title !== undefined && (
                    <Typography variant="h4" className={classNames.title}>
                        {title}
                    </Typography>
                )}
                {paragraph !== undefined && (
                    <Typography variant="body1" className={classNames.paragraph}>
                        {paragraph}
                    </Typography>
                )}
            </div>
        </GlCard>
    );
});
