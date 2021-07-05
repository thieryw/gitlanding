import { memo } from "react";
import type { ReactNode } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { getThemeApi } from "../theme";
import { useConstCallback } from "powerhooks";
import Typography from "@material-ui/core/Typography";
import { cx } from "tss-react";
import { useGuaranteedMemo } from "powerhooks";
import { Icon } from "../theme";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            ...(() => {
                const value = theme.spacing(12);
                return {
                    "paddingLeft": value,
                    "paddingRight": value,
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
            "width": "800px",
        },
        "container": {
            "display": "flex",
            "alignItems": "center",
        },
        "slide": {
            "position": "relative",
            "minWidth": "100%",
        },

        "arrows": {
            "transition": "transform 300ms",
            ":hover": {
                "transform": "scale(1.2)",
            },
        },
    }));

    return { useClassNames };
};

export type GlReviewSliderProps = {
    slides: ReactNode[];
    className?: string;
    title?: string;
    children?: ReactNode;
};

export const GlReviewSlider = memo((props: GlReviewSliderProps) => {
    const { slides, className, children, title } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel({ "loop": true });

    const onClickPrev = useConstCallback(
        () => emblaApi && emblaApi.scrollPrev(),
    );
    const onClickNext = useConstCallback(
        () => emblaApi && emblaApi.scrollNext(),
    );

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <section className={cx(classNames.root, className)}>
            {title !== undefined && (
                <Typography className={classNames.heading} variant="h2">
                    {title}
                </Typography>
            )}
            <div className={classNames.sliderWrapper}>
                <Icon
                    id="arrowBackIos"
                    className={classNames.arrows}
                    onClick={onClickPrev}
                />
                <div className={classNames.viewport} ref={emblaRef}>
                    <div className={classNames.container}>
                        {slides.map((slide, index) => (
                            <div className={classNames.slide} key={index}>
                                {slide}
                            </div>
                        ))}
                    </div>
                </div>
                <Icon
                    id="arrowForwardIos"
                    className={classNames.arrows}
                    onClick={onClickNext}
                />
            </div>
            {children}
        </section>
    );
});
