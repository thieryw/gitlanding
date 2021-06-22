/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { GlButton } from "../GlButton";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlProjectCardProps = {
    backgroundSurface?: GlCardVariantProps.Background;
    className?: string;
    footer?: {
        title?: string;
        subTitle?: string;
        date?: string;
    };
    button?: {
        title: string;
        color?: string;
        backgroundColor?: string;
    };
    link?: {
        href: string;
        onClick?: () => void;
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
        backgroundSurface: GlProjectCardProps["backgroundSurface"];
        button: GlProjectCardProps["button"];
    }>()((theme, { backgroundSurface, button }) => ({
        "root": {
            "borderRadius": 16,
            "minHeight": 591,
            ...(theme.responsive.down(1440)
                ? {
                      "minHeight": 412,
                  }
                : {}),
            "display": "flex",
            "flexDirection": "column",
            "overflow": "hidden",
            "cursor": "pointer",
            "margin": theme.spacing(1.5),
            ...(theme.responsive.down("lg")
                ? {
                      "margin": theme.spacing(1),
                  }
                : {}),
        },
        "tagWithBackground": {
            "background": (() => {
                if (backgroundSurface === undefined) {
                    return theme.isDarkModeEnabled
                        ? theme.colors.palette.dark.greyVariant3
                        : theme.colors.palette.light.greyVariant3;
                }

                if (backgroundSurface.type === "color") {
                    return backgroundSurface.color;
                }

                return `url(${backgroundSurface.url}) no-repeat center`;
            })(),
            "backgroundSize": "cover",
        },

        "footer": {
            "backgroundColor": theme.isDarkModeEnabled
                ? theme.colors.palette.dark.greyVariant1
                : theme.colors.palette.light.light,
            "paddingLeft": theme.spacing(3),
            "paddingRight": theme.spacing(3),
            "paddingTop": theme.spacing(2),
            "paddingBottom": theme.spacing(2),
            ...(theme.responsive.down("lg")
                ? {
                      "height": "unset",
                  }
                : {}),
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
        },
        "buttonWrapper": {
            "display": "flex",
            "justifyContent": "flex-end",
            ...(() => {
                const value = theme.spacing(2);

                return {
                    "paddingTop": value,
                    "paddingRight": value,
                };
            })(),
        },
        "button":
            button === undefined
                ? {}
                : {
                      "alignSelf": "right",
                      "color": `${button.color} !important`,
                      "borderColor": "unset !important",
                      "backgroundColor": `${button.backgroundColor} !important`,
                      "border": "unset !important",
                  },
    }));

    return { useClassNames };
};

export const GlProjectCard = memo((props: GlProjectCardProps) => {
    const { className, backgroundSurface, button, footer, link } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        backgroundSurface,
        button,
    });

    return (
        <div
            className={cx(classNames.root, className)}
            onClick={link?.onClick ?? (() => (window.location.href = link?.href ?? "#"))}
        >
            <div className={cx(classNames.tagWithBackground, classNames.header)}>
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
        </div>
    );
});
