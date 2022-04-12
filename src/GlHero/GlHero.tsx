/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "../theme";
import { GlImage } from "../utils/GlImage";
import { memo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "../theme";
import { useSplashScreen } from "onyxia-ui";
import { motion } from "framer-motion";
import { breakpointsValues } from "../theme";
import { GlArrow } from "../utils/GlArrow";
import type { ImageSource } from "../tools/ImageSource";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useGetScrollableParent } from "../tools/useGetScrollableParent";
import { GlHeroText } from "./GlHeroText";

export type GlHeroProps = {
    className?: string;
    title?: NonNullable<ReactNode>;
    subTitle?: NonNullable<ReactNode>;
    imageSrc?: string;
    imageSources?: ImageSource[];
    hasLinkToSectionBellow?: boolean;
    hasImageShadow?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

const imageId = "imageId";

const textWrapperVariant = {
    "show": {},
    "hidden": { "opacity": 0 },
};

const textVariant = {
    "show": {},
    "hidden": {
        "x": -150,
        "opacity": 0,
    },
};

const imageAnimProps = {
    "transition": {
        "delay": 1,
        "duration": 0.5,
    },
    "initial": {
        "opacity": 0,
    },
    "animate": {},
};

export const GlHero = memo((props: GlHeroProps) => {
    const {
        title,
        subTitle,
        className,
        imageSrc,
        hasLinkToSectionBellow,
        hasImageShadow,
        imageSources,
    } = props;

    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageAspectRatio, setImageAspectRatio] = useState(0);

    const { ref, scrollableParent } = useGetScrollableParent();

    const handleOnImageLoad = useConstCallback(async () => {
        await new Promise<void>(resolve => setTimeout(resolve, 50));
        setIsImageLoaded(true);
    });

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
        setIsAnimationComplete(true);
    });

    useSplashScreen({
        "onHidden": () => {
            if (isImageLoaded && isAnimationComplete) {
                animate();
            }
        },
    });

    useEffect(() => {
        if (!isImageLoaded || isAnimationComplete) {
            return;
        }
        animate();
    }, [isImageLoaded]);

    useEffect(() => {
        const image = document.getElementById(imageId);

        if (!image || image.clientHeight === 0 || imageSrc === undefined) {
            return;
        }

        setImageAspectRatio(image.clientWidth / image.clientHeight);
    }, [isImageLoaded]);

    const onClick = useConstCallback(() => {
        if (!ref.current || scrollableParent === undefined) return;

        scrollableParent.scrollTo({
            "behavior": "smooth",
            "top": ref.current.clientHeight,
        });
    });

    const { classes, cx } = useStyles(
        {
            "hasOnlyText": imageSrc === undefined,
            isImageLoaded,
            imageAspectRatio,
        },
        { props },
    );

    return (
        <section ref={ref} className={cx(classes.root, className)}>
            <div className={classes.textAndImageWrapper}>
                {(title !== undefined || subTitle !== undefined) && (
                    <motion.div
                        variants={textWrapperVariant}
                        initial="hidden"
                        animate="show"
                        className={classes.textWrapper}
                    >
                        {title !== undefined && (
                            <motion.div variants={textVariant}>
                                {typeof title === "string" ? (
                                    <GlHeroText className={classes.title}>
                                        {title}
                                    </GlHeroText>
                                ) : (
                                    title
                                )}
                            </motion.div>
                        )}
                        {subTitle !== undefined && (
                            <motion.div variants={textVariant}>
                                {typeof subTitle === "string" ? (
                                    <Text
                                        typo="subtitle"
                                        className={classes.subtitle}
                                    >
                                        {subTitle}
                                    </Text>
                                ) : (
                                    subTitle
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {imageSrc !== undefined && (
                    <motion.div
                        {...imageAnimProps}
                        className={classes.imageWrapper}
                    >
                        <GlImage
                            id={imageId}
                            className={classes.image}
                            hasShadow={hasImageShadow}
                            url={imageSrc}
                            alt="hero image"
                            imageSources={imageSources}
                            onLoad={handleOnImageLoad}
                        />
                    </motion.div>
                )}
            </div>
            {hasLinkToSectionBellow !== undefined && (
                <div className={classes.linkToSectionBelowWrapper}>
                    <GlArrow
                        onClick={onClick}
                        className={classes.arrow}
                        direction="down"
                        hasCircularBorder={true}
                    />
                </div>
            )}
        </section>
    );
});

const useStyles = makeStyles<{
    hasOnlyText: boolean;
    isImageLoaded: boolean;
    imageAspectRatio: number;
}>({ "name": { GlHero } })(
    (theme, { hasOnlyText, isImageLoaded, imageAspectRatio }) => ({
        "root": {
            "width": "100%",
            "paddingBottom": theme.spacing(7),
            "overflowX": "hidden",
        },
        "arrow": {
            "cursor": "pointer",
        },
        "textAndImageWrapper": {
            "padding": theme.spacing({
                "topBottom": 5,
                "rightLeft": 0,
            }),
            "minHeight": (window.innerHeight / 100) * 70,
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
            "alignItems": hasOnlyText ? "center" : undefined,
            "flexDirection": "column",
            "flex": 1,
            "maxWidth": 1000,
            "display": "flex",
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
            "alignSelf": "center",
            "flex": 1.5,
            ...(() => {
                if (imageAspectRatio === 0) {
                    return {
                        "maxHeight": 700,
                    };
                }
                const value = 650 * imageAspectRatio;

                return {
                    "maxWidth": value > 800 ? 800 : value,
                    "maxHeight": value / imageAspectRatio,
                };
            })(),
        },
        "image": {
            "width": "100%",
        },

        "linkToSectionBelowWrapper": {
            "display": "flex",
            "justifyContent": "center",
            "transition": "opacity 300ms",
            "opacity": isImageLoaded ? 1 : 0,
        },
    }),
);
