import { memo, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { makeStyles, Text } from "./theme";
import { Icon } from "./theme";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";

const useStyles = makeStyles()(theme => ({
    "root": {
        ...(() => {
            const value = theme.spacing(7);
            return {
                "marginTop": value,
                "marginBottom": value,
            };
        })(),
        ...theme.spacing.rightLeft("padding", `${theme.paddingRightLeft}px`),
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
    "slide": {
        "position": "relative",
        "minWidth": "100%",
        "display": "flex",
        "justifyContent": "center",
        "overflow": "hidden",
        "padding": theme.spacing({
            "rightLeft": 4,
            "topBottom": 4,
        }),
    },
}));

export type GlSliderProps = {
    className?: string;
    title?: string;
    slides?: ReactNode[];
    autoPlayTimeInterval?: number;
};

export const GlSlider = memo((props: GlSliderProps) => {
    const { className, slides, title, autoPlayTimeInterval } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({ "loop": true });
    const evtHasArrowBeenPressedRef = useRef(false);

    useEffect(() => {
        if (autoPlayTimeInterval === undefined || emblaApi === undefined) {
            return;
        }

        const interval = setInterval(() => {
            if (evtHasArrowBeenPressedRef.current) {
                clearInterval(interval);
                return;
            }
            emblaApi.scrollNext();
        }, autoPlayTimeInterval);
    }, [autoPlayTimeInterval, emblaApi]);

    const onClickFactory = useCallbackFactory(
        ([direction]: ["left" | "right"]) => {
            if (emblaApi === undefined) {
                return;
            }
            evtHasArrowBeenPressedRef.current = true;

            switch (direction) {
                case "left":
                    emblaApi.scrollPrev();
                    break;
                case "right":
                    emblaApi.scrollNext();
            }
        },
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
                    onClick={onClickFactory("left")}
                />
                <div className={classes.viewport} ref={emblaRef}>
                    <div className={classes.container}>
                        {slides !== undefined &&
                            slides.map((slide, index) => (
                                <div key={index} className={classes.slide}>
                                    {slide}
                                </div>
                            ))}
                    </div>
                </div>
                <Icon
                    iconId="arrowForwardIos"
                    className={classes.arrows}
                    onClick={onClickFactory("right")}
                />
            </div>
        </section>
    );
});
