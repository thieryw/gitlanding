/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "./theme";
import { GlImage } from "./utils/GlImage";
import { memo, useReducer } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { useSplashScreen } from "onyxia-ui";
import { motion } from "framer-motion";
import { breakpointsValues } from "onyxia-ui";

export type GlHeroProps = {
    title?: string;
    subTitle?: string;
    className?: string;
    imageSrc?: string;
    children?: ReactNode;
};

const useStyles = makeStyles()(theme => ({
    "root": {
        "position": "relative",
        "width": "100%",
    },
    "textAndImageWrapper": {
        "padding": theme.spacing({
            "topBottom": 5,
            "rightLeft": 0,
        }),
        "display": "flex",
        "flexDirection":
            theme.windowInnerWidth >= breakpointsValues.md
                ? undefined
                : "column",
    },

    "title": {
        "marginBottom": theme.spacing(4),
    },
    "subtitle": {
        "marginTop": theme.spacing(4),
        "maxWidth": 650,
        ...(() => {
            if (theme.windowInnerWidth >= 1440) {
                return undefined;
            }
            return theme.typography.variants["body 1"].style;
        })(),
    },

    "textWrapper": {
        "display": "flex",
        "flexDirection": "column",
        "flex": 1,
        "height": (theme.windowInnerWidth / 100) * 40,
        ...(() => {
            const value = theme.spacing(4);
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return {
                    "marginRight": value,
                };
            }

            return {
                "marginBottom": value,
            };
        })(),
    },

    "imageWrapper": {
        "flex": 1.5,
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
    const { title, subTitle, className, imageSrc, children } = props;

    const [, reRender] = useReducer(x => x + 1, 0);

    const { classes, cx } = useStyles();

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
            <div className={classes.textAndImageWrapper}>
                {(title !== undefined || subTitle !== undefined) && (
                    <div className={classes.textWrapper}>
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
                                <HeroText className={classes.title}>
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
                                    className={classes.subtitle}
                                >
                                    {subTitle}
                                </Text>
                            </motion.div>
                        )}
                    </div>
                )}

                {imageSrc !== undefined && (
                    <motion.div
                        className={classes.imageWrapper}
                        variants={animationProps}
                        initial="imageInitial"
                        animate="imageAnimate"
                        transition={{
                            "delay": 1,
                            "duration": 0.5,
                        }}
                    >
                        <GlImage url={imageSrc} alt="hero image" />
                    </motion.div>
                )}
            </div>
            {children}
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
