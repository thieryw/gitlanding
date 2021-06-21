import { GlMetricCard } from "../GlCards/GlMetricCard";
import { getStoryFactory } from "./getStory";
import twitterImgUrl from "../assets/svg/twitter.svg";

const { getStory, meta } = getStoryFactory({
    "wrappedComponent": {
        GlMetricCard,
    },
});

export default meta;

export const Vue = getStory({
    "heading": {
        "number": 13,
        "iconUrl": twitterImgUrl,
    },
    "subHeading": "Lorem Ipsum",

    "button": {
        "title": "Button",
    },
});
