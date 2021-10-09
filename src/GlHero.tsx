/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "./theme";
import { GlImage } from "./utils/GlImage";
import { memo, useReducer } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { useSplashScreen } from "onyxia-ui";
import { motion } from "framer-motion";
import { breakpointsValues } from "./theme";
import { GlArrow } from "./utils/GlArrow";

export type GlHeroProps = {
    title?: string;
    subTitle?: string;
    className?: string;
    imageSrc?: string;
    linkToSectionBelowId?: string;
    hasImageShadow?: boolean;
    classes?: {
        titleAndSubTitleWrapper?: string;
        title?: string;
        subtitle?: string;
        imageWrapper?: string;
        image?: string;
        textAndImageWrapper?: string;
        linkToSectionBelowWrapper?: string;
        linkToSectionBelow?: string;
    };
};

const useStyles = makeStyles<{
    hasOnlyText: boolean;
}>()((theme, { hasOnlyText }) => ({
    "root": {
        "position": "relative",
        "width": "100%",
        "display": "flex",
        "flexDirection": "column",
        "paddingBottom": theme.spacing(7),
        ...theme.spacing.rightLeft("padding", `${theme.paddingRightLeft}px`),
    },
    "textAndImageWrapper": {
        "padding": theme.spacing({
            "topBottom": 5,
            "rightLeft": 0,
        }),
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        ...(theme.windowInnerWidth < breakpointsValues.md
            ? {
                  "flexDirection": "column",
                  "alignItems": "left",
              }
            : {}),
        "marginBottom": theme.spacing(6),
    },

    "title": {
        "marginBottom": theme.spacing(4),
    },
    "subtitle": {
        "marginTop": theme.spacing(4),
        "maxWidth": 650,
        "color": theme.colors.useCases.typography.textSecondary,
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues["lg+"]) {
                return undefined;
            }
            return theme.typography.variants["body 1"].style;
        })(),
    },

    "textWrapper": {
        "textAlign":
            hasOnlyText && theme.windowInnerWidth >= breakpointsValues.sm
                ? "center"
                : undefined,
        "display": "flex",
        "alignItems": hasOnlyText ? "center" : undefined,
        "flexDirection": "column",
        "flex": 1,
        "maxWidth": 1000,
        ...(() => {
            const value = theme.spacing(7);
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return {
                    "marginRight": hasOnlyText ? undefined : value,
                };
            }

            return {
                "marginBottom": value,
            };
        })(),
    },

    "imageWrapper": {
        "position": "relative",
        "flex": 1.5,
        "maxWidth": 800,
        ...(theme.windowInnerWidth < breakpointsValues.md
            ? {
                  "maxWidth": breakpointsValues.md,
              }
            : {}),
    },
    "image": {
        "width": "100%",
    },

    "arrowWrapper": {
        "display": "flex",
        "justifyContent": "center",
    },
}));

const animationProps = {
    "textInitial": {
        "x": -150,
        "opacity": 0,
    },
    "textAnimate": {},
    "imageInitial": {
        "opacity": 0,
    },
    "imageAnimate": {},
};

export const GlHero = memo((props: GlHeroProps) => {
    const {
        title,
        subTitle,
        className,
        imageSrc,
        linkToSectionBelowId,
        hasImageShadow,
        classes: classesProp,
    } = props;

    const [, reRender] = useReducer(x => x + 1, 0);

    const { classes, cx } = useStyles({
        "hasOnlyText": imageSrc === undefined,
    });

    useSplashScreen({
        "onHidden": () => {
            animationProps.textAnimate = {
                "x": 1,
                "opacity": 1,
            };

            animationProps.textInitial.x = 0;
            animationProps.textInitial.opacity = 1;

            animationProps.imageAnimate = {
                "opacity": 1,
            };
            animationProps.imageInitial.opacity = 1;
            reRender();
        },
    });

    return (
        <section className={cx(classes.root, className)}>
            <div
                className={cx(
                    classes.textAndImageWrapper,
                    classesProp?.textAndImageWrapper,
                )}
            >
                {(title !== undefined || subTitle !== undefined) && (
                    <div
                        className={cx(
                            classes.textWrapper,
                            classesProp?.titleAndSubTitleWrapper,
                        )}
                    >
                        {title !== undefined && (
                            <motion.div
                                variants={animationProps}
                                initial="textInitial"
                                animate="textAnimate"
                                transition={{
                                    "duration": 1,
                                    "type": "tween",
                                    "ease": "easeOut",
                                }}
                            >
                                <HeroText
                                    className={cx(
                                        classes.title,
                                        classesProp?.title,
                                    )}
                                >
                                    {title}
                                </HeroText>
                            </motion.div>
                        )}
                        {subTitle !== undefined && (
                            <motion.div
                                variants={animationProps}
                                initial="textInitial"
                                animate="textAnimate"
                                transition={{
                                    "delay": 0.2,
                                    "duration": 1,
                                    "ease": "easeOut",
                                }}
                            >
                                <Text
                                    typo="subtitle"
                                    className={cx(
                                        classes.subtitle,
                                        classesProp?.subtitle,
                                    )}
                                >
                                    {subTitle}
                                </Text>
                            </motion.div>
                        )}
                    </div>
                )}

                {imageSrc !== undefined && (
                    <motion.div
                        className={cx(
                            classes.imageWrapper,
                            classesProp?.imageWrapper,
                        )}
                        variants={animationProps}
                        initial="imageInitial"
                        animate="imageAnimate"
                        transition={{
                            "delay": 1,
                            "duration": 0.5,
                        }}
                    >
                        <GlImage
                            className={cx(classes.image, classes.image)}
                            hasShadow={hasImageShadow}
                            height={imageSrc.endsWith(".mp4") ? undefined : 800}
                            url={imageSrc}
                            alt="hero image"
                        />
                    </motion.div>
                )}
            </div>
            {linkToSectionBelowId !== undefined && (
                <div
                    className={cx(
                        classes.arrowWrapper,
                        classesProp?.linkToSectionBelowWrapper,
                    )}
                >
                    <GlArrow
                        className={classesProp?.linkToSectionBelow}
                        direction="down"
                        hasCircularBorder={true}
                        link={{
                            "href": `#${linkToSectionBelowId}`,
                        }}
                    />
                </div>
            )}
        </section>
    );
});

const { HeroText } = (() => {
    type Props = {
        className?: string;
        children: NonNullable<ReactNode>;
    };

    const useStyles = makeStyles()(theme => ({
        "root": {
            "fontWeight": 700,
            ...(() => {
                const value =
                    (theme.typography.rootFontSizePx / 16) *
                    (() => {
                        if (theme.windowInnerWidth >= breakpointsValues.xl) {
                            return 86;
                        }

                        if (theme.windowInnerWidth >= 600) {
                            return 52;
                        }

                        return 36;
                    })();

                return {
                    "fontSize": value,
                    "lineHeight": `${value}px`,
                };
            })(),
        },
    }));

    const HeroText = memo((props: Props) => {
        const { children, className } = props;

        const { classes, cx } = useStyles();

        return (
            <Text
                className={cx(classes.root, className)}
                htmlComponent="h1"
                typo="body 1"
            >
                {children}
            </Text>
        );
    });

    return { HeroText };
})();
