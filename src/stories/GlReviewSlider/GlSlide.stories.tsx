import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";
import { GlSlideTemplate } from "../../GlReviewSlider/GlSlideTemplate";
import redditIconUrl from "../assets/svg/reddit.svg";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlSlideTemplate },
});

export default meta;

export const Vue = getStory({
    "descriptionMd": [
        "Lorem ipsum dolor sit amet, consectetur ",
        `adipiscing elit. **Cras** vel nibh mi. `,
        "Aliquam fringilla, massa non vulputate tempus, ",
        "erat purus malesuada arcu, a imperdiet magna ",
        "turpis a ex. Proin non tempor ante. Integer ",
        "eu ipsum sit amet erat vulputate tincidunt ",
        "vel a dolor. Donec tincidunt pulvinar ex at suscipit.",
    ].join(""),
    "signature": "John Doe",
    "logoUrl": redditIconUrl,
});
