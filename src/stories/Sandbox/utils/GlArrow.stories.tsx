import { getStoryFactory } from "../../getStory";
import { GlArrow } from "utils/GlArrow";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlArrow },
});

export default meta;

export const Vue = getStory({
    "direction": "down",
    "hasCircularBorder": true,
});
