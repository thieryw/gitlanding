/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import Link from "@material-ui/core/Link";
import { Typography } from "onyxia-ui/Typography";
import { cx, css } from "tss-react";
import { GlButton } from "./GlButton";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";
import { GlLogo } from "./GlLogo";

export type GlCardProps = {
    className?: string;
    heading?: {
        title?: string;
        iconUrls?: string[];
    };
    subHeading?: string;
    description?: {
        title?: string;
        paragraph?: string;
    };
    button?: {
        className?: string;
        title: string;
        href: string;
    };
    href?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{ numberOfIcons: number; isLink: boolean }>()(
        (theme, { numberOfIcons, isLink }) => ({
            "root": {
                "position": "relative",
                "& a": {
                    "width": "100%",
                    "height": "100%",
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                    "justifyContent": "space-between",
                    ":hover": {
                        "textDecoration": "none",
                    },
                },
                "backgroundColor": theme.isDarkModeEnabled
                    ? theme.colors.palette.dark.greyVariant1
                    : theme.colors.palette.light.light,

                "padding": theme.spacing(3),
                "borderRadius": 16,
                "boxShadow": theme.shadows[1],
                "transition": "box-shadow 200ms",
                ":hover": {
                    "boxShadow": theme.shadows[2],
                    "cursor": isLink ? "pointer" : undefined,
                },
            },
            "subHeading": {
                "fontWeight": "normal",
                "marginTop": theme.spacing(3),
                "marginBottom": theme.spacing(3),
            },

            "button": {
                "color": `${theme.colors.useCases.typography.textPrimary} !important`,
                "backgroundColor": "unset !important",
                "borderColor": "unset !important",
            },

            "heading": {
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
                "gap": theme.spacing(1.7),
                "& h1": {
                    "fontSize": "86px",
                    "lineHeight": "70px",
                },
            },

            "iconWrapper": {
                "display": "grid",
                "columnGap": numberOfIcons < 3 ? theme.spacing(2) : undefined,
                "gridTemplateColumns":
                    numberOfIcons >= 3 ? "repeat(auto-fit,  minmax(10px, max-content))" : undefined,
                "gridAutoFlow": numberOfIcons < 3 ? "column" : undefined,
                "width": numberOfIcons >= 3 ? (numberOfIcons - 1) * 50 : undefined,
            },

            "icon": {
                "width": 50,
                "height": 50,
                "fill": theme.colors.palette.focus.main,
            },

            "description": {
                "textAlign": "center",
                "& h4": {
                    "marginTop": theme.spacing(3),
                },
                "& p": {
                    "marginTop": theme.spacing(3),
                },
            },
        }),
    );

    return { useClassNames };
};

export const GlCard = memo((props: GlCardProps) => {
    const { button, href, className, description, heading, subHeading } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        "numberOfIcons":
            heading !== undefined && heading.iconUrls !== undefined ? heading.iconUrls.length : 0,
        "isLink": href !== undefined,
    });

    return (
        <div className={cx(classNames.root, className)}>
            <Link href={href}>
                {heading && (
                    <div className={classNames.heading}>
                        {heading.title && <Typography variant="h1">{heading.title}</Typography>}

                        {heading.iconUrls && (
                            <div className={classNames.iconWrapper}>
                                {heading.iconUrls.map((url, index) => (
                                    <GlLogo
                                        className={cx(
                                            classNames.icon,
                                            css({
                                                "zIndex":
                                                    heading.iconUrls !== undefined
                                                        ? heading.iconUrls?.length - index
                                                        : undefined,
                                            }),
                                        )}
                                        logoUrl={url}
                                        key={index}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {subHeading && (
                    <Typography className={classNames.subHeading} variant="h3">
                        {subHeading}
                    </Typography>
                )}

                {description && (
                    <div className={classNames.description}>
                        {description.title && <Typography variant="h4">{description.title}</Typography>}
                        {description.paragraph && (
                            <Typography variant="body1">{description.paragraph}</Typography>
                        )}
                    </div>
                )}

                {button && (
                    <GlButton href={button.href} className={cx(classNames.button, button.className)}>
                        {button.title}
                    </GlButton>
                )}
            </Link>
        </div>
    );
});
