import { Banner } from "./Banner";
import { MainSection } from "./MainSection";
import { ReviewSlider } from "./ReviewSlider";
import { Footer } from "./Footer";
import type { Props as BannerProps } from "./Banner";
import type { Props as MainSectionProps } from "./MainSection";
import type { Props as FooterProps } from "./Footer";
import type { Props as ReviewSliderProps } from "./ReviewSlider";

export type Props = {
    banner?: BannerProps;
    mainSection?: MainSectionProps["dataBlocks"];
    reviewSlider?: ReviewSliderProps["reviews"];
    footer?: FooterProps;
};

export const App = (props: Props) => {
    const { footer, banner, mainSection, reviewSlider } = props;

    return (
        <>
            {banner !== undefined && <Banner {...banner} />}

            {mainSection !== undefined && <MainSection dataBlocks={mainSection} />}

            {reviewSlider !== undefined && <ReviewSlider reviews={reviewSlider} />}

            {footer !== undefined && <Footer {...footer} />}
        </>
    );
};
