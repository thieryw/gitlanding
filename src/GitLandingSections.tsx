import type { SectionProps } from "./Section";
import { Section } from "./Section";
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
    sections: SectionProps[];
    className?: string;
};

export const GitLandingSection = memo((props: GitLandingSectionProps) => {
    const { sections, className } = props;

    return (
        <section id="main-section" className={className}>
            {sections.map((section, index) => (
                <Section key={index} {...section} />
            ))}
        </section>
    );
});
