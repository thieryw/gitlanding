import { memo, useReducer, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { breakpointsValues } from "./theme";
import { GlButton } from "./utils/GlButton";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";
import { Markdown } from "./tools/Markdown";
import { Text } from "./theme";
import { GlImage } from "./utils/GlImage";
import { GlVideo } from "./utils/GlVideo";
import { useConstCallback } from "powerhooks/useConstCallback";
import { IllustrationProps } from "./tools/IllustrationProps";

export type GlArticleProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    id?: string;
    title?: ReactNode;
    body?: ReactNode;
    buttonLabel?: ReactNode;
    buttonLink?: {
        href: string;
        onClick?: () => void;
    };
    illustrationPosition?: "left" | "right";
    illustration?: IllustrationProps;
    hasAnimation?: boolean;
};

const textTransitionParameters = {
    "ease": "easeOut",
    "duration": 0.5,
};

function getIllustrationAnimationProps(
    params: Pick<GlArticleProps, "illustrationPosition">,
) {
    const { illustrationPosition } = params;
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
}

function getTitleAnimationProps(
    params: Pick<GlArticleProps, "illustrationPosition">,
) {
    const { illustrationPosition } = params;
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
}

const bodyAnimationProps = {
    "initial": {
        "opacity": 0,
    },
    "animate": {},
    "transition": textTransitionParameters,
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
    const [isIllustrationLoaded, setIsIllustrationLoaded] = useState(() => {
        if (
            illustration === undefined ||
            illustration.type === "custom component"
        ) {
            return true;
        }
        return false;
    });

    const illustrationAnimationProps = useMemo(
        () => getIllustrationAnimationProps({ illustrationPosition }),
        [illustrationPosition],
    );
    const titleAnimationProps = useMemo(
        () => getTitleAnimationProps({ illustrationPosition }),
        [illustrationAnimationProps],
    );

    const { ref } = useIntersectionObserver(
        {
            "callback": ({ observer, entry }) => {
                if (hasAnimation === undefined || !hasAnimation) {
                    observer.unobserve(entry.target);
                    return;
                }

                if (entry.isIntersecting && isIllustrationLoaded) {
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
        },
        [isIllustrationLoaded],
    );

    const onIllustrationLoaded = useConstCallback(() => {
        setIsIllustrationLoaded(true);
    });

    const hasArticle =
        title !== undefined || body !== undefined || buttonLabel !== undefined;

    const hasIllustration = illustration !== undefined;

    const { classes, cx } = useStyles(
        {
            "illustrationPosition": illustrationPosition ?? "right",
            hasIllustration,
            hasArticle,
            isIllustrationLoaded,
        },
        { props },
    );

    return (
        <section ref={ref} id={id} className={cx(classes.root, className)}>
            {hasArticle && (
                <article className={classes.article}>
                    {title && (
                        <motion.div
                            {...(() => {
                                if (!hasAnimation) {
                                    return undefined;
                                }
                                return titleAnimationProps;
                            })()}
                        >
                            {typeof title === "string" ? (
                                <Text typo="page heading">{title}</Text>
                            ) : (
                                title
                            )}
                        </motion.div>
                    )}

                    {body && (
                        <motion.div
                            {...(() => {
                                if (!hasAnimation) {
                                    return undefined;
                                }
                                return bodyAnimationProps;
                            })()}
                        >
                            {typeof body === "string" ? (
                                <Markdown className={classes.body}>
                                    {body}
                                </Markdown>
                            ) : (
                                body
                            )}
                        </motion.div>
                    )}
                    {buttonLabel && (
                        <GlButton
                            type="submit"
                            href={buttonLink?.href}
                            onClick={buttonLink?.onClick}
                            variant="secondary"
                            className={classes.button}
                        >
                            {buttonLabel}
                        </GlButton>
                    )}
                </article>
            )}
            {hasIllustration && (
                <motion.aside
                    className={classes.aside}
                    {...(() => {
                        if (!hasAnimation) {
                            return undefined;
                        }

                        return illustrationAnimationProps;
                    })()}
                >
                    {(() => {
                        switch (illustration.type) {
                            case "custom component":
                                return (
                                    <illustration.Component
                                        onLoad={onIllustrationLoaded}
                                        id="customComponentId"
                                        className={classes.customComponent}
                                    />
                                );
                            case "image":
                                return (
                                    <GlImage
                                        className={classes.image}
                                        onLoad={onIllustrationLoaded}
                                        {...illustration}
                                    />
                                );
                            case "video":
                                return (
                                    <GlVideo
                                        className={classes.video}
                                        onLoad={onIllustrationLoaded}
                                        {...illustration}
                                    />
                                );
                        }
                    })()}
                </motion.aside>
            )}
        </section>
    );
});

const useStyles = makeStyles<{
    illustrationPosition: "left" | "right";
    hasIllustration: boolean;
    hasArticle: boolean;
    isIllustrationLoaded: boolean;
}>({ "name": { GlArticle } })(
    (
        theme,
        {
            illustrationPosition,
            hasIllustration,
            hasArticle,
            isIllustrationLoaded,
        },
    ) => ({
        "root": {
            ...theme.spacing.rightLeft(
                "padding",
                `${theme.paddingRightLeft}px`,
            ),
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "flexDirection": (() => {
                if (theme.windowInnerWidth < breakpointsValues.md) {
                    return "column";
                }
                switch (illustrationPosition) {
                    case "left":
                        return "row-reverse";
                    case "right":
                        return "row";
                }
            })(),
            ...theme.spacing.topBottom("margin", `${theme.spacing(7)}px`),
        },
        "article": {
            "display": "flex",
            "flexDirection": "column",
            "minWidth":
                theme.windowInnerWidth < breakpointsValues.md ? undefined : 300,
            "flex": hasIllustration ? 0.7 : undefined,
            "marginBottom":
                theme.windowInnerWidth >= breakpointsValues.md ||
                !hasIllustration
                    ? undefined
                    : theme.spacing(8),
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
                switch (illustrationPosition) {
                    case "left":
                        return { "marginRight": value };
                    case "right":
                        return { "marginLeft": value };
                }
            })(),
        },
        "aside": {
            ...(() => {
                if (
                    !hasArticle ||
                    theme.windowInnerWidth < breakpointsValues.md
                ) {
                    return undefined;
                }
                const value = theme.spacing(10);
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
        },
        "body": {
            "color": theme.colors.useCases.typography.textSecondary,
        },
        "button": {
            "alignSelf": "end",
            "opacity": isIllustrationLoaded ? 1 : 0,
        },
        "image": {
            "width": "100%",
            "height": "auto",
            "objectFit": "cover",
            "verticalAlign": "middle",
        },
        "video": {
            "width": "100%",
        },
        "customComponent": {},
    }),
);
