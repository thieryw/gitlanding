import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import { GlFooter } from "../../GlFooter";
import { GlFooterInfo } from "../../GlFooter/GlFooterInfo";
import { GlFooterBottomDiv } from "../../GlFooter/GlFooterBottomDiv";
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
            "title": "Github",
            "href": "",
        },
        {
            "title": "Documentation",
            "href": "",
        },
        {
            "title": "Storybook",
            "href": "",
        },
    ],
    "info": (
        <GlFooterInfo email="youremail@hotmail.fr" phoneNumber="+33666843445" />
    ),

    "bottomDiv": <GlFooterBottomDiv contentMd={`*M.I.T Licence*`} />,
});
