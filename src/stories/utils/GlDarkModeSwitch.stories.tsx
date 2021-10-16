import { GlDarkModeSwitch } from "../../utils/GlDarkModeSwitch";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlDarkModeSwitch },
    "argTypes": {
        "size": {
            "options": ["extra small", "small", "default", "medium", "large"],
            "control": { "type": "radio" },
        },
    },
});

export default meta;

export const Vue = getStory({
    "size": "default",
});
