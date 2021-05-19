import { useEffect } from "react";
import { Banner } from "./Banner";
import { MainSection } from "./MainSection";
import { ReviewSlider } from "./ReviewSlider";
import { Footer } from "./Footer";
import type { Props as BannerProps } from "./Banner";
import type { Props as MainSectionProps } from "./MainSection";
import type { Props as FooterProps } from "./Footer";
import type { Props as ReviewSliderProps } from "./ReviewSlider";
import { ThemeProvider } from "../../theme/ThemeProvider";

export type HomepageTemplate = {
    banner?: BannerProps;
    /**
     * enter the assets in an array.
     * example:
     * "mainSection": [
     *  {
     *      "imageHasFrame": false,
     *      "imageUrl": yourImage
     *      "article": {
     *          "title": "your title",
     *          "paragraphMd": "your paragraph"
     *      }
     *  },
     *  {
     *      "imageHasFrame": false,
     *      "imageUrl": yourImage
     *      "article": {
     *          "title": "your title",
     *          "paragraphMd": "your paragraph"
     *      }
     *  },
     * ]
     */
    mainSection?: MainSectionProps["dataBlocks"];
    /**
     * enter the assets in an array.
     * example:
     * "reviewSlider": [
     *  {
     *      "logoUrl": sliderLogo1,
     *      "descriptionMd": "your text"
     *      "signature": "reviewers signature"
     *  },
     *  {
     *      "logoUrl": sliderLogo2,
     *      "descriptionMd": "your text"
     *      "signature": "reviewers signature"
     *  }
     * ]
     */
    reviewSlider?: ReviewSliderProps["reviews"];
    footer?: FooterProps;
};

export const HomepageTemplate = (props: HomepageTemplate) => {
    const { footer, banner, mainSection, reviewSlider } = props;

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://buttons.github.io/buttons.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <ThemeProvider>
            <div className="homepage-template">
                {banner !== undefined && <Banner {...banner} />}

                {mainSection !== undefined && <MainSection dataBlocks={mainSection} />}

                {reviewSlider !== undefined && <ReviewSlider reviews={reviewSlider} />}

                {footer !== undefined && <Footer {...footer} />}
            </div>
        </ThemeProvider>
    );
};
