/* eslint-disable @typescript-eslint/no-namespace */
import { Typography } from "onyxia-ui/Typography";
import { memo } from "react";
import { cx } from "tss-react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { GlArticle } from "./GlArticle";
import type { GlArticleProps } from "./GlArticle";
import { GlAside } from "./GlAside";
import type { GlAsideProps } from "./GlAside";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        isRowReverse: boolean | undefined;
    }>()((theme, { isRowReverse }) => ({
        "root": {
            "position": "relative",
            "marginTop": theme.spacing(17.25),
            ...(theme.responsive.down("sm")
                ? {
                      "marginTop": theme.spacing(8),
                  }
                : {}),
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
            "display": "flex",
            "gap": theme.spacing(16),
            "justifyContent": "center",
            "alignItems": "center",
            "marginTop": theme.spacing(17.25),
            ...(theme.responsive.down("lg")
                ? {
                      "justifyContent": "space-between",
                  }
                : {}),
            ...(theme.responsive.down("md")
                ? {
                      "flexDirection": "column-reverse",
                      "paddingLeft": theme.spacing(4.5),
                      "paddingRight": theme.spacing(4.5),
                      "marginTop": theme.spacing(8),
                      "gap": theme.spacing(8),
                  }
                : {
                      "flexDirection": isRowReverse ? "row-reverse" : "row",
                      "paddingLeft": theme.spacing(6),
                      "paddingRight": theme.spacing(6),
                  }),

            ...(theme.responsive.down("sm")
                ? {
                      "gap": theme.spacing(4),
                      ...(() => {
                          const value = theme.spacing(2);
                          return {
                              "paddingLeft": value,
                              "paddingRight": value,
                          };
                      })(),
                  }
                : {}),
        },
    }));

    return { useClassNames };
};

export type GlSectionProps = {
    className?: string;
    heading?: string;
    isRowReverse?: boolean;
    aside?: GlAsideProps;
} & GlArticleProps &
    GlAsideProps;

export const GlSection = memo((props: GlSectionProps) => {
    const {
        isRowReverse,
        className,
        articleMd,
        title,
        buttonLabel,
        buttonLink,
        heading,
        aside,
    } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        isRowReverse,
    });

    return (
        <section className={cx(classNames.root, className)}>
            {heading && (
                <Typography className={classNames.title} variant="h2">
                    {heading}
                </Typography>
            )}
            <div className={classNames.articleAndImageWrapper}>
                <GlArticle
                    articleMd={articleMd}
                    buttonLabel={buttonLabel}
                    buttonLink={buttonLink}
                    title={title}
                />

                {aside !== undefined && <GlAside {...aside} />}
            </div>
        </section>
    );
});
