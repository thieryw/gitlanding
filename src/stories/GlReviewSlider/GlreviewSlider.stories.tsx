import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";
import { GlSlider } from "../../GlSlider";
import { GlReviewSlide } from "../../GlReviewSlide";
import twitterIconUrl from "../assets/svg/twitter.svg";
import redditIconUrl from "../assets/svg/reddit.svg";
import youtubeIconUrl from "../assets/svg/youtube.svg";
import example2ImageUrl from "../assets/img/example2.jpeg";
import example3ImageUrl from "../assets/img/example3.jpeg";
import example4ImageUrl from "../assets/img/example4.jpeg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlSlider },
});

export default meta;

export const VueReviewSlider = getStory({
    "title": "Review Slider Example",
    "slides": [
        <GlReviewSlide
            signature="John Doe"
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
            signature="Martin Ford"
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
            signature="Robin Hood"
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

export const VueImageSlider = getStory({
    "title": "Image Slider Example",
    "slides": [
        <img src={example2ImageUrl} />,
        <img src={example3ImageUrl} />,
        <img src={example4ImageUrl} />,
    ],
});
