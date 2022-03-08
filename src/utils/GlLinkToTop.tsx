import { memo, useState, useRef, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { makeStyles } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";
import { getScrollableParent } from "powerhooks/getScrollableParent";

export const GlLinkToTop = memo(() => {
    const [isShown, setIsShown] = useState(false);
    const [scrollableParent, setScrollableParent] = useState<
        HTMLElement | undefined
    >(undefined);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        setScrollableParent(getScrollableParent(ref.current));
    }, [ref.current]);

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
                const scrollTop = (scrollableParent as HTMLElement).scrollTop;
                if (scrollTop / (window.innerHeight / 100) >= 70) {
                    setIsShown(true);
                    return;
                }

                setIsShown(false);
            });
        },
        [scrollableParent],
    );

    const { classes } = useStyles({ isShown });

    return (
        <div ref={ref} onClick={onClick} className={classes.root}>
            <ArrowUpwardIcon />
        </div>
    );
});

const useStyles = makeStyles<{ isShown: boolean }>({ "name": { GlLinkToTop } })(
    (theme, { isShown }) => ({
        "root": {
            "transition": "opacity, 500ms",
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
    }),
);
