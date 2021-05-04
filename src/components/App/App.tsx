import { Header } from "./Header";
import { MainSection } from "./MainSection";
import { ReviewSlider } from "./ReviewSlider";
import { Footer } from "./Footer";
import type { Props as HeaderProps } from "./Header";
import type { Props as MainSectionProps } from "./MainSection";
import type { Props as FooterProps } from "./Footer";
import type { Props as ReviewSliderProps } from "./ReviewSlider";

export type Props = {
    headerData?: HeaderProps;
    mainSectionData?: MainSectionProps["dataBlocks"];
    reviewSliderData?: ReviewSliderProps["reviews"];
    footerData?: FooterProps;
};

export const App = (props: Props) => {
    const { footerData, headerData, mainSectionData, reviewSliderData } = props;

    return (
        <>
            {headerData !== undefined && <Header {...headerData} />}

            {mainSectionData !== undefined && <MainSection dataBlocks={mainSectionData} />}

            {reviewSliderData !== undefined && <ReviewSlider reviews={reviewSliderData} />}

            {footerData !== undefined && <Footer {...footerData} />}
        </>
    );
};
