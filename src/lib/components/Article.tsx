import Typography from "@material-ui/core/Typography";
import { createUseClassNames } from "../theme";
import ReactMarkdown from "react-markdown";
import { Image } from "./Image";
import { memo } from "react";
import type { Props as ImageProps } from "./Image";
import { cx } from "tss-react";
import { Code } from "./Code";
import type { Props as CodeProps } from "./Code";

const { useClassNames } = createUseClassNames<{
    isRowReverse: boolean;
    hasArticle: boolean;
    hasIllustration: boolean;
    className?: string;
}>()((...[, { isRowReverse, hasArticle, hasIllustration }]) => ({
    "root": {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "padding": "40px 0 40px 0",
        "flexDirection": isRowReverse ? "row-reverse" : "row",
        "@media (max-width: 895px)": {
            "flexDirection": "column",
            "padding": 0,
            "margin": "80px 0 80px 0",
        },
    },

    "article": {
        "width": hasIllustration ? 500 : 600,
        "textAlign": hasIllustration ? "unset" : "center",
        "margin": "0 40px 0 40px",
        "& h4": {
            "marginBottom": 20,
        },
        "@media (max-width: 895px)": {
            "marginBottom": hasIllustration ? 40 : 0,
            "width": "80%",
        },
    },

    "illustration": {
        "width": hasArticle ? 550 : 600,
        "margin": "0 40px 0 40px",
        "@media (max-width: 1215px)": {
            "width": hasArticle ? "45%" : "50%",
        },
        "@media (max-width: 895px)": {
            "width": "80%",
        },
    },
}));

export type Props = {
    illustration?: {
        type: "code" | "image";
        imageProps?: ImageProps;
        codeProps?: CodeProps;
    };
    article?: {
        title: string;
        /**
         * you can use markdown between back ticks.
         */
        paragraphMd: string;
    };
    isRowReverse: boolean;
    className?: string;
};

export const Article = memo((props: Props) => {
    const { article, illustration, isRowReverse, className } = props;

    const { classNames } = useClassNames({
        isRowReverse,
        "hasArticle": article !== undefined,
        "hasIllustration": illustration !== undefined,
    });

    return (
        <article className={cx(classNames.root, className)}>
            {article && (
                <div className={classNames.article}>
                    <Typography variant="h5">{article.title}</Typography>
                    <ReactMarkdown>{article.paragraphMd}</ReactMarkdown>
                </div>
            )}

            {illustration &&
                (illustration.type === "image" ? (
                    <Image
                        url={illustration.imageProps?.url}
                        alt={illustration.imageProps?.alt}
                        className={cx(classNames.illustration, illustration.imageProps?.className)}
                        hasFrame={illustration.imageProps?.hasFrame}
                        customFrameColor={illustration.imageProps?.customFrameColor}
                        hasFrameButtons={illustration.imageProps?.hasFrameButtons}
                    />
                ) : (
                    <Code
                        text={illustration.codeProps?.text}
                        language={illustration.codeProps?.language}
                        showLineNumbers={illustration.codeProps?.showLineNumbers}
                        className={cx(classNames.illustration, illustration.imageProps?.className)}
                    />
                ))}
        </article>
    );
});
