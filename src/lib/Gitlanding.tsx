import { useEffect } from "react";
import { GitLandingHeader } from "./GitLandingHeader";
import { GitLandingSection } from "./GitLandingSection";
import { ReviewSlider } from "./ReviewSlider";
import { GitLandingFooter } from "./GitLandingFooter";
import type { GitLandingHeaderProps } from "./GitLandingHeader";
import type { GitLandingSectionProps } from "./GitLandingSection";
import type { GitLandingFooterProps } from "./GitLandingFooter";
import type { Props as ReviewSliderProps } from "./ReviewSlider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { memo } from "react";

export type GitlandingProps = {
    header?: GitLandingHeaderProps;
    mainSection?: GitLandingSectionProps;
    reviewSlider?: ReviewSliderProps;
    footer?: GitLandingFooterProps;
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
                    <GitLandingSection
                        className={mainSection.className}
                        dataBlocks={mainSection.dataBlocks}
                    />
                )}

                {reviewSlider !== undefined && (
                    <ReviewSlider className={reviewSlider.className} reviews={reviewSlider.reviews} />
                )}

                {footer !== undefined && <GitLandingFooter {...footer} />}
            </div>
        </ThemeProvider>
    );
});
