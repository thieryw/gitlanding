import { useEmblaCarousel } from "embla-carousel/react";
import { createUseClassNames } from "../../theme/useClassesNames";
import { useConstCallback } from "powerhooks";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown";

const { useClassNames } = createUseClassNames()(() => ({
    "root": {
        "position": "relative",
        "width": 1200,
        "marginLeft": "auto",
        "marginRight": "auto",
        "display": "flex",
        "alignItems": "center",
        "@media (max-width: 1280px)": {
            "width": "92%",
        },
        "@media (max-width: 650px)": {
            "width": "98%",
        },
    },
    "viewport": {
        "width": "100%",
        "overflow": "hidden",
        "userSelect": "none",
        "margin": "0 30px 0 30px",
        "padding": "10px 0 10px 0",
        "@media (max-width: 650px)": {
            "margin": 0,
        },
    },
    "container": {
        "display": "flex",
        "alignItems": "center",
    },
    "slide": {
        "position": "relative",
        "minWidth": "100%",
        "padding": "0 30px 0 30px",
        "@media (max-width: 650px)": {
            "padding": "0 2px 0 2px",
        },
    },
    "paper": {
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "space-between",
        "position": "relative",
        "@media (max-width: 1000px)": {
            "flexDirection": "column",
        },

        "& div p": {
            "margin": 40,
            "@media (max-width: 1000px)": {
                "textAlign": "center",
            },
            "@media (max-width: 650px)": {
                "margin": "40px 5px 40px 5px",
            },
        },

        "& div p:nth-of-type(2)": {
            "textAlign": "right",
            "paddingRight": 40,
            "fontStyle": "italic",
            "@media (max-width: 1000px)": {
                "textAlign": "center",
                "paddingRight": 0,
            },
        },
    },

    "logo": {
        "width": 70,
        "marginLeft": 40,
        "@media (max-width: 1000px)": {
            "marginLeft": 0,
            "marginTop": 40,
        },
    },

    "arrows": {
        "transition": "transform 300ms",
        ":hover": {
            "transform": "scale(1.2)",
        },
    },
}));

export type Props = {
    reviews: {
        description: string;
        signature: string;
        logoUrl?: string;
    }[];
};

export const ReviewSlider = (props: Props) => {
    const { reviews } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel({ "loop": true });

    const onClickPrev = useConstCallback(() => emblaApi && emblaApi.scrollPrev());
    const onClickNext = useConstCallback(() => emblaApi && emblaApi.scrollNext());

    const { classNames } = useClassNames({});

    return (
        <div className={classNames.root}>
            <ArrowBackIosIcon className={classNames.arrows} onClick={onClickPrev} />
            <div className={classNames.viewport} ref={emblaRef}>
                <div className={classNames.container}>
                    {reviews.map((review, index) => (
                        <div key={JSON.stringify(review.signature + index)} className={classNames.slide}>
                            <Paper className={classNames.paper}>
                                {review.logoUrl !== undefined && (
                                    <img className={classNames.logo} src={review.logoUrl} alt="logo" />
                                )}
                                <div>
                                    <ReactMarkdown>{review.description}</ReactMarkdown>
                                    <Typography>{review.signature}</Typography>
                                </div>
                            </Paper>
                        </div>
                    ))}
                </div>
            </div>

            <ArrowForwardIosIcon className={classNames.arrows} onClick={onClickNext} />
        </div>
    );
};
