/* eslint-disable @typescript-eslint/no-namespace */
import { Typography } from "onyxia-ui/Typography";
import { createUseClassNames } from "../theme";
import ReactMarkdown from "react-markdown";
import { Image } from "./Image";
import { memo } from "react";
import type { ImageProps } from "./Image";
import { cx, css } from "tss-react";
import { Code } from "./Code";
import type { Props as CodeProps } from "./Code";
import { Button } from "./Button";
import type { ThumbNailProps } from "./ThumbNails";
import { ThumbNails } from "./ThumbNails";

const { useClassNames } = createUseClassNames<{
    isRowReverse: boolean;
    hasIllustration: boolean;
}>()((theme, { hasIllustration, isRowReverse }) => ({
    "root": {
        "position": "relative",
        "flexDirection": isRowReverse ? "row-reverse" : "row",
    },
    "articleAndImageWrapper": {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
    },
    "article": {
        "display": "flex",
        "flexDirection": "column",
        "width": hasIllustration ? 412 : 600,
        "textAlign": hasIllustration ? "unset" : "center",
        "marginRight": 130,
        "& h2": {
            "marginBottom": 14,
        },
        "& p": {
            "fontSize": theme.typography.body1.fontSize,
            "lineHeight": "24px",
            "marginTop": 14,
            "marginBottom": 14,
        },
    },

    "illustration": {
        "width": 900,
        "marginLeft": 130,
    },
    "button": {
        "color": "unset !important",
        "backgroundColor": "unset !important",
        "borderColor": "unset !important",
        "alignSelf": "right",
    },
}));

declare namespace IllustrationProps {
    export type Code = {
        type: "code";
        codeProps: CodeProps;
    };

    export type Image = {
        type: "image";
        imageProps: ImageProps;
    };
}

export type ArticleProps = {
    thumbNails?: ThumbNailProps;
    illustration?: IllustrationProps.Code | IllustrationProps.Image;
    article?: {
        title: string;
        /**
         * you can use markdown between back ticks.
         */
        paragraphMd: string;
        button?: {
            className?: string;
            title: string;
            href: string;
        };
    };
    isRowReverse: boolean;
    className?: string;
};

export const Article = memo((props: ArticleProps) => {
    const { article, illustration, isRowReverse, className, thumbNails } = props;

    const { classNames } = useClassNames({
        isRowReverse,
        "hasIllustration": illustration !== undefined,
    });

    return (
        <article className={cx(classNames.root, className)}>
            {thumbNails && <ThumbNails {...thumbNails} />}
            <div className={classNames.articleAndImageWrapper}>
                {article && (
                    <div className={classNames.article}>
                        <Typography variant="h2">{article.title}</Typography>
                        <ReactMarkdown>{article.paragraphMd}</ReactMarkdown>
                        {article.button && (
                            <div
                                className={cx(
                                    css({
                                        "display": "flex",
                                        "justifyContent": "flex-end",
                                        "marginTop": 14,
                                    }),
                                    article.button.className,
                                )}
                            >
                                <Button
                                    className={classNames.button}
                                    type="submit"
                                    href={article.button.href}
                                >
                                    {article.button.title}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {illustration &&
                    (illustration.type === "image" ? (
                        <Image
                            url={illustration.imageProps?.url}
                            alt={illustration.imageProps?.alt}
                            className={cx(classNames.illustration, illustration.imageProps?.className)}
                            frame={illustration.imageProps.frame}
                        />
                    ) : (
                        <Code
                            text={illustration.codeProps?.text}
                            language={illustration.codeProps?.language}
                            showLineNumbers={illustration.codeProps?.showLineNumbers}
                            className={cx(classNames.illustration, illustration.codeProps?.className)}
                        />
                    ))}
            </div>
        </article>
    );
});
