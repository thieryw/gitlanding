import { memo, useEffect, useRef, useReducer } from "react";
import type { ReactNode } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { makeStyles, Text } from "./theme";
import { Icon } from "./theme";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useEvt } from "evt/hooks/useEvt";
import { Evt } from "evt";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";

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
        "marginBottom": theme.spacing(7),
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
    classes?: {
        title?: string;
        sliderWrapper?: string;
        prev?: string;
        next?: string;
        sliderViewport?: string;
        slideContainer?: string;
        slide?: string;
    };
    title?: string;
    slides?: ReactNode[];
    autoPlayTimeInterval?: number;
};

export const GlSlider = memo((props: GlSliderProps) => {
    const {
        className,
        slides,
        title,
        autoPlayTimeInterval,
        classes: classesProp,
    } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({ "loop": true });
    const isPlaying = useRef(true);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEvt(ctx => {
        if (autoPlayTimeInterval === undefined) {
            return;
        }
        new Map([
            ["blur", false],
            ["focus", true],
        ]).forEach((value, key) => {
            Evt.from(ctx, window, key).attach(() => {
                isPlaying.current = value;
                forceUpdate();
            });
        });
    }, []);

    useEffect(() => {
        if (
            autoPlayTimeInterval === undefined ||
            autoPlayTimeInterval === 0 ||
            emblaApi === undefined
        ) {
            return;
        }

        const interval = setInterval(async () => {
            if (!isPlaying.current) {
                clearInterval(interval);
                return;
            }
            emblaApi.scrollNext();
        }, autoPlayTimeInterval * 1000);
    }, [autoPlayTimeInterval, emblaApi, isPlaying.current]);

    const { ref } = useIntersectionObserver({
        "callback": useConstCallback(({ entry, observer }) => {
            if (
                autoPlayTimeInterval === undefined ||
                autoPlayTimeInterval === 0
            ) {
                observer.unobserve(entry.target);
                return;
            }

            isPlaying.current = entry.isIntersecting;
            forceUpdate();
        }),
    });

    const onClickFactory = useCallbackFactory(
        ([direction]: ["left" | "right"]) => {
            if (emblaApi === undefined) {
                return;
            }

            if (autoPlayTimeInterval !== undefined) {
                isPlaying.current = false;
                forceUpdate();
            }

            switch (direction) {
                case "left":
                    emblaApi.scrollPrev();
                    break;
                case "right":
                    emblaApi.scrollNext();
            }
        },
    );

    const onMouseDown = useConstCallback(() => {
        isPlaying.current = false;
        forceUpdate();
    });

    const { classes, cx } = useStyles();

    return (
        <section ref={ref} className={cx(classes.root, className)}>
            {title !== undefined && (
                <Text
                    className={cx(classes.heading, classesProp?.title)}
                    typo="page heading"
                >
                    {title}
                </Text>
            )}
            <div
                className={cx(
                    classes.sliderWrapper,
                    classesProp?.sliderWrapper,
                )}
            >
                <Icon
                    iconId="arrowBackIos"
                    className={cx(classes.arrows, classesProp?.prev)}
                    onClick={onClickFactory("left")}
                />
                <div
                    className={cx(
                        classes.viewport,
                        classesProp?.sliderViewport,
                    )}
                    ref={emblaRef}
                >
                    <div
                        className={cx(
                            classes.container,
                            classesProp?.slideContainer,
                        )}
                    >
                        {slides !== undefined &&
                            slides.map((slide, index) => (
                                <div
                                    onMouseDown={onMouseDown}
                                    key={index}
                                    className={cx(
                                        classes.slide,
                                        classesProp?.slide,
                                    )}
                                >
                                    {slide}
                                </div>
                            ))}
                    </div>
                </div>
                <Icon
                    iconId="arrowForwardIos"
                    className={cx(classes.arrows, classesProp?.next)}
                    onClick={onClickFactory("right")}
                />
            </div>
        </section>
    );
});
