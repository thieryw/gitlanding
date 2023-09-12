import { memo, useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { tss } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";
import { getScrollableParent } from "powerhooks/getScrollableParent";
import { useStateRef } from "powerhooks/useStateRef";

export type GlLinkToTopProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

export const GlLinkToTop = memo((props: GlLinkToTopProps) => {
    const { className } = props;
    const [isShown, setIsShown] = useState(false);
    const [scrollableParent, setScrollableParent] = useState<
        ReturnType<typeof getScrollableParent> | undefined
    >(undefined);

    const ref = useStateRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        setScrollableParent(
            getScrollableParent({
                element,
                "doReturnElementIfScrollable": true,
            }),
        );
    }, []);

    const onClick = useConstCallback(() => {
        if (scrollableParent === undefined) {
            return;
        }
        scrollableParent.scrollTo({
            "top": 0,
            "behavior": "smooth",
        });
    });

    useEvt(
        ctx => {
            if (scrollableParent === undefined) {
                return;
            }

            Evt.from(ctx, scrollableParent, "scroll").attach(() => {
                const { scrollTop } = scrollableParent;
                if (scrollTop / (window.innerHeight / 100) >= 70) {
                    setIsShown(true);
                    return;
                }

                setIsShown(false);
            });
        },
        [scrollableParent],
    );

    const { classes, cx } = useStyles({
        isShown,
        "classesOverrides": props.classes,
    });

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={cx(classes.root, className)}
        >
            <ArrowUpwardIcon className={classes.arrowIcon} />
        </div>
    );
});

const useStyles = tss
    .withParams<{ isShown: boolean }>()
    .withName({ GlLinkToTop })
    .create(({ theme, isShown }) => ({
        "root": {
            "transition": "opacity, 500ms",
            "zIndex": 1,
            "display": "flex",
            "backgroundColor": theme.colors.useCases.surfaces.background,
            "alignItems": "center",
            "borderRadius": 5,
            "justifyContent": "center",
            "padding": theme.spacing(1),
            "opacity": isShown ? 0.6 : 0,
            "pointerEvents": isShown ? undefined : "none",
            "position": "fixed",
            "border": `solid ${theme.colors.useCases.typography.textPrimary} 3px`,
            "top": "90%",
            "right": theme.paddingRightLeft,
            "cursor": "pointer",
        },
        "arrowIcon": {},
    }));
