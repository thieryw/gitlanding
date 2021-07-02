/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */
import { Typography } from "onyxia-ui/Typography";
import { GlImage } from "./utils/GlImage";
import { cx } from "tss-react";
import { memo } from "react";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlHeroProps = {
    title?: string;
    subTitle?: string;
    className?: string;
    imageSrc?: string;
    backgroundImageSrc?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        backgroundImageSrc: GlHeroProps["backgroundImageSrc"];
    }>()((theme, { backgroundImageSrc }) => ({
        "root": {
            "position": "relative",
            "width": "100%",
            "display": "grid",
            "gridTemplateColumns": "repeat(2, 1fr)",
            "alignItems": "center",
            "gap": theme.spacing(12),
            ...(() => {
                const value = theme.spacing(12);
                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                };
            })(),
            ...(theme.responsive.down("lg")
                ? {
                      "gridTemplateColumns": undefined,
                      "gridAutoFlow": "row",
                      "gap": theme.spacing(6),
                  }
                : {}),
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

        "title": {
            "marginBottom": theme.spacing(2),
        },

        "subtitle": {
            "marginTop": theme.spacing(2),
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
    const { title, subTitle, className, backgroundImageSrc, imageSrc } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({ backgroundImageSrc });

    return (
        <section className={cx(classNames.root, className)}>
            <div className={classNames.backgroundDiv}></div>
            <div>
                {title && (
                    <Typography className={classNames.title} variant="h1">
                        {title}
                    </Typography>
                )}
                {subTitle && (
                    <Typography variant="h3" className={classNames.subtitle}>
                        {subTitle}
                    </Typography>
                )}
            </div>

            {imageSrc !== undefined && (
                <GlImage url={imageSrc} alt="hero image" />
            )}
        </section>
    );
});
