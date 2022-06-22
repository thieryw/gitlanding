import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";
import { GlSlider } from "../../GlSlider";
import { GlReviewSlide } from "../../GlReviewSlide";
import twitterIconUrl from "../assets/svg/twitter.svg";
import redditIconUrl from "../assets/svg/reddit.svg";
import youtubeIconUrl from "../assets/svg/youtube.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlSlider },
});

export default meta;

export const VueReviewSlider = getStory({
    "title": "Review Slider Title",
    "slides": [
        <GlReviewSlide
            signature="Signature"
            descriptionMd={[
                "Lorem ipsum dolor sit amet, consectetur ",
                `adipiscing elit. **Cras** vel nibh mi. `,
                "Aliquam fringilla, massa non vulputate tempus, ",
                "erat purus malesuada arcu, a imperdiet magna ",
                "turpis a ex. Proin non tempor ante. Integer ",
                "eu ipsum sit amet erat vulputate tincidunt ",
                "vel a dolor. Donec tincidunt pulvinar ex at suscipit.",
            ].join("")}
            logoUrl={twitterIconUrl}
        />,
        <GlReviewSlide
            signature="Signature"
            descriptionMd={[
                "Lorem ipsum dolor sit amet, consectetur ",
                `adipiscing elit. **Cras** vel nibh mi. `,
                "Aliquam fringilla, massa non vulputate tempus, ",
                "erat purus malesuada arcu, a imperdiet magna ",
                "turpis a ex. Proin non tempor ante. Integer ",
                "eu ipsum sit amet erat vulputate tincidunt ",
                "vel a dolor. Donec tincidunt pulvinar ex at suscipit.",
            ].join("")}
            logoUrl={youtubeIconUrl}
        />,
        <GlReviewSlide
            signature="Signature"
            descriptionMd={[
                "Lorem ipsum dolor sit amet, consectetur ",
                `adipiscing elit. **Cras** vel nibh mi. `,
                "Aliquam fringilla, massa non vulputate tempus, ",
                "erat purus malesuada arcu, a imperdiet magna ",
                "turpis a ex. Proin non tempor ante. Integer ",
                "eu ipsum sit amet erat vulputate tincidunt ",
                "vel a dolor. Donec tincidunt pulvinar ex at suscipit.",
            ].join("")}
            logoUrl={redditIconUrl}
        />,
    ],
});
