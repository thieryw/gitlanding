import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { GlArticle } from "../GlArticle";
import type { GlArticleProps } from "../GlArticle";
import heroImgSrc from "./assets/img/contribution.png";
import { GlIllustration } from "../GlIllustration";
import sspcloudMp4 from "./assets/videos/sspcloud.mp4";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlArticle },
    "defaultWidth": 1200,
});

export default meta;

const propsWithImage: GlArticleProps = {
    "title": "Title",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate leo ac imperdiet hendrerit. Morbi semper ut erat et dignissim. Nullam tempus sapien quis ligula blandit euismod. In imperdiet a neque quis fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla id quam eget libero tincidunt tincidunt.",
    "buttonLabel": "Button",
    "illustration": <GlIllustration type="image" url={heroImgSrc} />,
    "animationVariant": "primary",
};

const propsWithMp4: GlArticleProps = {
    "title": "Title",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate leo ac imperdiet hendrerit. Morbi semper ut erat et dignissim. Nullam tempus sapien quis ligula blandit euismod. In imperdiet a neque quis fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla id quam eget libero tincidunt tincidunt.",
    "buttonLabel": "Button",
    "illustration": (
        <GlIllustration hasShadow={true} type="image" url={sspcloudMp4} />
    ),
    "animationVariant": "secondary",
};

const propsWithCode: GlArticleProps = {
    "title": "Title",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate leo ac imperdiet hendrerit. Morbi semper ut erat et dignissim. Nullam tempus sapien quis ligula blandit euismod. In imperdiet a neque quis fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla id quam eget libero tincidunt tincidunt.",
    "buttonLabel": "Button",
    "illustration": (
        <GlIllustration
            type="code"
            hasShadow={true}
            hasDecorativeVsCodeButtons={true}
            language="typescript"
            text={`function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
console.log(getRandomInt(3));
console.log(getRandomInt(1));
console.log(Math.random());
		`}
        />
    ),
    "animationVariant": "primary",
};

export const VueWithImage = getStory({
    ...propsWithImage,
});

export const VueWithCode = getStory({
    ...propsWithCode,
});

export const VueWithMp4 = getStory({
    ...propsWithMp4,
});
