import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import { GlFooter } from "GlFooter";
import twitterSvg from "../assets/svg/twitter.svg";
import redditSvg from "../assets/svg/reddit.svg";
import youtubeSvg from "../assets/svg/youtube.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlFooter,
    },
});

export default meta;

export const Vue = getStory({
    "iconLinks": [
        {
            "iconUrl": twitterSvg,
            "href": "",
        },
        {
            "iconUrl": redditSvg,
            "href": "",
        },
        {
            "iconUrl": youtubeSvg,
            "href": "",
        },
    ],
    "links": [
        {
            "label": "Github",
            "href": "",
        },
        {
            "label": "Documentation",
            "href": "",
        },
        {
            "label": "Storybook",
            "href": "",
        },
    ],
    "bottomDivContent": "M.I.T Licence",
    "email": "email@email.com",
    "phoneNumber": "+33645231242",
});
