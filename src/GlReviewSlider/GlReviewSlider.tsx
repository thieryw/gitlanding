import { memo } from "react";
import type { ReactNode } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { makeStyles, Text } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Icon } from "../theme";

const useStyles = makeStyles()(theme => ({
    "root": {
        ...(() => {
            const value = theme.spacing(7);
            return {
                "marginTop": value,
                "marginBottom": value,
            };
        })(),
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

    const { classes, cx } = useStyles();

    return (
        <section className={cx(classes.root, className)}>
            {title !== undefined && (
                <Text className={classes.heading} typo="page heading">
                    {title}
                </Text>
            )}
            <div className={classes.sliderWrapper}>
                <Icon
                    iconId="arrowBackIos"
                    className={classes.arrows}
                    onClick={onClickPrev}
                />
                <div className={classes.viewport} ref={emblaRef}>
                    <div className={classes.container}>{sliderContent}</div>
                </div>
                <Icon
                    iconId="arrowForwardIos"
                    className={classes.arrows}
                    onClick={onClickNext}
                />
            </div>
            {children}
        </section>
    );
});
