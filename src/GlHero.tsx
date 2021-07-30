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
import type { CSSObject } from "tss-react";

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
            "gap": theme.spacing(4),
            "padding": theme.spacing(5, 0),
            ...(theme.responsive.down("md")
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
            "maxWidth": 650,
            ...(theme.responsive.windowInnerWidth < 1440
                ? {
                      "fontSize":
                          theme.typography.variants["body 1"].style.fontSize,
                      "fontWeight":
                          theme.typography.variants["body 1"].style.fontWeight,
                      "lineHeight":
                          theme.typography.variants["body 1"].style.lineHeight,
                      "maxWidth": 460,
                  }
                : {}),
        },

        "textWrapper": {
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
            "width": "100vw",
            "height": "100%",
            "position": "absolute",
            "top": 0,
            "left": -theme.spacing(7),
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
            "fontWeight": 700,
            ...((): CSSObject => {
                let value = theme.typography.rootFontSizePx * (86 / 16);

                if (
                    theme.responsive.windowInnerWidth < 1440 &&
                    theme.responsive.windowInnerWidth >= 600
                ) {
                    value = theme.typography.rootFontSizePx * (52 / 16);
                }

                if (theme.responsive.windowInnerWidth < 600) {
                    value = theme.typography.rootFontSizePx * (36 / 16);
                }

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
