import { GlDarkModeSwitch } from "../../GlHeader/GlDarkModeSwitch";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlDarkModeSwitch },
});

export default meta;

export const Vue = getStory({});
