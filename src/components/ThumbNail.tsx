/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { createUseClassNames } from "../theme";
import Link from "@material-ui/core/Link";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";
import { Button } from "./Button";

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

declare namespace ThumbNail {
    export type Common = {
        background?: BackgroundProps.Color | BackgroundProps.Image;
        width?: string | number;
        height?: string | number;
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
        };
    };
}

export type ThumbNailProps = ThumbNail.Large | ThumbNail.Small;

const { useClassNames } = createUseClassNames<{
    thumbNail: Pick<ThumbNail.Small, "background" | "width" | "height"> & { type: "small" | "large" };
    largeThumbNail: Pick<ThumbNail.Large, "footer">;
}>()((theme, { largeThumbNail, thumbNail }) => ({
    "root": {
        "borderRadius": 16,
        "cursor": "pointer",
        "height": (() => {
            if (thumbNail.height !== undefined) {
                return thumbNail.height;
            }

            return thumbNail.type === "small" ? 280 : 563;
        })(),
        "width": (() => {
            if (thumbNail.width !== undefined) {
                return thumbNail.width;
            }

            return thumbNail.type === "small" ? 557 : 412;
        })(),
    },
    "tagWithBackground": {
        "background": (() => {
            if (thumbNail.background === undefined) {
                return (() => {
                    if (thumbNail.type === "small") {
                        return theme.isDarkModeEnabled
                            ? theme.colors.palette.dark.greyVariant1
                            : theme.colors.palette.light.greyVariant1;
                    }

                    return theme.isDarkModeEnabled
                        ? theme.colors.palette.light.greyVariant1
                        : theme.colors.palette.dark.greyVariant4;
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
        },
        "backgroundSize": thumbNail.background?.type === "image" ? "cover" : undefined,
    },

    "large": {
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "space-between",
        "overflow": "hidden",
    },

    "largeThumbNailFooter": {
        "height": (() => {
            if (largeThumbNail.footer === undefined) {
                return 0;
            }

            if (largeThumbNail.footer.height !== undefined) {
                return largeThumbNail.footer.height;
            }

            return 161;
        })(),

        "backgroundColor": theme.isDarkModeEnabled ? theme.colors.palette.dark.greyVariant1 : undefined,

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
        },
        "paddingTop": theme.spacing(2),
        "paddingRight": theme.spacing(2),
    },
}));

export const ThumbNail = memo((props: ThumbNailProps) => {
    const { className, height, width, background, type } = props;

    const { classNames } = useClassNames({
        "thumbNail": {
            background,
            height,
            width,
            type,
        },
        "largeThumbNail": {
            "footer": props.type === "large" ? props.footer : undefined,
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
