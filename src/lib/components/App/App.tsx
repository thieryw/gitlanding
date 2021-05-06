import { Header } from "./Header";
import { MainSection } from "./MainSection";
import { ReviewSlider } from "./ReviewSlider";
import { Footer } from "./Footer";
import type { Props as HeaderProps } from "./Header";
import type { Props as MainSectionProps } from "./MainSection";
import type { Props as FooterProps } from "./Footer";
import type { Props as ReviewSliderProps } from "./ReviewSlider";

export type Props = {
    header?: HeaderProps;
    mainSection?: MainSectionProps["dataBlocks"];
    reviewSlider?: ReviewSliderProps["reviews"];
    footer?: FooterProps;
};

export const App = (props: Props) => {
    const { footer, header, mainSection, reviewSlider } = props;

    return (
        <>
            {header !== undefined && <Header {...header} />}

            {mainSection !== undefined && <MainSection dataBlocks={mainSection} />}

            {reviewSlider !== undefined && <ReviewSlider reviews={reviewSlider} />}

            {footer !== undefined && <Footer {...footer} />}
        </>
    );
};
