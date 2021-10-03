import { GlLogoCard } from "../../GlCards/GlLogoCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import { GlCards as GlLogoCardSection } from "../../GlCards/GlCards";
import drawioPngSrc from "../assets/img/drawio.png";
import githubPngSrc from "../assets/img/github.png";
import tchapPngSrc from "../assets/img/tchap.png";
import balloonPngSrc from "../assets/img/balloon.png";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlLogoCardSection,
    },
    "defaultWidth": 1200,
});

export default meta;

export const Vue = getStory({
    "title": "Card Section Title",
    "children": (
        <>
            {[
                [githubPngSrc, tchapPngSrc],
                [balloonPngSrc],
                [githubPngSrc, tchapPngSrc, balloonPngSrc, drawioPngSrc],
            ].map((urls, index) => (
                <GlLogoCard
                    key={index}
                    buttonLabel="Button"
                    title="Title"
                    paragraph="Lorem Ipsum dolor si ame"
                    iconUrls={urls}
                    overlapIcons={index === 2}
                />
            ))}
        </>
    ),
});
