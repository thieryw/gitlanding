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
import { memo } from "react";

export type GitlandingProps = {
    banner?: BannerProps;
    mainSection?: MainSectionProps;
    reviewSlider?: ReviewSliderProps;
    footer?: FooterProps;
    className?: string;
};

export const Gitlanding = memo((props: GitlandingProps) => {
    const { footer, banner, mainSection, reviewSlider, className } = props;

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
            <div className={className}>
                {banner !== undefined && <Banner {...banner} />}

                {mainSection !== undefined && (
                    <MainSection className={mainSection.className} dataBlocks={mainSection.dataBlocks} />
                )}

                {reviewSlider !== undefined && (
                    <ReviewSlider className={reviewSlider.className} reviews={reviewSlider.reviews} />
                )}

                {footer !== undefined && <Footer {...footer} />}
            </div>
        </ThemeProvider>
    );
});
