import { createUseClassNames } from "./theme/useClassesNames";
import { cx } from "tss-react";
import type { Props as ArticleProps } from "./theme/design-system/Article";
import { Article } from "./theme/design-system/Article";
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
        className?: string;
    }[];
    className?: string;
};

const { useClassNames } = createUseClassNames()(() => ({
    "root": {
        "padding": "40px 0 40px 0",
    },
}));

export const GitLandingSection = memo((props: GitLandingSectionProps) => {
    const { dataBlocks, className } = props;

    const { classNames } = useClassNames({});

    return (
        <section className={cx(classNames.root, className)}>
            {dataBlocks.map((dataBlock, index) => (
                <Article
                    className={dataBlock.className}
                    isRowReverse={index % 2 === 1 ? true : false}
                    article={dataBlock.article}
                    illustration={dataBlock.illustration}
                    key={index}
                />
            ))}
        </section>
    );
});
