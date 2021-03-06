import { getStoryFactory } from "../../getStory";
import { sectionName } from "./sectionName";
import { GlHero } from "GlHero";
import heroImgSrc from "../../assets/img/contribution.png";
import videoSrc from "../../assets/videos/sspcloud.mp4";
import type { GlHeroProps } from "GlHero";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlHero },
});

export default meta;

const commonProps: GlHeroProps = {
    "title": "Hero Title",
    "subTitle": "Hero Subtitle",
    "hasLinkToSectionBellow": true,
};

export const VueWithImage = getStory({
    "illustration": {
        "type": "image",
        "src": heroImgSrc,
        "hasShadow": false,
    },
    ...commonProps,
});

export const VueWithVideo = getStory({
    "illustration": {
        "type": "video",
        "sources": [
            {
                "src": videoSrc,
                "type": "video/mp4",
            },
        ],
    },
    ...commonProps,
});
