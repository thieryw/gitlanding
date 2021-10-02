import { memo } from "react";
import { makeStyles } from "./theme";

export type GlSectionDividerProps = {
    className?: string;
    variant?: "primary" | "secondary";
};

const useStyles = makeStyles()(theme => ({
    "root": {
        "display": "flex",
        "justifyContent": "center",
    },
    "primary": {
        "position": "relative",
        "backgroundColor": theme.colors.useCases.typography.textSecondary,
        "height": 1,
        "width": "80%",
        "margin": theme.spacing({
            "topBottom": 7,
            "rightLeft": 0,
        }),
    },
    "secondary": {
        "position": "relative",
        "height": 1,
        "width": "80%",
        "margin": theme.spacing({
            "topBottom": 7,
            "rightLeft": 0,
        }),
        ":before": {
            "content": `""`,
            "position": "absolute",
            "top": 0,
            "left": "5%",
            "width": "90%",
            "height": 1,
            "background": `linear-gradient(to right, transparent, ${theme.colors.useCases.typography.textPrimary}, transparent)`,
        },
    },
}));

export const GlSectionDivider = memo((props: GlSectionDividerProps) => {
    const { className, variant } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={classes.root}>
            <div
                className={cx(
                    variant === "secondary"
                        ? classes.secondary
                        : classes.primary,
                    className,
                )}
            ></div>
        </div>
    );
});
