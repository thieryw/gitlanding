import Typography from "@material-ui/core/Typography";
import { createUseClassNames } from "../../theme/useClassesNames";
import ReactMarkdown from "react-markdown";
import { Image } from "../design-system/Image";
import { memo } from "react";
import type { Props as ImageProps } from "../design-system/Image";

export type Props = {
    dataBlocks: {
        image?: Pick<ImageProps, "url" | "hasVsCodeFrame">;
        article?: {
            title: string;
            /**
             * you can use markdown between back ticks.
             */
            paragraphMd: string;
        };
    }[];
};

const { useClassNames } = createUseClassNames()(() => ({
    "root": {
        "padding": "40px 0 40px 0",
    },
}));

export const MainSection = (props: Props) => {
    const { dataBlocks } = props;

    const { classNames } = useClassNames({});

    return (
        <section className={classNames.root}>
            {dataBlocks.map((dataBlock, index) => (
                <Article index={index} article={dataBlock.article} image={dataBlock.image} />
            ))}
        </section>
    );
};

const { Article } = (() => {
    const { useClassNames } = createUseClassNames<{
        index: number;
        hasArticle: boolean;
        hasImage: boolean;
    }>()((...[, { index, hasArticle, hasImage }]) => ({
        "root": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "padding": "40px 0 40px 0",
            "flexDirection": index % 2 !== 0 ? "row-reverse" : "row",
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

    const Article = memo(
        (props: {
            image: Props["dataBlocks"][number]["image"];
            article: Props["dataBlocks"][number]["article"];
            index: number;
        }) => {
            const { article, image, index } = props;

            const { classNames } = useClassNames({
                index,
                "hasArticle": article !== undefined,
                "hasImage": image !== undefined,
            });

            return (
                <article className={classNames.root}>
                    {article && (
                        <div className={classNames.article}>
                            <Typography variant="h5">{article.title}</Typography>
                            <ReactMarkdown>{article.paragraphMd}</ReactMarkdown>
                        </div>
                    )}

                    {image && (
                        <Image
                            url={image.url}
                            alt="source code"
                            className={classNames.imageWrapper}
                            hasVsCodeFrame={image.hasVsCodeFrame}
                        />
                    )}
                </article>
            );
        },
    );

    return { Article };
})();
