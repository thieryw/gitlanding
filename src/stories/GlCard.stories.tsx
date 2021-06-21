import { GlMetricCard } from "../GlCards";
import { GlLogoCard } from "../GlCards";
import { GlProjectCard } from "../GlCards";
import { getStoryFactory } from "./getStory";
import twitterImgUrl from "../assets/svg/twitter.svg";
import { css } from "tss-react";

const { getStory: metric, meta } = getStoryFactory({
    "wrappedComponent": {
        GlMetricCard,
    },
});

const { getStory: logo } = getStoryFactory({
    "wrappedComponent": {
        GlLogoCard,
    },
});

const { getStory: project } = getStoryFactory({
    "wrappedComponent": {
        GlProjectCard,
    },
});

export default meta;

export const MetricCard = metric({
    "className": css({
        "width": 400,
    }),
    "heading": {
        "number": 13,
        "iconUrl": twitterImgUrl,
    },
    "subHeading": "Lorem Ipsum",
    "button": {
        "title": "My Button",
    },
});

export const LogoCard = logo({
    "className": css({
        "width": 400,
    }),

    "iconUrls": [twitterImgUrl, twitterImgUrl, twitterImgUrl, twitterImgUrl],
    "title": "Lorem Ipsum",
    "paragraph":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus felis in nunc pulvinar, vitae maximus felis accumsan. Nunc massa massa, pellentesque sit amet scelerisque eu, finibus at risus.",
});

export const ProjectCard = project({
    "button": {
        "title": "button",
        "backgroundColor": "red",
        "color": "white",
    },
    "footer": {
        "title": "Lorem Ipsum",
        "subTitle": "Lorem Ipsum dolor si ame",
    },
});
