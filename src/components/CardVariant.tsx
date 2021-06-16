/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { Button } from "./Button";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

declare namespace BackgroundProps {
    export type Image = {
        type: "image";
        url: string;
    };

    export type Color = {
        type: "color";
        color: string;
    };
}

type BackgroundProps = BackgroundProps.Color | BackgroundProps.Image;

export type CardVariantProps = {
    background?: BackgroundProps;
    className?: string;
    footer?: {
        title?: string;
        subTitle?: string;
        date?: string;
    };
    button?: {
        title: string;
        href: string;
        color?: string;
        backgroundColor?: string;
    };
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<Omit<CardVariantProps, "className" | "footer">>()(
        (theme, { background, button }) => ({
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
                "& button": {
                    "alignSelf": "right",
                    "color":
                        button?.color === undefined ? "unset !important" : `${button.color} !important`,
                    "borderColor": "unset !important",
                    "backgroundColor":
                        button?.backgroundColor === undefined
                            ? "unset !important"
                            : `${button.backgroundColor} !important`,
                    "border": button?.backgroundColor === undefined ? undefined : "unset !important",
                },
                "paddingTop": theme.spacing(2),
                "paddingRight": theme.spacing(2),
            },
        }),
    );

    return { useClassNames };
};

export const CardVariant = memo((props: CardVariantProps) => {
    const { className, background, button, footer } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        background,
        button,
    });

    return (
        <div className={cx(classNames.root, className)}>
            <div className={cx(classNames.tagWithBackground, classNames.header)}>
                <div className={classNames.buttonWrapper}>
                    {button && <Button href={button.href}>{button.title}</Button>}
                </div>
            </div>

            {footer && (
                <div className={classNames.footer}>
                    {footer.title && <Typography variant="h5">{footer.title}</Typography>}
                    {footer.subTitle && <Typography variant="subtitle1">{footer.subTitle}</Typography>}
                    {footer.date && <Typography variant="subtitle1">{footer.date}</Typography>}
                </div>
            )}
        </div>
    );
});
