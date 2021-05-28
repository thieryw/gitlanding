import { useEffect } from "react";
import { GitLandingHeader } from "./GitLandingHeader";
import { MainSection } from "./MainSection";
import { ReviewSlider } from "./ReviewSlider";
import { Footer } from "./Footer";
import type { GitLandingHeaderProps } from "./GitLandingHeader";
import type { Props as MainSectionProps } from "./MainSection";
import type { Props as FooterProps } from "./Footer";
import type { Props as ReviewSliderProps } from "./ReviewSlider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { memo } from "react";

export type GitlandingProps = {
    header?: GitLandingHeaderProps;
    mainSection?: MainSectionProps;
    reviewSlider?: ReviewSliderProps;
    footer?: FooterProps;
    className?: string;
};

export const Gitlanding = memo((props: GitlandingProps) => {
    const { footer, header, mainSection, reviewSlider, className } = props;

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
                {header !== undefined && <GitLandingHeader {...header} />}

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
