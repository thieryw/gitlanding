import { GlProjectCard } from "GlCards/GlProjectCard";
import thumbnailPngSrc from "../../assets/img/thumbnail1.png";
import kubernetesPngSrc from "../../assets/img/kubernetes.png";
import pokemonPngSrc from "../../assets/img/pokemon.png";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../../getStory";
import { GlCards as GlProjectCardSection } from "GlCards/GlCards";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlProjectCardSection,
    },
});

export default meta;

export const Vue = getStory({
    "title": "Card Section Title",
    "children": (
        <>
            {[thumbnailPngSrc, pokemonPngSrc, kubernetesPngSrc].map(
                (src, index) => (
                    <GlProjectCard
                        key={index}
                        projectImageUrl={src}
                        title="Title"
                        subtitle="Subtitle"
                        badgeLabel="Badge Label"
                        text="13/12/2021"
                    />
                ),
            )}
        </>
    ),
});
