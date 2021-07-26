import { memo } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useNamedState } from "powerhooks";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";
import { GlIconButton } from "../utils/GlIconButton";
import { motion } from "framer-motion";
import { makeStyles } from "../theme";

const useStyles = makeStyles()({
    "root": {
        "display": "flex",
        "width": 50,
        "height": 50,
        "alignItems": "center",
        "justifyContent": "center",
        "padding": 0,
    },
});

export type GlDarkModeSwitchProps = {
    className?: string;
};

export const GlDarkModeSwitch = memo((props: GlDarkModeSwitchProps) => {
    const { className } = props;
    const { isDarkModeEnabled, setIsDarkModeEnabled } = useIsDarkModeEnabled();
    const { motionProps, setMotionProps } = useNamedState("motionProps", {
        "rotate": 0,
    });

    const onClick = useConstCallback(() => {
        setIsDarkModeEnabled(!isDarkModeEnabled);
        setMotionProps({
            "rotate": motionProps.rotate === 0 ? 360 : 0,
        });
    });

    const { classes } = useStyles();

    return (
        <motion.div className={classes.root} animate={motionProps}>
            <GlIconButton
                className={className}
                iconId={isDarkModeEnabled ? "brightness7" : "brightness4"}
                onClick={onClick}
            />
        </motion.div>
    );
});
