import type { GlSectionProps } from "./GlSection";
import { GlSection } from "./GlSection";
import { memo } from "react";

export type GlSectionsProps = {
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
    sections: GlSectionProps[];
    className?: string;
};

export const glSectionId = "main-section";

export const GlSections = memo((props: GlSectionsProps) => {
    const { sections, className } = props;

    return (
        <section id={glSectionId} className={className}>
            {sections.map((section, index) => (
                <GlSection key={index} {...section} />
            ))}
        </section>
    );
});
