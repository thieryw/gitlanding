import { memo, useState } from "react";
import type { ReactNode } from "react";
import { makeStyles, Text } from "./theme";
import { breakpointsValues } from "./theme";
import ReactMarkdown from "react-markdown";
import { GlButton } from "./utils/GlButton";
import { GlAnimatedOnScroll } from "./GlAnimatedOnScroll";
import type { GlAnimatedOnScrollProps } from "./GlAnimatedOnScroll";

export type GlArticleProps = {
    className?: string;
    title?: string;
    body?: string;
    buttonLabel?: string;
    buttonLink?: {
        href: string;
        onClick?: () => void;
    };
    illustrationPosition?: "left" | "right";
    illustration?: ReactNode;
};

const useStyles = makeStyles<
    NonNullable<GlArticleProps["illustrationPosition"]>
>()((theme, illustrationPosition) => ({
    "root": {
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
        "alignItems": "center",
        "& code": {
            "width": 0,
        },

        ...(() => {
            const value = theme.spacing(7);

            return {
                "marginTop": value,
                "marginBottom": value,
            };
        })(),
        ...(() => {
            const value = theme.spacing(8);
            if (theme.windowInnerWidth < breakpointsValues.lg) {
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
        "width": (() => {
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
            if (theme.windowInnerWidth < breakpointsValues.md) {
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
    "illustrationWrapper": {
        "flex": 1,
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
        buttonLink,
    } = props;

    const { classes, cx } = useStyles(illustrationPosition ?? "right");
    const [textAnimationProps] = useState<GlAnimatedOnScrollProps>(() => {
        return {
            "initial": {
                "x": (() => {
                    const value = 300;
                    switch (illustrationPosition) {
                        case "left":
                            return value;
                        case "right":
                            return -value;
                        default:
                            return -value;
                    }
                })(),
                "opacity": 0,
            },
            "animate": {
                "x": 0,
                "opacity": 1,
            },
            "transition": {
                "duration": 1,
                "type": "tween",
                "ease": "easeOut",
            },
            "rootMargin": "0px 0px -150px 0px",
        };
    });

    return (
        <section className={cx(classes.root, className)}>
            <article className={classes.article}>
                {title && (
                    <GlAnimatedOnScroll {...textAnimationProps}>
                        <Text typo="page heading">{title}</Text>
                    </GlAnimatedOnScroll>
                )}
                {body && (
                    <GlAnimatedOnScroll {...textAnimationProps}>
                        <ReactMarkdown className={classes.body}>
                            {body}
                        </ReactMarkdown>
                    </GlAnimatedOnScroll>
                )}
                {buttonLabel && (
                    <GlAnimatedOnScroll {...textAnimationProps}>
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
                    </GlAnimatedOnScroll>
                )}
            </article>

            <GlAnimatedOnScroll
                initial={{
                    "opacity": 0,
                }}
                animate={{
                    "opacity": 1,
                }}
                transition={{
                    "delay": 1,
                    "duration": 0.5,
                }}
                className={classes.illustrationWrapper}
            >
                <aside>{illustration}</aside>
            </GlAnimatedOnScroll>
        </section>
    );
});
