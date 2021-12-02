import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { GlYoutubeVideoSection } from "../GlYoutubeVideoSection";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlYoutubeVideoSection },
    "defaultWidth": 1200,
});

export default meta;

export const Vue = getStory({
    "buttonLabel": "Button Label",
    "title": "Video Section Title",
    "src": "https://www.youtube.com/embed/UCwL5JtR-3k",
});
