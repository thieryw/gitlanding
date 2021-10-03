import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { GlSectionDivider } from "../GlSectionDivider";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlSectionDivider },
    "defaultWidth": 1200,
});

export default meta;

export const VuePrimary = getStory({});

export const VueSecondary = getStory({
    "variant": "secondary",
});
