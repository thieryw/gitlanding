import { memo, useMemo } from "react";
import type { ReactNode } from "react";
import { makeStyles, Text } from "./theme";
import { breakpointsValues } from "./theme";
import ReactMarkdown from "react-markdown";
import { GlButton } from "./utils/GlButton";
import { GlAnimatedOnScroll } from "./GlAnimatedOnScroll";
import type { GlAnimatedOnScrollProps } from "./GlAnimatedOnScroll";

export type GlArticleProps = {
    className?: string;
    classes?: {
        contentWrapper?: string;
        article?: string;
        title?: string;
        body?: string;
        buttonWrapper?: string;
        button?: string;
        illustrationWrapper?: string;
    };
    id?: string;
    title?: string;
    body?: string;
    buttonLabel?: string;
    buttonLink?: {
        href: string;
        onClick?: () => void;
    };
    illustrationPosition?: "left" | "right";
    illustration?: ReactNode;
    hasAnimation?: boolean;
};

const useStyles = makeStyles<{
    illustrationPosition: "left" | "right";
    hasIllustration: boolean;
    hasArticle: boolean;
}>()((theme, { illustrationPosition, hasIllustration, hasArticle }) => ({
    "root": {
        ...theme.spacing.rightLeft("padding", `${theme.paddingRightLeft}px`),
    },
    "contentWrapper": {
        "display": "flex",
        "flexDirection": (() => {
            if (
                illustrationPosition === "left" &&
                theme.windowInnerWidth >= breakpointsValues.md
            ) {
                return "row-reverse";
            }

            if (theme.windowInnerWidth < breakpointsValues.md) {
                return "column";
            }

            return undefined;
        })(),
        "alignItems":
            theme.windowInnerWidth < breakpointsValues.md ? "left" : "center",
        "justifyContent": "center",

        ...(() => {
            const value = theme.spacing(7);

            return {
                "marginTop": value,
                "marginBottom": value,
            };
        })(),
        ...(() => {
            const value = theme.spacing(8);
            if (theme.windowInnerWidth < breakpointsValues.lg || !hasArticle) {
                return undefined;
            }
            if (illustrationPosition === "left") {
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
        "display": "flex",
        "flexDirection": "column",
        "textAlign": "left",
        "marginBottom": (() => {
            if (
                theme.windowInnerWidth >= breakpointsValues.md ||
                !hasIllustration
            ) {
                return undefined;
            }

            return theme.spacing(8);
        })(),
        "width": (() => {
            if (!hasIllustration) {
                return undefined;
            }

            if (theme.windowInnerWidth >= breakpointsValues.xl) {
                return 412;
            }

            if (theme.windowInnerWidth >= breakpointsValues["lg+"]) {
                return 311;
            }

            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return 270;
            }

            return undefined;
        })(),

        ...(() => {
            const value =
                theme.windowInnerWidth >= breakpointsValues.lg
                    ? theme.spacing(9)
                    : theme.spacing(5);
            if (
                theme.windowInnerWidth < breakpointsValues.md ||
                !hasIllustration
            ) {
                return undefined;
            }
            if (illustrationPosition === "left") {
                return {
                    "marginLeft": value,
                };
            }

            return {
                "marginRight": value,
            };
        })(),
    },
    "body": {
        ...theme.typography.variants["body 1"].style,
        "margin": theme.spacing({
            "topBottom": 4,
            "rightLeft": 0,
        }),
        "color": theme.colors.useCases.typography.textSecondary,
    },
    "buttonWrapper": {
        "display": "flex",
        "justifyContent": "flex-end",
    },
    "button": {
        "alignSelf": "right",
    },
    "aside": {
        ...(theme.windowInnerWidth >= breakpointsValues.md
            ? {
                  ...(() => {
                      if (!hasArticle) {
                          return undefined;
                      }
                      const value = theme.spacing(8);
                      switch (illustrationPosition) {
                          case "left":
                              return {
                                  "marginRight": value,
                              };
                          case "right":
                              return {
                                  "marginLeft": value,
                              };
                      }
                  })(),
                  "maxWidth": 800,
              }
            : {}),
    },
}));

export const GlArticle = memo((props: GlArticleProps) => {
    const {
        illustration,
        body,
        buttonLabel,
        illustrationPosition,
        title,
        className,
        id,
        buttonLink,
        hasAnimation,
        classes: classesProp,
    } = props;

    const { classes, cx } = useStyles({
        "illustrationPosition": illustrationPosition ?? "right",
        "hasIllustration": illustration !== undefined,
        "hasArticle":
            title !== undefined ||
            body !== undefined ||
            buttonLabel !== undefined,
    });

    const getAnimationProps = useMemo(() => {
        return function (params: {
            componentToAnimate: "body" | "title" | "illustration";
        }): GlAnimatedOnScrollProps {
            const { componentToAnimate } = params;

            if (!hasAnimation) {
                return {};
            }

            const textTransitionParameters = {
                "ease": "easeOut",
                "duration": 0.5,
                "delay": 0.3,
            };
            switch (componentToAnimate) {
                case "body":
                    return {
                        "initial": {
                            "opacity": 0,
                        },
                        "animate": {
                            "opacity": 1,
                        },
                        "transition": textTransitionParameters,
                    };
                case "title":
                    return {
                        "initial": {
                            "opacity": 0,
                            "x": (() => {
                                const value = 100;
                                switch (illustrationPosition) {
                                    case "left":
                                        return value;
                                    default:
                                        return -value;
                                }
                            })(),
                        },

                        "animate": {
                            "opacity": 1,
                            "x": 0,
                        },
                        "transition": textTransitionParameters,
                    };
                case "illustration":
                    return {
                        "initial": {
                            "rotateY": "15deg",
                            "rotateX": "15deg",
                        },
                        "animate": {
                            "rotateY": 0,
                            "rotateX": 0,
                        },
                        "transition": {
                            "delay": 1,
                            "duration": 1,
                            "ease": "easeOut",
                        },
                    };
            }
        };
    }, []);

    return (
        <section id={id} className={cx(classes.root, className)}>
            <div
                className={cx(
                    classes.contentWrapper,
                    classesProp?.contentWrapper,
                )}
            >
                {(title !== undefined ||
                    body !== undefined ||
                    buttonLabel !== undefined) && (
                    <article
                        className={cx(classes.article, classesProp?.article)}
                    >
                        {title && (
                            <GlAnimatedOnScroll
                                {...getAnimationProps({
                                    "componentToAnimate": "title",
                                })}
                            >
                                <Text
                                    className={classesProp?.title}
                                    typo="page heading"
                                >
                                    {title}
                                </Text>
                            </GlAnimatedOnScroll>
                        )}
                        {body && (
                            <GlAnimatedOnScroll
                                {...getAnimationProps({
                                    "componentToAnimate": "body",
                                })}
                            >
                                <ReactMarkdown
                                    className={cx(
                                        classes.body,
                                        classesProp?.body,
                                    )}
                                >
                                    {body}
                                </ReactMarkdown>
                            </GlAnimatedOnScroll>
                        )}
                        {buttonLabel && (
                            <div
                                className={cx(
                                    classes.buttonWrapper,
                                    classesProp?.buttonWrapper,
                                )}
                            >
                                <GlButton
                                    className={cx(
                                        classes.button,
                                        classesProp?.button,
                                    )}
                                    type="submit"
                                    href={buttonLink?.href}
                                    onClick={buttonLink?.onClick}
                                    variant="secondary"
                                >
                                    {buttonLabel}
                                </GlButton>
                            </div>
                        )}
                    </article>
                )}

                <GlAnimatedOnScroll
                    {...getAnimationProps({
                        "componentToAnimate": "illustration",
                    })}
                >
                    <aside
                        className={cx(
                            classes.aside,
                            classesProp?.illustrationWrapper,
                        )}
                    >
                        {illustration}
                    </aside>
                </GlAnimatedOnScroll>
            </div>
        </section>
    );
});
