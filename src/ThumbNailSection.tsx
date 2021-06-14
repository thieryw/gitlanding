import { memo, useRef } from "react";
import { ThumbNail } from "./components/ThumbNail";
import type { ThumbNailProps } from "./components/ThumbNail";
import { Typography } from "onyxia-ui";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo, useNamedState, useConstCallback } from "powerhooks";

export type ThumbNailSectionProps = {
    className?: string;
    title?: string;
    thumbNails?: ThumbNailProps[];
    /**
     * specify the maximum screen width in witch the thumbnails
     * are displayed as columns.
     */
    breakpointForColumnDisplay?: number;
    showMoreMessage?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<
        Pick<ThumbNailSectionProps, "breakpointForColumnDisplay" | "title">
    >()((theme, { breakpointForColumnDisplay, title }) => ({
        "title": {
            "marginBottom": theme.spacing(7.5),
            "marginTop": theme.spacing(17.25),
            "display": "flex",
            "justifyContent": title ? "space-between" : "flex-end",
            "paddingLeft": theme.spacing(13),
            "paddingRight": theme.spacing(13),
            "& h3": {
                "color": theme.colors.palette.orangeWarning.main,
                "cursor": "pointer",
            },
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
    const { title, thumbNails, className, breakpointForColumnDisplay, showMoreMessage } = props;

    const sectionRef = useRef<HTMLDivElement>(null);

    const { areExtraThumbNailsExposed, setAreExtraThumbNailsExposed } = useNamedState(
        "areExtraThumbNailsExposed",
        false,
    );

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({ breakpointForColumnDisplay, title });

    const exposeHiddenThumbNails = useConstCallback(async () => {
        setAreExtraThumbNailsExposed(!areExtraThumbNailsExposed);

        if (areExtraThumbNailsExposed || !sectionRef.current) {
            return;
        }

        await new Promise<void>(resolve => setTimeout(resolve, 1));

        window.scrollTo({
            "behavior": "smooth",
            "top": window.scrollY + sectionRef.current.getBoundingClientRect().top,
        });
    });

    return (
        <section ref={sectionRef} className={className}>
            <div className={classNames.title}>
                {title && <Typography variant="h2">{title}</Typography>}

                {thumbNails && thumbNails.length > 4 && (
                    <Typography onClick={exposeHiddenThumbNails} variant="h3">
                        {showMoreMessage ? showMoreMessage : "Show More"} ({thumbNails.length})
                    </Typography>
                )}
            </div>

            {thumbNails && (
                <div className={classNames.thumbNails}>
                    {thumbNails
                        .slice(
                            0,
                            thumbNails.length < 4 || areExtraThumbNailsExposed ? thumbNails.length : 4,
                        )
                        .map((thumbNail, index) => (
                            <ThumbNail className={classNames.thumbNail} key={index} {...thumbNail} />
                        ))}
                </div>
            )}
        </section>
    );
});
