import { GlMetricCard } from "../../GlCards/GlMetricCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import twitterImgUrl from "../../assets/svg/twitter.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlMetricCard,
    },
});

export default meta;

export const Vue = getStory({
    "number": 13,
    "iconUrl": twitterImgUrl,
    "subHeading": "Sub Heading",
    "buttonLabel": "Button",
});
