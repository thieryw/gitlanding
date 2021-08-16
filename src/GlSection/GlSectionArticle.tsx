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

export type GlSectionArticleProps = {
    className?: string;
    articleTitle?: string;
    articleParagraphMd?: string;
    articleButtonLabel?: string;
    articleButtonLink?: {
        href: string;
        onClick?: () => void;
    };
};

export const GlSectionArticle = memo((props: GlSectionArticleProps) => {
    const {
        articleButtonLink,
        articleButtonLabel,
        articleParagraphMd,
        articleTitle,
        className,
    } = props;

    const { classes, cx } = useStyles();

    return (
        <article className={cx(classes.root, className)}>
            {articleTitle && (
                <Text className={classes.title} typo="page heading">
                    {articleTitle}
                </Text>
            )}
            {articleParagraphMd && (
                <ReactMarkdown className={classes.paragraph}>
                    {articleParagraphMd}
                </ReactMarkdown>
            )}
            {articleButtonLabel && (
                <div className={classes.buttonWrapper}>
                    <GlButton
                        className={classes.button}
                        type="submit"
                        href={articleButtonLink?.href}
                        onClick={articleButtonLink?.onClick}
                        variant="secondary"
                    >
                        {articleButtonLabel}
                    </GlButton>
                </div>
            )}
        </article>
    );
});
