/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "onyxia-ui/Text";
import { GlImage } from "../utils/GlImage";
import { memo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { tss } from "tss";
import { useSplashScreen } from "onyxia-ui";
import { motion } from "framer-motion";
import { breakpointsValues } from "../theme";
import { GlArrow } from "../utils/GlArrow";
import { useConstCallback } from "powerhooks/useConstCallback";
import { getScrollableParent } from "powerhooks/getScrollableParent";
import { GlHeroText } from "./GlHeroText";
import { GlVideo } from "../utils/GlVideo";
import type { IllustrationProps } from "../tools/IllustrationProps";
import { useStateRef } from "powerhooks/useStateRef";
import { useMediaAspectRatio } from "../tools/useMediaAspectRatio";
import { useIllustrationStyles } from "utils/useIllustrationStyles";

export type GlHeroProps = {
    className?: string;
    title?: NonNullable<ReactNode>;
    subTitle?: NonNullable<ReactNode>;
    illustration?: IllustrationProps;
    illustrationZoomFactor?: number;
    hasLinkToSectionBellow?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    hasAnimation?: boolean;
};

const illustrationId = "illustrationId";

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
        hasLinkToSectionBellow,
        illustration,
        hasAnimation,
        illustrationZoomFactor,
    } = props;

    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const ref = useStateRef<HTMLDivElement>(null);

    const { ref: mediaRef, aspectRatio } = useMediaAspectRatio();

    const handleOnIllustrationLoad = useConstCallback(async () => {
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
            if (
                isImageLoaded &&
                isAnimationComplete &&
                (hasAnimation || hasAnimation === undefined)
            ) {
                animate();
            }
        },
    });

    useEffect(() => {
        if (
            !isImageLoaded ||
            isAnimationComplete ||
            (!hasAnimation && hasAnimation !== undefined)
        ) {
            return;
        }
        animate();
    }, [isImageLoaded]);

    const onClick = useConstCallback(() => {
        const element = ref.current;
        if (!element) return;

        getScrollableParent({
            element,
            "doReturnElementIfScrollable": true,
        }).scrollTo({
            "behavior": "smooth",
            "top": element.clientHeight,
        });
    });

    const { classes, cx } = useStyles({
        "hasOnlyText": illustration === undefined,
        isImageLoaded,
        "classesOverrides": props.classes,
    });

    const { classes: illustrationClasses } = useIllustrationStyles({
        illustrationZoomFactor,
        aspectRatio,
        "type": props.illustration?.type,
    });

    return (
        <section ref={ref} className={cx(classes.root, className)}>
            <div className={classes.textAndImageWrapper}>
                {(title !== undefined || subTitle !== undefined) && (
                    <motion.div
                        className={classes.textWrapper}
                        {...(() => {
                            if (!hasAnimation && hasAnimation !== undefined) {
                                return;
                            }
                            return {
                                "variants": textWrapperVariant,
                                "initial": "hidden",
                                "animate": "show",
                            };
                        })()}
                    >
                        {title !== undefined && (
                            <motion.div
                                variants={
                                    hasAnimation || hasAnimation === undefined
                                        ? textVariant
                                        : undefined
                                }
                            >
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
                            <motion.div
                                variants={
                                    hasAnimation || hasAnimation === undefined
                                        ? textVariant
                                        : undefined
                                }
                            >
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

                {illustration !== undefined && (
                    <motion.div
                        {...(hasAnimation || hasAnimation === undefined
                            ? imageAnimProps
                            : undefined)}
                        className={cx(
                            illustrationClasses.root,
                            classes.illustrationWrapper,
                        )}
                    >
                        {(() => {
                            switch (illustration.type) {
                                case "image":
                                    return (
                                        <GlImage
                                            ref={mediaRef}
                                            id={illustrationId}
                                            className={classes.illustration}
                                            alt="hero image"
                                            onLoad={handleOnIllustrationLoad}
                                            {...illustration}
                                        />
                                    );
                                case "video":
                                    return (
                                        <GlVideo
                                            ref={mediaRef}
                                            id={illustrationId}
                                            className={classes.illustration}
                                            onLoad={handleOnIllustrationLoad}
                                            {...illustration}
                                        />
                                    );
                                case "custom component":
                                    return (
                                        <illustration.Component
                                            id={illustrationId}
                                            className={classes.illustration}
                                            onLoad={handleOnIllustrationLoad}
                                        />
                                    );
                            }
                        })()}
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

const useStyles = tss
    .withName({ GlHero })
    .withParams<{
        hasOnlyText: boolean;
        isImageLoaded: boolean;
    }>()
    .create(({ theme, hasOnlyText, isImageLoaded }) => ({
        "root": {
            "width": "100%",
            "paddingBottom": theme.spacing(7),
            ...theme.spacing.rightLeft(
                "padding",
                `${theme.paddingRightLeft}px`,
            ),
        },
        "arrow": {
            "cursor": "pointer",
        },
        "textAndImageWrapper": {
            "margin": theme.spacing({
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
            ...(() => {
                if (theme.windowInnerWidth < breakpointsValues.md) {
                    return undefined;
                }
                return {
                    "maxWidth": 800,
                };
            })(),
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

        "illustrationWrapper": {},

        "illustration": {
            "display": "inline-block", //So that text align center applies
            "width": "100%",
        },

        "linkToSectionBelowWrapper": {
            "display": "flex",
            "justifyContent": "center",
            "transition": "opacity 300ms",
            "opacity": isImageLoaded ? 1 : 0,
        },
    }));
