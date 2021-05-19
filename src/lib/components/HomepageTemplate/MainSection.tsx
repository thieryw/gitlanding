import { createUseClassNames } from "../../theme/useClassesNames";
import { cx } from "tss-react";
import type { Props as ArticleProps } from "../design-system/Article";
import { Article } from "../design-system/Article";

export type Props = {
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
        image?: ArticleProps["image"];
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

export function MainSection(props: Props) {
    const { dataBlocks, className } = props;

    const { classNames } = useClassNames({});

    return (
        <section className={cx(classNames.root, className)}>
            {dataBlocks.map((dataBlock, index) => (
                <Article
                    className={dataBlock.className}
                    isRowReverse={index % 2 === 1 ? true : false}
                    article={dataBlock.article}
                    image={dataBlock.image}
                    key={index}
                />
            ))}
        </section>
    );
}
