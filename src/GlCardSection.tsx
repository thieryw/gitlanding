/* eslint-disable @typescript-eslint/no-namespace */
import { memo, useRef } from "react";
import { GlCardVariant } from "./GlCardVariant";
import type { GlCardVariantProps } from "./GlCardVariant";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { Typography } from "onyxia-ui/Typography";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo, useNamedState, useConstCallback } from "powerhooks";
import { breakpointsValues } from "onyxia-ui/lib";
import { cx } from "tss-react";

export type GlCardSectionProps = {
    className?: string;
    title?: string;
    cards?: GlCardSectionProps.Card[];
    /**
     * specify the maximum screen width in witch the thumbnails
     * are displayed as columns.
     */
    breakpointForColumnDisplay?: number;
    showMoreMessage?: string;
};

export declare namespace GlCardSectionProps {
    export type Card = Card.Normal | Card.Variant;
    export namespace Card {
        export type Normal = {
            type: "normal";
        } & GlCardProps;

        export type Variant = {
            type: "variant";
        } & GlCardVariantProps;
    }
}

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        hasTitle: boolean;
        breakpointForColumnDisplay: number;
        numberOfCards: number;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }>()((theme, { breakpointForColumnDisplay, hasTitle, numberOfCards }) => ({
        "root": {
            "marginBottom": theme.spacing(5),
            ...(() => {
                const value = theme.spacing(12.5);

                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                };
            })(),

            ...(theme.responsive.down("lg")
                ? {
                      ...(() => {
                          const value = theme.spacing(1);

                          return {
                              "paddingLeft": value,
                              "paddingRight": value,
                          };
                      })(),
                  }
                : {}),
        },
        "title": {
            "marginBottom": theme.spacing(7.5),
            "marginTop": theme.spacing(17.25),
            "display": "flex",
            "justifyContent": hasTitle ? "space-between" : "flex-end",
            "& h3": {
                "color": theme.colors.palette.orangeWarning.main,
                "cursor": "pointer",
            },
            ...(theme.responsive.down("sm")
                ? {
                      "marginTop": theme.spacing(8),
                  }
                : {}),
        },

        "sectionTitle": {
            "marginLeft": theme.spacing(2),
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "22px",
                      "lineHeight": "24px",
                  }
                : {}),
        },

        "cards": {
            "display": "flex",
            "flexWrap": "wrap",
            "& > *": {
                "flex": `1 1 ${(() => {
                    if (numberOfCards < 4) {
                        return 100 / (numberOfCards + 1);
                    }

                    return 100 / 5;
                })()}%`,

                ...(theme.responsive.down(1000)
                    ? {
                          "flex": "1 1 33%",
                      }
                    : {}),
                ...(theme.responsive.down(686)
                    ? {
                          "flex": "1 1 100%",
                      }
                    : {}),
            },

            /*"gap": theme.spacing(3),
            ...(theme.responsive.down("lg")
                ? {
                      "gap": theme.spacing(2),
                  }
                : {}),*/
        },
        "card": {
            ...(theme.responsive.down(breakpointForColumnDisplay) ? {} : {}),
        },
    }));

    return { useClassNames };
};
export const GlCardSection = memo((props: GlCardSectionProps) => {
    const {
        title,
        cards,
        className,
        breakpointForColumnDisplay = breakpointsValues["sm"],
        showMoreMessage,
    } = props;

    const sectionRef = useRef<HTMLDivElement>(null);

    const { areExtraThumbNailsExposed, setAreExtraThumbNailsExposed } = useNamedState(
        "areExtraThumbNailsExposed",
        false,
    );

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        breakpointForColumnDisplay,
        "hasTitle": title !== undefined,
        "numberOfCards": cards !== undefined ? cards.length : 0,
    });

    const exposeHiddenThumbNails = useConstCallback(async () => {
        setAreExtraThumbNailsExposed(!areExtraThumbNailsExposed);

        if (areExtraThumbNailsExposed || !sectionRef.current) {
            return;
        }

        await new Promise<void>(resolve => setTimeout(resolve, 1));

        window.scrollTo({
            "behavior": "smooth",
            "top": window.scrollY + sectionRef.current.getBoundingClientRect().top,
        });
    });

    return (
        <section ref={sectionRef} className={cx(classNames.root, className)}>
            {title && (
                <div className={classNames.title}>
                    <Typography className={classNames.sectionTitle} variant="h2">
                        {title}
                    </Typography>

                    {cards && cards.length > 4 && (
                        <Typography onClick={exposeHiddenThumbNails} variant="h3">
                            {showMoreMessage ? showMoreMessage : "Show More"} ({cards.length})
                        </Typography>
                    )}
                </div>
            )}

            {cards && (
                <div className={classNames.cards}>
                    {cards
                        .filter(areExtraThumbNailsExposed ? () => true : (...[, i]) => i < 4)
                        .map((card, index) => {
                            switch (card.type) {
                                case "normal":
                                    return <GlCard className={classNames.card} key={index} {...card} />;
                                case "variant":
                                    return (
                                        <GlCardVariant
                                            className={classNames.card}
                                            key={index}
                                            {...card}
                                        />
                                    );
                            }
                        })}
                </div>
            )}
        </section>
    );
});
