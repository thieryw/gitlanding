import { memo, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { breakpointsValues } from "./theme";
import { GlButton } from "./utils/GlButton";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";
import { assert } from "tsafe";
import { Markdown } from "./tools/Markdown";

export type GlArticleProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    id?: string;
    title?: string;
    body?: string;
    buttonLabel?: ReactNode;
    buttonLink?: {
        href: string;
        onClick?: () => void;
    };
    illustrationPosition?: "left" | "right";
    illustration?: ReactNode;
    hasAnimation?: boolean;
};

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
    } = props;

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const textTransitionParameters = useMemo(() => {
        if (!hasAnimation || hasAnimation === undefined) {
            return;
        }
        return {
            "ease": "easeOut",
            "duration": 0.5,
        };
    }, []);

    const illustrationAnimationProps = useMemo(() => {
        if (!hasAnimation || hasAnimation === undefined) {
            return;
        }
        return {
            "initial": (() => {
                return {
                    "opacity": 0,
                    "x": illustrationPosition === "left" ? -100 : 100,
                };
            })(),

            "animate": {},
            "transition": {
                "delay": 0.3,
                "duration": 0.5,
                "ease": "easeOut",
            },
        };
    }, []);

    const titleAnimationProps = useMemo(() => {
        if (!hasAnimation || hasAnimation === undefined) {
            return;
        }
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
            "animate": {},
            "transition": textTransitionParameters,
        };
    }, []);

    const bodyAnimationProps = useMemo(() => {
        if (!hasAnimation || hasAnimation === undefined) {
            return;
        }
        return {
            "initial": {
                "opacity": 0,
            },
            "animate": {},
            "transition": textTransitionParameters,
        };
    }, []);

    const { ref } = useIntersectionObserver({
        "callback": ({ observer, entry }) => {
            if (hasAnimation === undefined || !hasAnimation) {
                observer.unobserve(entry.target);
                return;
            }

            assert(
                illustrationAnimationProps &&
                    titleAnimationProps &&
                    bodyAnimationProps,
            );

            if (entry.isIntersecting) {
                illustrationAnimationProps.animate = {
                    "opacity": 1,
                    "x": 0,
                };
                titleAnimationProps.animate = {
                    "opacity": 1,
                    "x": 0,
                };
                bodyAnimationProps.animate = {
                    "opacity": 1,
                };
                observer.unobserve(entry.target);
                forceUpdate();
            }
        },
        "threshold": 0.2,
    });

    const { classes, cx } = useStyles(
        {
            "illustrationPosition": illustrationPosition ?? "right",
            "hasIllustration": illustration !== undefined,
            "hasArticle":
                title !== undefined ||
                body !== undefined ||
                buttonLabel !== undefined,
        },
        { props },
    );

    return (
        <section ref={ref} id={id} className={cx(classes.root, className)}>
            <div className={classes.contentWrapper}>
                {(title !== undefined ||
                    body !== undefined ||
                    buttonLabel !== undefined) && (
                    <article className={classes.article}>
                        {title && (
                            <motion.div {...titleAnimationProps}>
                                <Markdown className={classes.title}>
                                    {title}
                                </Markdown>
                            </motion.div>
                        )}
                        {body && (
                            <motion.div {...bodyAnimationProps}>
                                <Markdown className={classes.body}>
                                    {body}
                                </Markdown>
                            </motion.div>
                        )}
                        {buttonLabel && (
                            <div className={classes.buttonWrapper}>
                                <GlButton
                                    className={classes.button}
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

                <motion.div {...illustrationAnimationProps}>
                    <aside className={classes.aside}>{illustration}</aside>
                </motion.div>
            </div>
        </section>
    );
});

const useStyles = makeStyles<{
    illustrationPosition: "left" | "right";
    hasIllustration: boolean;
    hasArticle: boolean;
}>({ "name": { GlArticle } })(
    (theme, { illustrationPosition, hasIllustration, hasArticle }) => ({
        "root": {
            "overflowX": "hidden",
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
                theme.windowInnerWidth < breakpointsValues.md
                    ? "left"
                    : "center",
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
                if (
                    theme.windowInnerWidth < breakpointsValues.lg ||
                    !hasArticle
                ) {
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
        "title": {
            ...theme.typography.variants["page heading"].style,
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
    }),
);
