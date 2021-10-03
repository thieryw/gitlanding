import { getStoryFactory } from "../getStory";
import { GlLogo } from "../../utils/GlLogo";
import { sectionName } from "./sectionName";
import redditSvg from "../assets/svg/reddit.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlLogo },
    "defaultWidth": 50,
});

export default meta;

export const Vue1 = getStory({
    "logoUrl": redditSvg,
    "fill": "blue",
});

export const Vue2 = getStory({
    "logoUrl": redditSvg,
    "fill": "green",
});
