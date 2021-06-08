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
        "marginTop": theme.spacing(17),
    },
    "title": {
        "fontSize": "40px",
        "textAlign": "center",
        "marginBottom": theme.spacing(7.5),
    },
    "articleAndImageWrapper": {
        "display": "flex",
        "flexDirection": isRowReverse ? "row-reverse" : "row",
        "justifyContent": "center",
        "alignItems": "center",
    },
    "article": {
        "display": "flex",
        "flexDirection": "column",
        "width": hasIllustration ? 412 : 600,
        "textAlign": hasIllustration ? "unset" : "center",
        [isRowReverse ? "marginLeft" : "marginRight"]: theme.spacing(16),
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
        [isRowReverse ? "marginRight" : "marginLeft"]: theme.spacing(16),
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

export type SectionProps = {
    className?: string;
    thumbNails?: ThumbNailProps;
    illustration?: IllustrationProps.Code | IllustrationProps.Image;
    title?: string;
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
};

export const Section = memo((props: SectionProps) => {
    const { article, illustration, isRowReverse, className, thumbNails, title } = props;

    const { classNames } = useClassNames({
        isRowReverse,
        "hasIllustration": illustration !== undefined,
    });

    return (
        <section className={cx(classNames.root, className)}>
            {title && (
                <Typography className={classNames.title} variant="h2">
                    {title}
                </Typography>
            )}
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
        </section>
    );
});
