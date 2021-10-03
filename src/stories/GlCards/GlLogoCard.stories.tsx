import { GlLogoCard } from "../../GlCards/GlLogoCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import githubPng from "../assets/img/github.png";
import balloonPng from "../assets/img/balloon.png";
import tchapPng from "../assets/img/tchap.png";
import drawioPng from "../assets/img/drawio.png";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlLogoCard,
    },
    "defaultWidth": 500,
});

export default meta;

export const Vue = getStory({
    "iconUrls": [githubPng, balloonPng, tchapPng, drawioPng],
    "overlapIcons": true,
    "title": "Title",
    "paragraph": "Paragraph",
    "buttonLabel": "Button Label",
});
