import { GlCards as GlMetricCardSection } from "../../GlCards/GlCards";
import { GlMetricCard } from "../../GlCards/GlMetricCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import twitterImgUrl from "../../assets/svg/twitter.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlMetricCardSection,
    },
});

export default meta;

export const Vue = getStory({
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
