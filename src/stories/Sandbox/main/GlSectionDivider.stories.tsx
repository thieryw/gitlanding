import { getStoryFactory } from "../../getStory";
import { sectionName } from "./sectionName";
import { GlSectionDivider } from "GlSectionDivider";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlSectionDivider },
});

export default meta;

export const Vue = getStory({});
