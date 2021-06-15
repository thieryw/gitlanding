import { GitLandingHeader } from "./GitLandingHeader";
import { GitLandingSection } from "./GitLandingSections";
import { ReviewSlider } from "./ReviewSlider";
import { GitLandingFooter } from "./GitLandingFooter";
import { CardSection } from "./CardSection";
import type { GitLandingHeaderProps } from "./GitLandingHeader";
import type { GitLandingSectionProps } from "./GitLandingSections";
import type { GitLandingFooterProps } from "./GitLandingFooter";
import type { Props as ReviewSliderProps } from "./ReviewSlider";
import type { CardSectionProps } from "./CardSection";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import { memo } from "react";
import { useEffect } from "react";

export type GitlandingProps = {
    className?: string;
    header?: GitLandingHeaderProps;
    mainSection?: GitLandingSectionProps;
    cardSection?: CardSectionProps;
    reviewSlider?: ReviewSliderProps;
    footer?: GitLandingFooterProps;
};

export const Gitlanding = memo((props: GitlandingProps) => {
    const { cardSection, footer, header, mainSection, reviewSlider, className } = props;

    const { ThemeProvider } = useGuaranteedMemo(() => getThemeApi(), []);

    useEffect(() => {
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

                {cardSection && <CardSection {...cardSection} />}

                {reviewSlider && (
                    <ReviewSlider className={reviewSlider.className} reviews={reviewSlider.reviews} />
                )}

                {footer && <GitLandingFooter {...footer} />}
            </div>
        </ThemeProvider>
    );
});
