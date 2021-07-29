/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "./theme";
import { GlImage } from "./utils/GlImage";
import { memo } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { useSplashScreen } from "onyxia-ui";
import { useNamedState } from "powerhooks";
import { motion } from "framer-motion";
import { breakpointsValues } from "onyxia-ui";

export type GlHeroProps = {
    title?: string;
    subTitle?: string;
    className?: string;
    imageSrc?: string;
    backgroundImageSrcLight?: string;
    backgroundImageSrcDark?: string;
    children?: ReactNode;
};

const useStyles = makeStyles<{
    backgroundImageSrcLight: GlHeroProps["backgroundImageSrcLight"];
    backgroundImageSrcDark: GlHeroProps["backgroundImageSrcDark"];
    hasTextAndImage: boolean;
}>()(
    (
        theme,
        { backgroundImageSrcLight, hasTextAndImage, backgroundImageSrcDark },
    ) => ({
        "root": {
            "position": "relative",
            "width": "100%",
        },
        "textAndImageWrapper": {
            "display": "grid",
            "gridTemplateColumns": `repeat(${hasTextAndImage ? 2 : 1}, 1fr)`,
            "alignItems": "center",
            "gap": theme.spacing(12),
            ...(() => {
                const value = theme.spacing(10);
                return {
                    "paddingTop": value,
                    "paddingBottom": value,
                };
            })(),
            ...(theme.responsive.down("lg")
                ? {
                      "gridTemplateColumns": undefined,
                      "gridAutoFlow": "row",
                      "gap": theme.spacing(2),
                      "justifyContent": "center",
                  }
                : {}),
        },

        "title": {
            "marginBottom": theme.spacing(4),
        },

        "subtitle": {
            "marginTop": theme.spacing(4),
            "maxWidth": 400,
        },

        "textWrapper": {
            "textAlign":
                hasTextAndImage && theme.responsive.up("lg")
                    ? undefined
                    : "center",
            "alignItems":
                hasTextAndImage && theme.responsive.up("lg")
                    ? undefined
                    : "center",
            "display": "flex",
            "flexDirection": "column",
        },

        "backgroundDiv": {
            "background": `url(${
                theme.isDarkModeEnabled
                    ? backgroundImageSrcDark
                    : backgroundImageSrcLight
            })`,
            "backgroundRepeat": "no-repeat",
            "backgroundSize": "cover",
            "backgroundPosition": "center",
            "width": "100%",
            "height": "100%",
            "position": "absolute",
            "top": 0,
            "left": 0,
            "zIndex": -1,
            "filter": theme.isDarkModeEnabled ? "brightness(0.8)" : undefined,
        },
    }),
);

export const GlHero = memo((props: GlHeroProps) => {
    const {
        title,
        subTitle,
        className,
        backgroundImageSrcLight,
        backgroundImageSrcDark,
        imageSrc,
        children,
    } = props;

    const { setTitleAnimationProps, titleAnimationProps } = useNamedState(
        "titleAnimationProps",
        {},
    );

    const { classes, cx } = useStyles({
        backgroundImageSrcLight,
        backgroundImageSrcDark,
        "hasTextAndImage":
            (title !== undefined || subTitle !== undefined) &&
            imageSrc !== undefined,
    });

    useSplashScreen({
        "onHidden": () => {
            setTitleAnimationProps({
                "opacity": 1,
            });
        },
    });

    return (
        <section className={cx(classes.root, className)}>
            <div className={classes.backgroundDiv}></div>
            <div className={classes.textAndImageWrapper}>
                <motion.div
                    className={classes.textWrapper}
                    initial={{
                        "opacity": 0,
                    }}
                    animate={titleAnimationProps}
                >
                    {title !== undefined && (
                        <HeroText className={classes.title}>{title}</HeroText>
                    )}
                    {subTitle !== undefined && (
                        <Text typo="subtitle" className={classes.subtitle}>
                            {subTitle}
                        </Text>
                    )}
                </motion.div>

                {imageSrc !== undefined && (
                    <div>
                        <GlImage url={imageSrc} alt="hero image" />
                    </div>
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
            "fontSize":
                theme.typography.rootFontSizePx *
                (() => {
                    if (
                        theme.responsive.windowInnerWidth >=
                        breakpointsValues["lg"]
                    ) {
                        return 86 / 16;
                    }

                    return 0;
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
