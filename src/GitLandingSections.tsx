import type { SectionProps } from "./components/Section";
import { Section } from "./components/Section";
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
    sections: Omit<SectionProps, "isRowReverse">[];
    className?: string;
};

export const GitLandingSection = memo((props: GitLandingSectionProps) => {
    const { sections, className } = props;

    return (
        <section className={className}>
            {sections.map((section, index) => (
                <Section key={index} isRowReverse={index % 2 === 1 ? true : false} {...section} />
            ))}
        </section>
    );
});
