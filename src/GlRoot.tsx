import { GlHeader } from "./GlHeader";
import type { GlHeaderProps } from "./GlHeader";
import { GlHero } from "./GlHero";
import type { GlHeroProps } from "./GlHero";
import { GlSections } from "./GlSections";
import type { GlSectionsProps } from "./GlSections";
import { GlReviewSlider } from "./GlReviewSlider";
import { GlFooter } from "./GlFooter";
import { GlCardSection } from "./GlCardSection";
import type { GlReviewSliderProps } from "./GlReviewSlider";
import type { GlCardSectionProps } from "./GlCardSection";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import { useState, memo } from "react";
import { useEffect } from "react";
import { getThemeApi } from "./theme";

export type GlRootProps = {
    header?: GlHeaderProps;
    hero?: GlHeroProps;
    mainSection?: GlSectionsProps;
    cardSection?: GlCardSectionProps;
    reviewSlider?: GlReviewSliderProps;
    footer?: GlFooter;
};

export const { GlRoot } = (() => {
    const { GlRootInner } = (() => {
        const getUseClassNames = () => {
            const { createUseClassNames } = getThemeApi();

            const { useClassNames } = createUseClassNames()(() => ({
                "root": {
                    "height": "100%",
                    "display": "flex",
                    "flexDirection": "column",
                },
                "scrollWrapper": {
                    "flex": 1,
                    "overflow": "auto",
                },
            }));

            return { useClassNames };
        };

        const GlRootInner = memo((props: GlRootProps) => {
            const { cardSection, footer, header, hero, mainSection, reviewSlider } = props;

            const [{ useClassNames }] = useState(() => getUseClassNames());

            const { classNames } = useClassNames({});

            return (
                <div className={classNames.root}>
                    {header !== undefined && <GlHeader {...header} />}

                    <div className={classNames.scrollWrapper}>
                        {hero !== undefined && <GlHero {...hero} />}

                        {mainSection !== undefined && (
                            <GlSections
                                className={mainSection.className}
                                sections={mainSection.sections}
                            />
                        )}

                        {cardSection !== undefined && <GlCardSection {...cardSection} />}

                        {reviewSlider !== undefined && (
                            <GlReviewSlider
                                className={reviewSlider.className}
                                reviews={reviewSlider.reviews}
                            />
                        )}

                        {footer !== undefined && <GlFooter {...footer} />}
                    </div>
                </div>
            );
        });

        return { GlRootInner };
    })();

    const GlRoot = memo((props: GlRootProps) => {
        const { ThemeProviderOrId } = useGuaranteedMemo(() => getThemeApi(), []);

        useEffect(() => {
            document.documentElement.style.scrollBehavior = "smooth";
        }, []);

        return (
            <ThemeProviderOrId>
                <GlRootInner {...props} />
            </ThemeProviderOrId>
        );
    });

    return { GlRoot };
})();
