import { makeStyles, Text } from "../theme";
import ReactMarkdown from "react-markdown";
import { GlButton } from "../utils/GlButton";
import { memo } from "react";
import { breakpointsValues } from "onyxia-ui";

const useStyles = makeStyles()(theme => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "textAlign": "left",
    },
    "title": {
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return {};
            }

            return {
                "fontSize": "22px",
                "lineHeight": "24px",
            };
        })(),
    },
    "paragraph": {
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
}));

export type GlArticleProps = {
    title?: string;
    articleMd?: string;
    buttonLabel?: string;
    buttonLink?: {
        href: string;
        onClick?: () => void;
    };
};

export const GlArticle = memo((props: GlArticleProps) => {
    const { buttonLink, buttonLabel, articleMd, title } = props;

    const { classes } = useStyles();

    return (
        <article>
            {title && (
                <Text className={classes.title} typo="page heading">
                    {title}
                </Text>
            )}
            {articleMd && (
                <ReactMarkdown className={classes.paragraph}>
                    {articleMd}
                </ReactMarkdown>
            )}
            {buttonLabel && (
                <div /*ref={rootRef}*/ className={classes.buttonWrapper}>
                    <GlButton
                        className={classes.button}
                        type="submit"
                        {...buttonLink}
                        variant="secondary"
                    >
                        {buttonLabel}
                    </GlButton>
                </div>
            )}
        </article>
    );
});
