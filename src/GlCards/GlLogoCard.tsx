import type { ReactNode } from "react";
import { memo } from "react";
import { tss, Text } from "../theme";
import { GlLogo } from "../utils/GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "../theme";
import { GlButton } from "../utils/GlButton";

export type GlLogoCardProps = GlCardProps & {
    iconUrls?: string[];
    title?: string;
    paragraph?: NonNullable<ReactNode>;
    buttonLabel?: string;
    overlapIcons?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

export const GlLogoCard = memo((props: GlLogoCardProps) => {
    const {
        className,
        iconUrls,
        paragraph,
        title,
        buttonLabel,
        overlapIcons,
        link,
    } = props;

    const { classes, cx, css } = useStyles({
        "overlapIcons": overlapIcons ?? false,
        "classesOverrides": props.classes,
    });

    return (
        <GlCard link={link} className={cx(classes.root, className)}>
            {iconUrls && (
                <div className={classes.iconWrapper}>
                    {iconUrls
                        .map((url, index) => (
                            <GlLogo
                                className={cx(
                                    classes.icon,
                                    css({
                                        //"zIndex": iconUrls.length - index,
                                        //"order": iconUrls.length - index
                                    }),
                                )}
                                logoUrl={url}
                                key={index}
                            />
                        ))
                        .reverse()}
                </div>
            )}

            <div className={classes.textWrapper}>
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

            {buttonLabel !== undefined && (
                <GlButton
                    type="submit"
                    href={link?.href}
                    variant="secondary"
                    onClick={link?.onClick}
                    className={classes.button}
                >
                    {buttonLabel}
                </GlButton>
            )}
        </GlCard>
    );
});

const useStyles = tss
    .withName({ GlLogoCard })
    .withParams<{
        overlapIcons: boolean;
    }>()
    .create(({ theme, overlapIcons }) => ({
        "root": {
            "padding": theme.spacing({
                "rightLeft": 3,
                "topBottom": 4,
            }),
            "boxShadow": theme.shadows[1],
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "space-between",
            "alignItems": "center",
            "margin": (() => {
                if (theme.windowInnerWidth >= breakpointsValues.lg) {
                    return undefined;
                }

                return theme.spacing(1);
            })(),
        },
        "iconWrapper": {
            "display": "flex",
            "alignItems": "center",
            "transform": "rotate(180deg)",
            ...(overlapIcons
                ? {
                      "marginLeft": -theme.spacing(3),
                  }
                : {}),
        },

        "icon": {
            "transform": "rotate(180deg)",
            ...(!overlapIcons
                ? {
                      ...theme.spacing.rightLeft(
                          "margin",
                          `${theme.spacing(1)}px`,
                      ),
                  }
                : {
                      "marginLeft": -theme.spacing(3),
                  }),
            ...(() => {
                const value = (() => {
                    if (theme.windowInnerWidth >= breakpointsValues.lg) {
                        return 50;
                    }

                    return 40;
                })();

                return {
                    "width": value,
                    "fill": theme.colors.palette.focus.main,
                    "& svg": {
                        "width": value,
                        "height": value,
                    },
                };
            })(),
        },
        "title": {
            "marginTop": theme.spacing(4),
        },
        "paragraph": {
            "marginTop": theme.spacing(4),
        },
        "textWrapper": {
            "textAlign": "center",
            "marginBottom": theme.spacing(4),
        },
        "button": {},
    }));
