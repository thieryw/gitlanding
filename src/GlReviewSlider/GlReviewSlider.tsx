import { memo } from "react";
import type { ReactNode } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { getThemeApi } from "../theme";
import { useConstCallback } from "powerhooks";
import Typography from "@material-ui/core/Typography";

import { useGuaranteedMemo } from "powerhooks";
import { Icon } from "../theme";

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles()(theme => ({
        "root": {
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
        "heading": {
            "textAlign": "center",
            "marginBottom": theme.spacing(10),
        },
        "sliderWrapper": {
            "position": "relative",
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
        },
        "viewport": {
            "overflow": "hidden",
            "userSelect": "none",
        },
        "container": {
            "display": "flex",
            "alignItems": "center",
        },

        "arrows": {
            "transition": "transform 300ms",
            ":hover": {
                "transform": "scale(1.2)",
            },
        },
    }));

    return { useStyles };
};

export type GlReviewSliderProps = {
    sliderContent: ReactNode;
    className?: string;
    title?: string;
    children?: ReactNode;
};

export const GlReviewSlider = memo((props: GlReviewSliderProps) => {
    const { sliderContent, className, children, title } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel({ "loop": true });

    const onClickPrev = useConstCallback(
        () => emblaApi && emblaApi.scrollPrev(),
    );
    const onClickNext = useConstCallback(
        () => emblaApi && emblaApi.scrollNext(),
    );

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles();

    return (
        <section className={cx(classes.root, className)}>
            {title !== undefined && (
                <Typography className={classes.heading} variant="h2">
                    {title}
                </Typography>
            )}
            <div className={classes.sliderWrapper}>
                <Icon
                    id="arrowBackIos"
                    className={classes.arrows}
                    onClick={onClickPrev}
                />
                <div className={classes.viewport} ref={emblaRef}>
                    <div className={classes.container}>{sliderContent}</div>
                </div>
                <Icon
                    id="arrowForwardIos"
                    className={classes.arrows}
                    onClick={onClickNext}
                />
            </div>
            {children}
        </section>
    );
});
