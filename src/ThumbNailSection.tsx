import { memo } from "react";
import { cx } from "tss-react";
import { ThumbNail } from "./components/ThumbNail";
import type { ThumbNailProps } from "./components/ThumbNail";
import { Typography } from "onyxia-ui";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "marginTop": theme.spacing(32.5),
        },
        "title": {
            "textAlign": "center",
            "marginBottom": theme.spacing(7.5),
        },
        "thumbNails": {
            "display": "flex",
            "flexWrap": "wrap",
            "justifyContent": "center",
        },
        "thumbNail": {
            "margin": theme.spacing(1.5),
        },
    }));

    return { useClassNames };
};

export type ThumbNailSectionProps = {
    className?: string;
    title?: string;
    thumbNails?: ThumbNailProps[];
};

export const ThumbNailSection = memo((props: ThumbNailSectionProps) => {
    const { title, thumbNails, className } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <section className={cx(classNames.root, className)}>
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
