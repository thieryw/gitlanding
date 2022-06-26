import { getStoryFactory } from "../../getStory";
import { sectionName } from "./sectionName";
import { GlButton } from "utils/GlButton";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlButton },
});

export default meta;

export const VuePrimary = getStory({
    "type": "submit",
    "children": "My Button",
});

export const VueSecondary = getStory({
    "type": "submit",
    "children": "My Button",
    "variant": "secondary",
});
