/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Typography } from "onyxia-ui/Typography";
import { GlImage } from "./utils/GlImage";
import { cx } from "tss-react";
import { memo } from "react";
import type { ReactNode } from "react";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlHeroProps = {
    title?: string;
    subTitle?: string;
    className?: string;
    imageSrc?: string;
    backgroundImageSrc?: string;
    children?: ReactNode;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        backgroundImageSrc: GlHeroProps["backgroundImageSrc"];
        hasTextAndImage: boolean;
    }>()((theme, { backgroundImageSrc, hasTextAndImage }) => ({
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
            ...(theme.responsive.down("lg")
                ? {
                      "gridTemplateColumns": undefined,
                      "gridAutoFlow": "row",
                      "gap": theme.spacing(6),
                  }
                : {}),
        },

        "title": {
            "marginBottom": theme.spacing(2),
        },

        "subtitle": {
            "marginTop": theme.spacing(2),
        },

        "textWrapper": {
            "textAlign": hasTextAndImage ? undefined : "center",
        },

        "backgroundDiv": {
            "background": `url(${backgroundImageSrc})`,
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
    }));

    return { useClassNames };
};

export const GlHero = memo((props: GlHeroProps) => {
    const {
        title,
        subTitle,
        className,
        backgroundImageSrc,
        imageSrc,
        children,
    } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        backgroundImageSrc,
        "hasTextAndImage":
            (title !== undefined || subTitle !== undefined) &&
            imageSrc !== undefined,
    });

    return (
        <section className={cx(classNames.root, className)}>
            <div className={classNames.backgroundDiv}></div>
            <div className={classNames.textAndImageWrapper}>
                <div className={classNames.textWrapper}>
                    {title !== undefined && (
                        <Typography className={classNames.title} variant="h1">
                            {title}
                        </Typography>
                    )}
                    {subTitle !== undefined && (
                        <Typography
                            variant="h3"
                            className={classNames.subtitle}
                        >
                            {subTitle}
                        </Typography>
                    )}
                </div>

                {imageSrc !== undefined && (
                    <GlImage url={imageSrc} alt="hero image" />
                )}
            </div>
            {children}
        </section>
    );
});
