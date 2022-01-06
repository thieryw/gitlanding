/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import type { ReactNode } from "react";
import { Text } from "../theme";
import { makeStyles } from "../theme";
import { breakpointsValues } from "../theme";
import { useRef, useEffect, useState } from "react";
import { useMergedClasses } from "tss-react";

export type GlCardsProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    id?: string;
    title?: string;
    children?: ReactNode;
};

export const GlCards = memo((props: GlCardsProps) => {
    const { title, children, className, id, classes: classesProp } = props;
    const ref = useRef<HTMLDivElement>(null);

    const [numberOfCards, setNumberOfCards] = useState(0);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        setNumberOfCards(ref.current.childElementCount);
    }, []);

    const { classes, cx } = useStyles({ numberOfCards });
    const mergedClasses = useMergedClasses(classes, classesProp);

    return (
        <section id={id} className={cx(mergedClasses.root, className)}>
            {title && (
                <Text className={mergedClasses.title} typo="page heading">
                    {title}
                </Text>
            )}
            <div ref={ref} className={mergedClasses.cardsWrapper}>
                {children}
            </div>
        </section>
    );
});

const useStyles = makeStyles<{ numberOfCards: number }>()(
    (theme, { numberOfCards }) => ({
        "root": {
            "position": "relative",
            ...(() => {
                const value = theme.spacing(7);
                return {
                    "marginTop": value,
                    "marginBottom": value,
                };
            })(),
        },
        "title": {
            "textAlign": "center",
            "marginTop": theme.spacing(5),
            "marginBottom": theme.spacing(7),
            ...(() => {
                if (theme.windowInnerWidth >= breakpointsValues.lg) {
                    return {};
                }
                return {
                    "fontSize": "22px",
                    "lineHeight": "24px",
                };
            })(),
        },

        "cardsWrapper": {
            "display": "grid",
            "gridTemplateColumns": (() => {
                if (theme.windowInnerWidth >= breakpointsValues.lg) {
                    return `repeat(${
                        numberOfCards > 4 ? 4 : numberOfCards
                    }, 1fr)`;
                }

                if (theme.windowInnerWidth >= breakpointsValues.md) {
                    return `repeat(${
                        numberOfCards > 3 ? 2 : numberOfCards
                    }, 1fr)`;
                }

                if (theme.windowInnerWidth >= breakpointsValues.sm) {
                    return `repeat(${numberOfCards > 3 ? 2 : 1}, 1fr)`;
                }

                return undefined;
            })(),
        },
    }),
);
