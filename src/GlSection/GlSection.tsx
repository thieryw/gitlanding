/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { makeStyles, Text } from "../theme";
import { GlSectionArticle } from "./GlSectionArticle";
import { GlSectionAside } from "./GlSectionAside";
import type { GlSectionArticleProps } from "./GlSectionArticle";
import type { GlSectionAsideProps } from "./GlSectionAside";
import { breakpointsValues } from "onyxia-ui";

const useStyles = makeStyles<{ isRowReverse: boolean }>()(
    (theme, { isRowReverse }) => ({
        "root": {
            "position": "relative",
            ...(() => {
                const value = theme.spacing(7);

                return {
                    "marginTop": value,
                    "marginBottom": value,
                };
            })(),
        },

        "heading": {
            "textAlign": "center",
            "marginBottom": theme.spacing(10),
        },
        "articleAndAsideWrapper": {
            "display": "flex",
            "alignItems": "center",
            "& code": {
                "width": 0,
            },
            "flexDirection": (() => {
                if (theme.windowInnerWidth < breakpointsValues.md) {
                    return "column-reverse";
                }

                if (isRowReverse) {
                    return "row-reverse";
                }

                return "row";
            })(),

            ...(() => {
                const value = theme.spacing(8);
                if (theme.windowInnerWidth < breakpointsValues.lg) {
                    return undefined;
                }
                if (isRowReverse) {
                    return {
                        "paddingRight": value,
                    };
                }

                return {
                    "paddingLeft": value,
                };
            })(),
        },

        "article": {
            "width": (() => {
                if (theme.windowInnerWidth >= breakpointsValues.xl) {
                    return 412;
                }
                if (
                    theme.windowInnerWidth >= breakpointsValues.lg &&
                    theme.windowInnerWidth < breakpointsValues.xl
                ) {
                    return 312;
                }
                if (
                    theme.windowInnerWidth >= breakpointsValues.md &&
                    theme.windowInnerWidth < breakpointsValues.lg
                ) {
                    return 370;
                }

                return undefined;
            })(),

            ...(() => {
                const value =
                    theme.windowInnerWidth >= breakpointsValues.lg
                        ? theme.spacing(9)
                        : theme.spacing(5);
                if (theme.windowInnerWidth < breakpointsValues.md) {
                    return undefined;
                }
                if (isRowReverse) {
                    return {
                        "marginLeft": value,
                    };
                }

                return {
                    "marginRight": value,
                };
            })(),
        },
        "aside": {
            "flex": 1,
            "marginBottom":
                theme.windowInnerWidth < breakpointsValues.md
                    ? theme.spacing(5)
                    : undefined,
        },
    }),
);

export type GlSectionProps = {
    className?: string;
    heading?: string;
    aside?: GlSectionAsideProps;
    isRowReverse?: boolean;
} & Omit<GlSectionArticleProps, "className">;

export const GlSection = memo((props: GlSectionProps) => {
    const { className, heading, aside, isRowReverse, ...article } = props;

    const { classes, cx } = useStyles({
        "isRowReverse": isRowReverse ?? false,
    });

    return (
        <section className={cx(classes.root, className)}>
            {heading && (
                <Text className={classes.heading} typo="page heading">
                    {heading}
                </Text>
            )}
            <div className={classes.articleAndAsideWrapper}>
                <GlSectionArticle className={classes.article} {...article} />
                {aside !== undefined && (
                    <GlSectionAside className={classes.aside} {...aside} />
                )}
            </div>
        </section>
    );
});
