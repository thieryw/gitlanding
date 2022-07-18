import { getStoryFactory } from "../../getStory";
import { sectionName } from "./sectionName";
import { GlYoutubeVideoSection } from "GlYoutubeVideoSection";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlYoutubeVideoSection },
});

export default meta;

export const Vue = getStory({
    "buttonLabel": "Button Label",
    "title": "Video Section Title",
    "src": "https://www.youtube.com/embed/taDGhL0z7wc",
});
