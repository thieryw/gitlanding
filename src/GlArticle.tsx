import { memo } from "react";
import type { ReactNode } from "react";
import { makeStyles, Text } from "./theme";
import { breakpointsValues } from "./theme";
import ReactMarkdown from "react-markdown";
import { GlButton } from "./utils/GlButton";

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
        "margin": theme.spacing(4, 0),
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

    return (
        <section className={cx(classes.root, className)}>
            <article className={classes.article}>
                {title && <Text typo="page heading">{title}</Text>}
                {body && (
                    <ReactMarkdown className={classes.body}>
                        {body}
                    </ReactMarkdown>
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

            <aside className={classes.illustrationWrapper}>
                {illustration}
            </aside>
        </section>
    );
});
