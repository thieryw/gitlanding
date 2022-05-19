import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { GlHero } from "../GlHero";
import heroImgSrc from "./assets/img/contribution.png";
import videoSrc from "./assets/videos/sspcloud.mp4";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlHero },
    "defaultWidth": 1200,
});

export default meta;

export const VueWithImage = getStory({
    "illustration": {
        "type": "image",
        "src": heroImgSrc,
        "hasShadow": false,
    },
    "title": "Hero Title",
    "subTitle": "Hero Subtitle",
    "hasLinkToSectionBellow": true,
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
    "title": "Hero Title",
    "subTitle": "Hero Subtitle",
    "hasLinkToSectionBellow": true,
});
