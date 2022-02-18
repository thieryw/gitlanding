/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "./theme";
import { GlImage } from "./utils/GlImage";
import { memo, useMemo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { useSplashScreen } from "onyxia-ui";
import { motion } from "framer-motion";
import { breakpointsValues } from "./theme";
import { GlArrow } from "./utils/GlArrow";
import type { ImageSource } from "./tools/ImageSource";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useMergedClasses } from "tss-react";

export type GlHeroProps = {
    title?: string;
    subTitle?: string;
    className?: string;
    imageSrc?: string;
    imageSources?: ImageSource[];
    linkToSectionBelowId?: string;
    hasImageShadow?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
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
    } = props;

    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageAspectRatio, setImageAspectRatio] = useState(0);
    const [isSplashScreenShown, setIsSplashScreenShown] = useState(true);
    const imageId = useMemo(() => "imageId", []);

    const handleOnImageLoad = useConstCallback(async () => {
        await new Promise<void>(resolve => setTimeout(resolve, 50));
        setIsImageLoaded(true);
    });

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
        setIsAnimationComplete(true);
    });

    useSplashScreen({
        "onHidden": () => {
            setIsSplashScreenShown(false);
            if (isImageLoaded && isAnimationComplete) {
                animate();
            }
        },
    });

    useEffect(() => {
        if (isSplashScreenShown || !isImageLoaded || isAnimationComplete) {
            return;
        }
        animate();
    }, [isImageLoaded, isSplashScreenShown]);

    useEffect(() => {
        const image = document.getElementById(imageId);

        if (!image || image.clientHeight === 0 || imageSrc === undefined) {
            return;
        }

        setImageAspectRatio(image.clientWidth / image.clientHeight);
    }, [isImageLoaded]);

    let { classes, cx } = useStyles({
        "hasOnlyText": imageSrc === undefined,
        isImageLoaded,
        imageAspectRatio,
    });

    classes = useMergedClasses(classes, props.classes);

    return (
        <section className={cx(classes.root, className)}>
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
                                <HeroText className={classes.title}>
                                    {title}
                                </HeroText>
                            </motion.div>
                        )}
                        {subTitle !== undefined && (
                            <motion.div variants={textVariant}>
                                <Text
                                    typo="subtitle"
                                    className={classes.subtitle}
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
            {linkToSectionBelowId !== undefined && (
                <div className={classes.linkToSectionBelowWrapper}>
                    <GlArrow
                        className={classes.arrow}
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
    isImageLoaded: boolean;
    imageAspectRatio: number;
}>({ "name": { GlHero } })(
    (theme, { hasOnlyText, isImageLoaded, imageAspectRatio }) => ({
        "root": {
            "position": "relative",
            "width": "100%",
            "paddingBottom": theme.spacing(7),
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
            "position": "relative",
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
