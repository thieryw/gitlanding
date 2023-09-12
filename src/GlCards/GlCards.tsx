/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import type { ReactNode } from "react";
import { Text } from "../theme";
import { tss } from "../theme";
import { breakpointsValues } from "../theme";
import { useEffect, useState } from "react";
import { useStateRef } from "powerhooks/useStateRef";

export type GlCardsProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    id?: string;
    title?: ReactNode;
    children?: ReactNode;
};

export const GlCards = memo((props: GlCardsProps) => {
    const { title, children, className, id } = props;
    const ref = useStateRef<HTMLDivElement>(null);

    const [numberOfCards, setNumberOfCards] = useState(0);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        setNumberOfCards(ref.current.childElementCount);
    }, []);

    const { classes, cx } = useStyles({
        numberOfCards,
        "classesOverrides": props.classes,
    });

    return (
        <section id={id} className={cx(classes.root, className)}>
            <div className={classes.titleWrapper}>
                {typeof title === "string" ? (
                    <Text className={classes.title} typo="page heading">
                        {title}
                    </Text>
                ) : (
                    title
                )}
            </div>
            <div ref={ref} className={classes.cardsWrapper}>
                {children}
            </div>
        </section>
    );
});

const useStyles = tss
    .withName({ GlCards })
    .withParams<{ numberOfCards: number }>()
    .create(({ theme, numberOfCards }) => ({
        "root": {
            ...theme.spacing.rightLeft(
                "padding",
                `${theme.paddingRightLeft}px`,
            ),
            ...theme.spacing.topBottom("margin", `${theme.spacing(7)}px`),
        },
        "titleWrapper": {
            "marginTop": theme.spacing(5),
            "marginBottom": theme.spacing(7),
            "display": "flex",
            "justifyContent": "center",
        },
        "title": {},
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
    }));
