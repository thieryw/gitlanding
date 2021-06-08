import type { ArticleProps } from "./components/Article";
import { Article } from "./components/Article";
import { memo } from "react";

export type GitLandingSectionProps = {
    /**
     * enter the assets in an array.
     * example:
     * "mainSection": [
     *  {
     *      "imageHasFrame": false,
     *      "imageUrl": yourImage
     *      "article": {
     *          "title": "your title",
     *          "paragraphMd": "your paragraph"
     *      }
     *  },
     *  {
     *      "imageHasFrame": false,
     *      "imageUrl": yourImage
     *      "article": {
     *          "title": "your title",
     *          "paragraphMd": "your paragraph"
     *      }
     *  },
     * ]
     */
    dataBlocks: {
        illustration?: ArticleProps["illustration"];
        article?: ArticleProps["article"];
        thumbNails?: ArticleProps["thumbNails"];
        className?: string;
    }[];
    className?: string;
};

export const GitLandingSection = memo((props: GitLandingSectionProps) => {
    const { dataBlocks, className } = props;

    return (
        <section className={className}>
            {dataBlocks.map((dataBlock, index) => (
                <Article
                    className={dataBlock.className}
                    isRowReverse={index % 2 === 1 ? true : false}
                    article={dataBlock.article}
                    illustration={dataBlock.illustration}
                    key={index}
                    thumbNails={dataBlock.thumbNails}
                />
            ))}
        </section>
    );
});
