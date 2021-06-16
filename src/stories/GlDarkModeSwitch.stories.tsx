import { GlDarkModeSwitch } from "../GlDarkModeSwitch";
import { getStoryFactory } from "./getStory";

const { getStory, meta } = getStoryFactory({
    "wrappedComponent": { GlDarkModeSwitch },
});

export default meta;

export const Vue = getStory({});
