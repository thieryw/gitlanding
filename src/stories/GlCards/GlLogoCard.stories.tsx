import { GlLogoCard } from "../../GlCards/GlLogoCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import twitterImgUrl from "../../assets/svg/twitter.svg";
import redditImgUrl from "../../assets/svg/reddit.svg";
import youtubeImgUrl from "../../assets/svg/youtube.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlLogoCard,
    },
});

export default meta;

export const Vue = getStory({
    "iconUrls": [twitterImgUrl, redditImgUrl, youtubeImgUrl],
    "title": "Lorem Ipsum",
    "paragraph":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque lorem et commodo pulvinar. Vivamus commodo, neque a tempus semper, eros nibh posuere libero, ut gravida dui risus eu neque.",
});
