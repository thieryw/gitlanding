import { GitLandingHeader } from "./GitLandingHeader";
import { GitLandingSection } from "./GitLandingSections";
import { ReviewSlider } from "./ReviewSlider";
import { GitLandingFooter } from "./GitLandingFooter";
import { ThumbNailSection } from "./ThumbNailSection";
import type { GitLandingHeaderProps } from "./GitLandingHeader";
import type { GitLandingSectionProps } from "./GitLandingSections";
import type { GitLandingFooterProps } from "./GitLandingFooter";
import type { Props as ReviewSliderProps } from "./ReviewSlider";
import type { ThumbNailSectionProps } from "./ThumbNailSection";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import { memo } from "react";
import { useIsDarkModeEnabled } from "onyxia-ui/lib/useIsDarkModeEnabled";
import { useEffect } from "react";

export type GitlandingProps = {
    className?: string;
    header?: GitLandingHeaderProps;
    mainSection?: GitLandingSectionProps;
    thumbNailSection?: ThumbNailSectionProps;
    reviewSlider?: ReviewSliderProps;
    footer?: GitLandingFooterProps;
};

export const Gitlanding = memo((props: GitlandingProps) => {
    const { thumbNailSection, footer, header, mainSection, reviewSlider, className } = props;

    const { ThemeProvider } = useGuaranteedMemo(() => getThemeApi(), []);

    const { setIsDarkModeEnabled } = useIsDarkModeEnabled();

    useEffect(() => {
        setIsDarkModeEnabled(false);
        document.documentElement.style.scrollBehavior = "smooth";
    }, []);

    return (
        <ThemeProvider>
            <div className={className}>
                {header && <GitLandingHeader {...header} />}

                {mainSection && (
                    <GitLandingSection
                        className={mainSection.className}
                        sections={mainSection.sections}
                    />
                )}

                {thumbNailSection && <ThumbNailSection {...thumbNailSection} />}

                {reviewSlider && (
                    <ReviewSlider className={reviewSlider.className} reviews={reviewSlider.reviews} />
                )}

                {footer && <GitLandingFooter {...footer} />}
            </div>
        </ThemeProvider>
    );
});
