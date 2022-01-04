/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "./theme";
import { GlImage } from "./utils/GlImage";
import { memo, useReducer, useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { useSplashScreen } from "onyxia-ui";
import { motion } from "framer-motion";
import { breakpointsValues } from "./theme";
import { GlArrow } from "./utils/GlArrow";
import type { ImageSource } from "./tools/ImageSource";
import { splashScreenState } from "./GlTemplate";
import { useConstCallback } from "powerhooks/useConstCallback";

export type GlHeroProps = {
    title?: string;
    subTitle?: string;
    className?: string;
    imageSrc?: string;
    imageSources?: ImageSource[];
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

export const GlHero = memo((props: GlHeroProps) => {
    const {
        title,
        subTitle,
        className,
        imageSrc,
        linkToSectionBelowId,
        hasImageShadow,
        imageSources,
        classes: classesProp,
    } = props;

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const { isShown } = splashScreenState;

    const textWrapperVariant = useMemo(
        () => ({
            "show": {},
            "hidden": { "opacity": 0 },
        }),
        [],
    );

    const textVariant = useMemo(
        () => ({
            "show": {},
            "hidden": {
                "x": -150,
                "opacity": 0,
            },
        }),
        [],
    );

    const imageAnimProps = useMemo(
        () => ({
            "transition": {
                "delay": 1,
                "duration": 0.5,
            },
            "initial": {
                "opacity": 0,
            },
            "animate": {},
        }),
        [],
    );

    const animate = useConstCallback(() => {
        textWrapperVariant.show = {
            "transition": {
                "staggerChildren": 0.5,
            },
            "opacity": 1,
        };

        textVariant.show = {
            "opacity": 1,
            "x": 0,
            "transition": {
                "duration": 1,
                "ease": "easeOut",
            },
        };

        imageAnimProps.animate = {
            "opacity": 1,
        };
        splashScreenState.isShown = false;
        forceUpdate();
    });

    useSplashScreen({
        "onHidden": () => {
            animate();
            splashScreenState.isShown = false;
        },
    });

    useEffect(() => {
        if (isShown) {
            return;
        }

        animate();
    }, []);

    const { classes, cx } = useStyles({
        "hasOnlyText": imageSrc === undefined,
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
                    <motion.div
                        variants={textWrapperVariant}
                        initial="hidden"
                        animate="show"
                        className={cx(
                            classes.textWrapper,
                            classesProp?.titleAndSubTitleWrapper,
                        )}
                    >
                        {title !== undefined && (
                            <motion.div variants={textVariant}>
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
                            <motion.div variants={textVariant}>
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
                    </motion.div>
                )}

                {imageSrc !== undefined && (
                    <motion.div
                        {...imageAnimProps}
                        className={cx(
                            classes.imageWrapper,
                            classesProp?.imageWrapper,
                        )}
                    >
                        <GlImage
                            className={cx(classes.image, classes.image)}
                            hasShadow={hasImageShadow}
                            height={imageSrc.endsWith(".mp4") ? undefined : 800}
                            url={imageSrc}
                            alt="hero image"
                            imageSources={imageSources}
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

const useStyles = makeStyles<{
    hasOnlyText: boolean;
}>({ "name": { GlHero } })((theme, { hasOnlyText }) => ({
    "root": {
        "position": "relative",
        "width": "100%",
        "paddingBottom": theme.spacing(7),
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

const { HeroText } = (() => {
    type Props = {
        className?: string;
        children: NonNullable<ReactNode>;
    };

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

    const useStyles = makeStyles({ "name": { HeroText } })(theme => ({
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
    return { HeroText };
})();
