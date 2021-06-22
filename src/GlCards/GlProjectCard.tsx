/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { GlButton } from "../GlButton";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";

export type GlProjectCardProps = GlCardProps & {
    background?: GlCardVariantProps.Background;
    footer?: {
        title?: string;
        subTitle?: string;
        date?: string;
    };
    button?: {
        title: string;
    };
};

export declare namespace GlCardVariantProps {
    export type Background = Background.Color | Background.Image;

    export namespace Background {
        export type Image = {
            type: "image";
            url: string;
        };

        export type Color = {
            type: "color";
            color: string;
        };
    }
}

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        background: GlProjectCardProps["background"];
        button: GlProjectCardProps["button"];
    }>()((theme, { background, button }) => ({
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
            "padding": [2, 3, 2, 3].map(spacing => `${theme.spacing(spacing)}px`).join(" "),
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
            "background": (() => {
                if (background === undefined) {
                    return theme.isDarkModeEnabled
                        ? theme.colors.palette.dark.greyVariant3
                        : theme.colors.palette.light.greyVariant3;
                }

                if (background.type === "color") {
                    return background.color;
                }

                return `url(${background.url}) no-repeat center`;
            })(),
            "backgroundSize": "cover",
        },
        "buttonWrapper": {
            "display": "flex",
            "justifyContent": "flex-end",
            "padding": theme.spacing(2),
            /*...(() => {
                const value = theme.spacing(2);

                return {
                    "paddingTop": value,
                    "paddingRight": value,
                };
            })(),*/
        },
        "button":
            button === undefined
                ? {}
                : {
                      "alignSelf": "right",
                  },
    }));

    return { useClassNames };
};

export const GlProjectCard = memo((props: GlProjectCardProps) => {
    const { className, background, button, footer, link } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        background,
        button,
    });

    return (
        <GlCard className={cx(classNames.root, className)}>
            <div className={classNames.header}>
                <div className={classNames.buttonWrapper}>
                    {button !== undefined && (
                        <GlButton
                            type="submit"
                            className={classNames.button}
                            href={link?.href}
                            onClick={link?.onClick}
                        >
                            {button.title}
                        </GlButton>
                    )}
                </div>
            </div>
            {footer !== undefined && (
                <div className={classNames.footer}>
                    {footer.title !== undefined && (
                        <Typography variant="h5" className={classNames.footerH5}>
                            {footer.title}
                        </Typography>
                    )}
                    {footer.subTitle !== undefined && (
                        <Typography variant="subtitle1" className={classNames.footerH6}>
                            {footer.subTitle}
                        </Typography>
                    )}
                    {footer.date !== undefined && (
                        <Typography variant="subtitle1">{footer.date}</Typography>
                    )}
                </div>
            )}
        </GlCard>
    );
});
