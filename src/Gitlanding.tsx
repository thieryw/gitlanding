import { GitLandingHeader } from "./GitLandingHeader";
import { GitLandingSection } from "./GitLandingSections";
import { ReviewSlider } from "./ReviewSlider";
import { GitLandingFooter } from "./GitLandingFooter";
import type { GitLandingHeaderProps } from "./GitLandingHeader";
import type { GitLandingSectionProps } from "./GitLandingSections";
import type { GitLandingFooterProps } from "./GitLandingFooter";
import type { Props as ReviewSliderProps } from "./ReviewSlider";
import { ThemeProvider } from "./theme";
import { memo } from "react";

export type GitlandingProps = {
    className?: string;
    header?: GitLandingHeaderProps;
    mainSection?: GitLandingSectionProps;
    reviewSlider?: ReviewSliderProps;
    footer?: GitLandingFooterProps;
};

export const Gitlanding = memo((props: GitlandingProps) => {
    const { footer, header, mainSection, reviewSlider, className } = props;

    return (
        <ThemeProvider>
            <div className={className}>
                {header !== undefined && <GitLandingHeader {...header} />}

                {mainSection !== undefined && (
                    <GitLandingSection
                        className={mainSection.className}
                        sections={mainSection.sections}
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
