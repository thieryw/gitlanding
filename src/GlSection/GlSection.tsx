/* eslint-disable @typescript-eslint/no-namespace */
import { Typography } from "onyxia-ui/Typography";
import { memo, ReactNode } from "react";
import { cx } from "tss-react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "position": "relative",
            ...(() => {
                const valueTopBottom = theme.spacing(8);
                const valueLeftRight = theme.spacing(4);

                return {
                    "paddingTop": valueTopBottom,
                    "paddingBottom": valueTopBottom,
                    "paddingLeft": valueLeftRight,
                    "paddingRight": valueLeftRight,
                };
            })(),
        },

        "title": {
            "fontSize": "40px",
            "textAlign": "center",
            "marginBottom": theme.spacing(7.5),
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "24px",
                      "lineHeight": "32px",
                  }
                : {}),
        },
        "articleAndImageWrapper": {
            "display": "grid",
            "gridTemplateColumns": "repeat(2, 1fr)",
            "marginTop": theme.spacing(8),
            "alignItems": "center",
            "gap": theme.spacing(4),
        },
    }));

    return { useClassNames };
};

export type GlSectionProps = {
    className?: string;
    heading?: string;
    article?: ReactNode;
    aside?: ReactNode;
};

export const GlSection = memo((props: GlSectionProps) => {
    const { className, heading, aside, article } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <section className={cx(classNames.root, className)}>
            {heading && (
                <Typography className={classNames.title} variant="h2">
                    {heading}
                </Typography>
            )}
            <div className={classNames.articleAndImageWrapper}>
                {article}
                {aside}
            </div>
        </section>
    );
});