import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";
import { GlReviewSlider } from "../../GlReviewSlider";
import { GlSlideTemplate } from "../../GlReviewSlider/GlSlideTemplate";
import twitterIconUrl from "../assets/svg/twitter.svg";
import redditIconUrl from "../assets/svg/reddit.svg";
import youtubeIconUrl from "../assets/svg/youtube.svg";
import example2ImageUrl from "../assets/img/example2.jpeg";
import example3ImageUrl from "../assets/img/example3.jpeg";
import example4ImageUrl from "../assets/img/example4.jpeg";
import { css } from "tss-react";
import { GlSlide } from "../../GlReviewSlider/GlSlide";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlReviewSlider },
});

export default meta;

export const VueReviewSlider = getStory({
    "title": "Review Slider Example",
    "sliderContent": (
        <>
            <GlSlideTemplate
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
            />
            <GlSlideTemplate
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
            />
            <GlSlideTemplate
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
            />
        </>
    ),
});

export const VueImageSlider = getStory({
    "title": "Image Slider Example",
    "className": css({
        "& img": {
            "width": "100%",
        },
    }),
    "sliderContent": [example2ImageUrl, example3ImageUrl, example4ImageUrl].map(
        (image, index) => (
            <GlSlide>
                <img src={image} alt="slider" key={index} />
            </GlSlide>
        ),
    ) /* <>
		<GlSlide>
			<img src={example2ImageUrl} alt="slider image 1" />
		</GlSlide>
		<GlSlide>
			<img src={example3ImageUrl} alt="slider image 2" />
		</GlSlide>
		<GlSlide>
			<img src={example4ImageUrl} alt="slider image 3" />
		</GlSlide>

	</>*/,
});
