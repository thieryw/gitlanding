import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { GlHero } from "../GlHero";
import type { GlHeroProps } from "../GlHero";
import heroImgSrc from "./assets/img/contribution.png";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlHero },
    "defaultWidth": 1200,
});

export default meta;

const props: GlHeroProps = {
    "imageSrc": heroImgSrc,
    "title": "Hero Title",
    "subTitle": "Hero Subtitle",
    "hasLinkToSectionBellow": true,
    "hasImageShadow": false,
};

export const Vue = getStory({
    ...props,
});
