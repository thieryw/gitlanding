import { DarkModeSwitch } from "../lib/DarkModeSwitch";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { DarkModeSwitch },
});

export default meta;

export const Vue = getStory({});
