/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { GlButton } from "./GlButton";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlCardVariantProps = {
    background?: GlCardVariantProps.Background;
    className?: string;
    footer?: {
        title?: string;
        subTitle?: string;
        date?: string;
    };
    button?: {
        title: string;
        link: {
            href: string;
            onClick?(): void;
        };
        color?: string;
        backgroundColor?: string;
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
        background: GlCardVariantProps["background"];
        button: GlCardVariantProps["button"];
    }>()((theme, { background, button }) => ({
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
        },
        "tagWithBackground": {
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

        "footer": {
            "backgroundColor": theme.isDarkModeEnabled
                ? theme.colors.palette.dark.greyVariant1
                : theme.colors.palette.light.light,
            "paddingLeft": theme.spacing(3),
            "paddingRight": theme.spacing(3),
            "paddingTop": theme.spacing(2),
            "paddingBottom": theme.spacing(2),
            "height": 188,
            ...(theme.responsive.down("lg")
                ? {
                      "height": "unset",
                  }
                : {}),

            "& h5": {
                "marginBottom": theme.spacing(1.25),
            },

            "& h6:nth-child(2)": {
                "marginBottom": 10,
            },
        },
        "header": {
            "flex": 1,
            "width": "100%",
            "margin": 0,
        },
        "buttonWrapper": {
            "display": "flex",
            "justifyContent": "flex-end",
            "& button": {},
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

export const GlCardVariant = memo((props: GlCardVariantProps) => {
    const { className, background, button, footer } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        background,
        button,
    });

    return (
        <div
            className={cx(classNames.root, className)}
            onClick={button?.link.onClick ?? (() => (window.location.href = button?.link.href ?? "#"))}
        >
            <div className={cx(classNames.tagWithBackground, classNames.header)}>
                <div className={classNames.buttonWrapper}>
                    {button !== undefined && (
                        <GlButton {...button.link} className={classNames.button}>
                            {button.title}
                        </GlButton>
                    )}
                </div>
            </div>
            {footer !== undefined && (
                <div className={classNames.footer}>
                    {footer.title !== undefined && <Typography variant="h5">{footer.title}</Typography>}
                    {footer.subTitle !== undefined && (
                        <Typography variant="subtitle1">{footer.subTitle}</Typography>
                    )}
                    {footer.date !== undefined && (
                        <Typography variant="subtitle1">{footer.date}</Typography>
                    )}
                </div>
            )}
        </div>
    );
});
