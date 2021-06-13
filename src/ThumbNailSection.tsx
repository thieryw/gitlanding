import { memo } from "react";
import { ThumbNail } from "./components/ThumbNail";
import type { ThumbNailProps } from "./components/ThumbNail";
import { Typography } from "onyxia-ui";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";

export type ThumbNailSectionProps = {
    className?: string;
    title?: string;
    thumbNails?: ThumbNailProps[];
    /**
     * specify the maximum screen width in witch the thumbnails
     * are displayed as columns.
     */
    breakpointForColumnDisplay?: number;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<
        Pick<ThumbNailSectionProps, "breakpointForColumnDisplay">
    >()((theme, { breakpointForColumnDisplay }) => ({
        "title": {
            "textAlign": "center",
            "marginBottom": theme.spacing(7.5),
            "marginTop": theme.spacing(17.25),
        },
        "thumbNails": {
            "display": "flex",
            "flexWrap": "wrap",
            "justifyContent": "center",
            [theme.breakpoints.down(
                breakpointForColumnDisplay !== undefined ? breakpointForColumnDisplay : "sm",
            )]: {
                "flexDirection": "column",
                "alignItems": "center",
                "paddingLeft": theme.spacing(4.5),
                "paddingRight": theme.spacing(4.5),
            },
        },
        "thumbNail": {
            "margin": theme.spacing(1.5),
            [theme.breakpoints.down(
                breakpointForColumnDisplay !== undefined ? breakpointForColumnDisplay : "sm",
            )]: {
                "width": "100%",
                "margin": [1.5, 0, 1.5, 0].map(spacing => `${theme.spacing(spacing)}px`).join(" "),
            },
        },
    }));

    return { useClassNames };
};
export const ThumbNailSection = memo((props: ThumbNailSectionProps) => {
    const { title, thumbNails, className, breakpointForColumnDisplay } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({ breakpointForColumnDisplay });

    return (
        <section className={className}>
            {title && (
                <Typography className={classNames.title} variant="h2">
                    {title}
                </Typography>
            )}

            {thumbNails && (
                <div className={classNames.thumbNails}>
                    {thumbNails.map((thumbNail, index) => (
                        <ThumbNail className={classNames.thumbNail} key={index} {...thumbNail} />
                    ))}
                </div>
            )}
        </section>
    );
});
