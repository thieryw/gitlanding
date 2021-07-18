/* eslint-disable @typescript-eslint/no-namespace */
import { Typography } from "onyxia-ui/Typography";
import { memo, ReactNode } from "react";

import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles<{
        hasArticleAndAside: boolean;
    }>()((theme, { hasArticleAndAside }) => ({
        "root": {
            "position": "relative",
            ...(() => {
                const valueTopBottom = theme.spacing(8);
                const valueLeftRight = theme.spacing(12);

                return {
                    "paddingTop": valueTopBottom,
                    "paddingBottom": valueTopBottom,
                    "paddingLeft": valueLeftRight,
                    "paddingRight": valueLeftRight,
                };
            })(),

            ...(theme.responsive.down("sm")
                ? {
                      ...(() => {
                          const value = theme.spacing(4);
                          return {
                              "paddingLeft": value,
                              "paddingRight": value,
                          };
                      })(),
                  }
                : {}),
        },

        "title": {
            "textAlign": "center",
            "marginBottom": theme.spacing(10),
        },
        "articleAndAsideWrapper": {
            "display": "grid",
            "gridTemplateColumns": `repeat(${hasArticleAndAside ? 2 : 1}, 1fr)`,
            "marginTop": theme.spacing(8),
            "alignItems": "center",
            "gap": theme.spacing(12),
            "& code": {
                "width": 0,
            },
            ...(theme.responsive.down("md")
                ? {
                      "gridTemplateColumns": undefined,
                      "gridAutoFlow": "row",
                  }
                : {}),
        },
    }));

    return { useStyles };
};

export type GlSectionProps = {
    className?: string;
    heading?: string;
    article?: ReactNode;
    aside?: ReactNode;
    children?: ReactNode;
};

export const GlSection = memo((props: GlSectionProps) => {
    const { className, heading, aside, article, children } = props;

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles({
        "hasArticleAndAside": aside !== undefined && article !== undefined,
    });

    return (
        <section className={cx(classes.root, className)}>
            {heading && (
                <Typography className={classes.title} variant="h2">
                    {heading}
                </Typography>
            )}
            <div className={classes.articleAndAsideWrapper}>
                {article}
                {aside}
            </div>
            {children}
        </section>
    );
});
