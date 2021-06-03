import { TopBar } from "../lib/TopBar";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { topBarDefaultProps } from "../lib/TopBar";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { TopBar },
});

export default meta;

export const Vue = getStory({
    ...topBarDefaultProps,
});
