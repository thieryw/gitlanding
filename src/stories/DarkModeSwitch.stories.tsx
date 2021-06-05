import { DarkModeSwitch } from "../lib/DarkModeSwitch";
import { designSystem } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { getStory, meta } = getStoryFactory({
    "sectionName": designSystem,
    "wrappedComponent": { DarkModeSwitch },
});

export default meta;

export const Vue = getStory({});
