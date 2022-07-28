import { getStoryFactory } from "../../getStory";
import { sectionName } from "./sectionName";
import { GlArticle } from "GlArticle";
import type { GlArticleProps } from "GlArticle";
import heroImgSrc from "../../assets/img/contribution.png";
import sspcloudMp4 from "../../assets/videos/sspcloud.mp4";
import { GlCodeBlock } from "GlCodeBlock";
import { getGlArticleStoryStyle } from "../../getGlArticleStyle";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlArticle },
    "parameters": {},
});

export default meta;

const commonProps: GlArticleProps = {
    "title": "Title",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate leo ac imperdiet hendrerit. Morbi semper ut erat et dignissim. Nullam tempus sapien quis ligula blandit euismod. In imperdiet a neque quis fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla id quam eget libero tincidunt tincidunt.",
    "buttonLabel": "Button",
};

export const VueWithImage = getStory({
    ...commonProps,
    "classes": getGlArticleStoryStyle({ "illustrationPosition": "right" }),
    "illustration": {
        "type": "image",
        "src": heroImgSrc,
        "hasShadow": false,
    },
    "illustrationZoomFactor": 0.8,
});

export const VueWithVideo = getStory({
    ...commonProps,
    "classes": getGlArticleStoryStyle({ "illustrationPosition": "right" }),
    "illustration": {
        "type": "video",
        "sources": [
            {
                "src": sspcloudMp4,
                "type": "video/mp4",
            },
        ],
    },
});

export const VueWithCode = getStory({
    ...commonProps,
    "classes": getGlArticleStoryStyle({ "illustrationPosition": "right" }),
    "illustration": {
        "type": "custom component",
        "Component": () => {
            return (
                <GlCodeBlock
                    programingLanguage="typescript"
                    text={`function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
console.log(getRandomInt(3));
console.log(getRandomInt(1));
console.log(Math.random());
		`}
                />
            );
        },
    },
});
