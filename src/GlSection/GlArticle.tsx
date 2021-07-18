import { getThemeApi } from "../theme";
import { Typography } from "onyxia-ui/Typography";
import ReactMarkdown from "react-markdown";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import { GlButton } from "../utils/GlButton";
import { memo } from "react";

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles()(theme => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "textAlign": "left",
        },
        "title": {
            "marginBottom": 14,
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "22px",
                      "lineHeight": "24px",
                  }
                : {}),
        },
        "paragraph": {
            "fontSize": theme.typography.body1.fontSize,
            "lineHeight": "24px",
            "marginTop": 14,
            "marginBottom": 14,
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "16px",
                      "lineHeight": "20px",
                  }
                : {}),
        },
        "buttonWrapper": {
            "display": "flex",
            "justifyContent": "flex-end",
            "marginTop": 14,
        },
        "button": {
            "alignSelf": "right",
        },
    }));

    return { useStyles };
};

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

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes } = useStyles();

    return (
        <article>
            {title && (
                <Typography className={classes.title} variant="h2">
                    {title}
                </Typography>
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
                        color="secondary"
                    >
                        {buttonLabel}
                    </GlButton>
                </div>
            )}
        </article>
    );
});
