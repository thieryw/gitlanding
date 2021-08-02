/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import type { ReactNode } from "react";
import { Text } from "../theme";
import { makeStyles } from "../theme";
import { breakpointsValues } from "onyxia-ui";
import { useRef, useEffect, useState } from "react";

export type GlCardsProps = {
    className?: string;
    title?: string;
    children?: ReactNode;
};

const useStyles = makeStyles<{ numberOfCards: number }>()(
    (theme, { numberOfCards }) => ({
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

        "cards": {
            "display": "flex",
            "flexWrap": "wrap",
            "& > *": {
                "flex": (() => {
                    if (theme.windowInnerWidth >= 1400) {
                        //return "1 1 30%";
                        return numberOfCards > 3 ? "1 1 20%" : "1 1 30%";
                    }

                    if (theme.windowInnerWidth >= 686) {
                        return "1 1 40%";
                    }

                    return "1 1 100%";
                })(),
            },
        },
    }),
);

export const GlCards = memo((props: GlCardsProps) => {
    const { title, children, className } = props;
    const ref = useRef<HTMLDivElement>(null);

    const [numberOfCards, setNumberOfCards] = useState(0);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        setNumberOfCards(ref.current.childElementCount);
    }, []);

    const { classes } = useStyles({ numberOfCards });

    return (
        <section className={className}>
            {title && (
                <Text className={classes.title} typo="page heading">
                    {title}
                </Text>
            )}
            <div ref={ref} className={classes.cards}>
                {children}
            </div>
        </section>
    );
});
