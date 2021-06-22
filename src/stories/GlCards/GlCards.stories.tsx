import { GlCards } from "../../GlCards/GlCards";
import { GlMetricCard } from "../../GlCards/GlMetricCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import twitterImgUrl from "../../assets/svg/twitter.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlCards,
    },
});

export default meta;

export const Vue = getStory({
    "title": "Lorem Ipsum",
    "children": (
        <>
            {[13, 14, 15].map(index => (
                <GlMetricCard
                    button={{ "title": "Gloria" }}
                    key={index}
                    heading={{
                        "number": index,
                        "iconUrl": twitterImgUrl,
                    }}
                    subHeading="et in terra pax hominibus bonae voluntatis"
                />
            ))}
        </>
    ),
});
