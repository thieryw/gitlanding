import Typography from "@material-ui/core/Typography";
import { createUseClassNames } from "../../theme/useClassesNames";
import ReactMarkdown from "react-markdown";
import { Image } from "../design-system/Image";
import { memo } from "react";
import type { Props as ImageProps } from "./Image";
import { cx } from "tss-react";

const { useClassNames } = createUseClassNames<{
    isRowReverse: boolean;
    hasArticle: boolean;
    hasImage: boolean;
    className?: string;
}>()((...[, { isRowReverse, hasArticle, hasImage }]) => ({
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
        "width": hasImage ? 500 : 600,
        "textAlign": hasImage ? "unset" : "center",
        "margin": "0 40px 0 40px",
        "& h4": {
            "marginBottom": 20,
        },
        "@media (max-width: 895px)": {
            "marginBottom": hasImage ? 40 : 0,
            "width": "80%",
        },
    },

    "imageWrapper": {
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
    image?: ImageProps;
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
    const { article, image, isRowReverse, className } = props;

    const { classNames } = useClassNames({
        isRowReverse,
        "hasArticle": article !== undefined,
        "hasImage": image !== undefined,
    });

    return (
        <article className={cx(classNames.root, className)}>
            {article && (
                <div className={classNames.article}>
                    <Typography variant="h5">{article.title}</Typography>
                    <ReactMarkdown>{article.paragraphMd}</ReactMarkdown>
                </div>
            )}

            {image && (
                <Image
                    url={image.url}
                    alt={image.alt}
                    className={cx(classNames.imageWrapper, image.className)}
                    frame={image.frame}
                />
            )}
        </article>
    );
});
