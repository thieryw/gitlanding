import { memo, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { makeStyles } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";

export const GlLinkToTop = memo(() => {
    const [isShown, setIsShown] = useState(false);

    const onClick = useConstCallback(() => {
        window.scrollTo({
            "top": 0,
            "behavior": "smooth",
        });
    });

    useEvt(ctx => {
        Evt.from(ctx, window, "scroll").attach(() => {
            if (window.scrollY / (window.innerHeight / 100) >= 70) {
                setIsShown(true);
                return;
            }

            setIsShown(false);
        });
    }, []);

    const { classes } = useStyles({ isShown });

    return (
        <div onClick={onClick} className={classes.root}>
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
            "zIndex": 9000,
            "top": "90%",
            "right": theme.paddingRightLeft,
            "cursor": "pointer",
        },
    }),
);
