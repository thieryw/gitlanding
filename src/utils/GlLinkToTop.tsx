import { memo, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { makeStyles } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";
import { useGetScrollableParent } from "../tools/useGetScrollableParent";

export type GlLinkToTopProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

export const GlLinkToTop = memo((props: GlLinkToTopProps) => {
    const { className } = props;
    const [isShown, setIsShown] = useState(false);

    const { ref, scrollableParent } = useGetScrollableParent();

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
                const scrollTop = (() => {
                    if (scrollableParent === window) {
                        return (scrollableParent as Window & typeof globalThis)
                            .scrollY;
                    }
                    return (scrollableParent as HTMLElement).scrollTop;
                })();
                if (scrollTop / (window.innerHeight / 100) >= 70) {
                    setIsShown(true);
                    return;
                }

                setIsShown(false);
            });
        },
        [scrollableParent],
    );

    const { classes, cx } = useStyles({ isShown }, { props });

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

const useStyles = makeStyles<{ isShown: boolean }>({ "name": { GlLinkToTop } })(
    (theme, { isShown }) => ({
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
    }),
);
