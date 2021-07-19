/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Text } from "./theme";
import { GlImage } from "./utils/GlImage";
import { memo, useEffect } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { useAnimation } from "./utils/useAnimation";

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
            ...(() => {
                const value = theme.spacing(12);
                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                };
            })(),
            ...(theme.responsive.down("sm")
                ? {
                      ...(() => {
                          const value = theme.spacing(4);
                          return {
                              "paddingLeft": value,
                              "paddingRight": value,
                          };
                      })(),
                  }
                : {}),
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
                      "gap": theme.spacing(6),
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

    const { classes, cx } = useStyles({
        backgroundImageSrcLight,
        backgroundImageSrcDark,
        "hasTextAndImage":
            (title !== undefined || subTitle !== undefined) &&
            imageSrc !== undefined,
    });

    const { rootRef, animate } = useAnimation({
        "animationType": "fade",
    });

    useEffect(() => {
        animate();
    }, []);

    return (
        <section className={cx(classes.root, className)}>
            <div className={classes.backgroundDiv}></div>
            <div className={classes.textAndImageWrapper}>
                <div ref={rootRef} className={classes.textWrapper}>
                    {title !== undefined && (
                        <Text className={classes.title} typo="display heading">
                            {title}
                        </Text>
                    )}
                    {subTitle !== undefined && (
                        <Text typo="subtitle" className={classes.subtitle}>
                            {subTitle}
                        </Text>
                    )}
                </div>

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
