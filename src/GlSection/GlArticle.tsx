import { getThemeApi } from "../theme";
import { Typography } from "onyxia-ui/Typography";
import ReactMarkdown from "react-markdown";
import { useGuaranteedMemo } from "powerhooks";
import { GlButton } from "../utils/GlButton";
import { memo } from "react";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "textAlign": "left",
            "width": theme.responsive.down("md") ? "100%" : 412,
            ...(theme.responsive.down("sm")
                ? {
                      "width": "100%",
                      "margin": "unset",
                      "marginTop": theme.spacing(4),
                  }
                : {}),
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

    return { useClassNames };
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

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <article>
            {title && (
                <Typography className={classNames.title} variant="h2">
                    {title}
                </Typography>
            )}
            {articleMd && (
                <ReactMarkdown className={classNames.paragraph}>
                    {articleMd}
                </ReactMarkdown>
            )}
            {buttonLabel && (
                <div className={classNames.buttonWrapper}>
                    <GlButton
                        className={classNames.button}
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
