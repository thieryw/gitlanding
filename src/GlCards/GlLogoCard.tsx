/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { makeStyles, Text } from "../theme";
import { GlLogo } from "../utils/GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";

export type GlLogoCardProps = GlCardProps & {
    iconUrls?: string[];
    title?: string;
    paragraph?: string;
};

const useStyles = makeStyles()(theme => ({
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

export const GlLogoCard = memo((props: GlLogoCardProps) => {
    const { className, iconUrls, link, paragraph, title } = props;

    const { classes, cx } = useStyles();

    return (
        <GlCard link={link} className={cx(classes.root, className)}>
            {iconUrls && (
                <div className={classes.iconWrapper}>
                    {iconUrls.map((url, index) => (
                        <GlLogo
                            className={cx(classes.icon)}
                            logoUrl={url}
                            key={index}
                        />
                    ))}
                </div>
            )}

            <div className={classes.description}>
                {title !== undefined && (
                    <Text typo="section heading" className={classes.title}>
                        {title}
                    </Text>
                )}
                {paragraph !== undefined && (
                    <Text typo="body 1" className={classes.paragraph}>
                        {paragraph}
                    </Text>
                )}
            </div>
        </GlCard>
    );
});
