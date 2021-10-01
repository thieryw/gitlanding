import { GlCards } from "../../GlCards/GlCards";
import { GlMetricCard } from "../../GlCards/GlMetricCard";
import { GlProjectCard } from "../../GlCards/GlProjectCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import twitterImgUrl from "../../assets/svg/twitter.svg";
import thumbnailPngSrc from "../assets/img/thumbnail1.png";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlCards,
    },
});

export default meta;

export const VueWithMetricCards = getStory({
    "title": "Card Section Title",
    "children": (
        <>
            {[13, 14, 15].map(index => (
                <GlMetricCard
                    buttonLabel="Button Label"
                    key={index}
                    number={index}
                    iconUrl={twitterImgUrl}
                    subHeading="Sub Heading"
                />
            ))}
        </>
    ),
});

export const VueWithProjectCards = getStory({
    "title": "Card Section Title",
    "children": (
        <>
            {[1, 2].map(index => (
                <GlProjectCard
                    key={index}
                    projectImageUrl={thumbnailPngSrc}
                    title="Title"
                    subtitle="Subtitle"
                    badgeLabel="Badge Label"
                    date="13/12/2021"
                />
            ))}
        </>
    ),
});
