/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import Link from "@material-ui/core/Link";
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

declare namespace ThumbNailProps {
    export type Common = {
        background?: BackgroundProps;
        className?: string;
    };

    export type Small = Common & {
        type: "small";
        href?: string;
        title?: string;
    };

    export type Large = Common & {
        type: "large";
        footer?: {
            title?: string;
            subTitle?: string;
            height?: string | number;
        };
        button?: {
            title: string;
            href: string;
            color?: string;
            backgroundColor?: string;
        };
    };
}

export type ThumbNailProps = ThumbNailProps.Large | ThumbNailProps.Small;

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        thumbNail: Pick<ThumbNailProps.Small, "background"> & {
            type: "small" | "large";
            footerHeight?: string | number;
            buttonColor?: string;
            buttonBackgroundColor?: string;
        };
    }>()((theme, { thumbNail }) => ({
        "root": {
            "borderRadius": 16,
            "cursor": thumbNail.type === "small" ? "pointer" : undefined,
            "height": thumbNail.type === "small" ? 280 : 563,
            "width": thumbNail.type === "small" ? 557 : 412,

            [theme.breakpoints.down("md")]: {
                "width": thumbNail.type === "small" ? 300 : 464,
                "height": thumbNail.type === "small" ? 175 : 352,
            },
        },
        "tagWithBackground": {
            "background": (() => {
                if (thumbNail.background === undefined) {
                    return (() => {
                        if (thumbNail.type === "small") {
                            return theme.isDarkModeEnabled
                                ? theme.colors.palette.dark.greyVariant1
                                : theme.colors.palette.light.light;
                        }

                        return theme.isDarkModeEnabled
                            ? theme.colors.palette.dark.greyVariant3
                            : theme.colors.palette.light.greyVariant3;
                    })();
                }

                if (thumbNail.background.type === "color") {
                    return thumbNail.background.color;
                }

                return `url(${thumbNail.background.url}) no-repeat center`;
            })(),
        },
        "small": {
            "& a": {
                "width": "100%",
                "height": "100%",
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
                "textAlign": "center",
                [theme.breakpoints.down("md")]: {
                    "padding": theme.spacing(3),
                },
            },
            "backgroundSize": thumbNail.background?.type === "image" ? "cover" : undefined,
            "boxShadow": theme.shadows[4],
            "transition": "box-shadow 300ms",
            ":hover": {
                "& a": {
                    "textDecoration": "none",
                },
                "boxShadow": theme.shadows[2],
            },
        },

        "large": {
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "space-between",
            "overflow": "hidden",
        },

        "largeThumbNailFooter": {
            "height": (() => {
                if (thumbNail.footerHeight === undefined) {
                    return 161;
                }

                return thumbNail.footerHeight;
            })(),

            "backgroundColor": theme.isDarkModeEnabled
                ? theme.colors.palette.dark.greyVariant1
                : theme.colors.palette.light.light,

            "paddingLeft": theme.spacing(3),
            "paddingRight": theme.spacing(3),

            "& h5": {
                "marginTop": theme.spacing(2),
                "marginBottom": theme.spacing(1.25),
            },
        },
        "largeThumbNailHeader": {
            "flex": 1,
            "width": "100%",
            "margin": 0,
        },
        "largeThumbNailButtonWrapper": {
            "display": "flex",
            "justifyContent": "flex-end",
            "& button": {
                "alignSelf": "right",
                "color":
                    thumbNail.buttonColor === undefined
                        ? "unset !important"
                        : `${thumbNail.buttonColor} !important`,
                "borderColor": "unset !important",
                "backgroundColor":
                    thumbNail.buttonBackgroundColor === undefined
                        ? "unset !important"
                        : `${thumbNail.buttonBackgroundColor} !important`,
                "border": thumbNail.buttonBackgroundColor === undefined ? undefined : "unset !important",
            },
            "paddingTop": theme.spacing(2),
            "paddingRight": theme.spacing(2),
        },
    }));

    return { useClassNames };
};

export const ThumbNail = memo((props: ThumbNailProps) => {
    const { className, background, type } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        "thumbNail": {
            background,
            type,
            "footerHeight": props.type === "large" ? props.footer?.height : undefined,
            "buttonBackgroundColor": props.type === "large" ? props.button?.backgroundColor : undefined,
            "buttonColor": props.type === "large" ? props.button?.color : undefined,
        },
    });

    return props.type === "small" ? (
        <div className={cx(classNames.tagWithBackground, classNames.root, classNames.small, className)}>
            {props.title && (
                <Link href={props.href}>
                    <Typography variant="h5">{props.title}</Typography>
                </Link>
            )}
        </div>
    ) : (
        <div className={cx(classNames.large, classNames.root, className)}>
            <div className={cx(classNames.tagWithBackground, classNames.largeThumbNailHeader)}>
                <div className={classNames.largeThumbNailButtonWrapper}>
                    {props.button && <Button href={props.button.href}>{props.button.title}</Button>}
                </div>
            </div>

            {props.footer && (
                <div className={classNames.largeThumbNailFooter}>
                    {props.footer.title && <Typography variant="h5">{props.footer.title}</Typography>}
                    {props.footer.subTitle && (
                        <Typography variant="subtitle1">{props.footer.subTitle}</Typography>
                    )}
                </div>
            )}
        </div>
    );
});
