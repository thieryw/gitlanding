import type { ReactNode } from "react";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlSlideProps = {
    className?: string;
    children?: ReactNode;
};

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles()(theme => ({
        "root": {
            "position": "relative",
            "minWidth": "100%",
            "display": "flex",
            "justifyContent": "center",
            "overflow": "hidden",
            ...(() => {
                const value = theme.spacing(4);
                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                };
            })(),
        },
    }));

    return { useStyles };
};

export const GlSlide = memo((props: GlSlideProps) => {
    const { children, className } = props;

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles();

    return <div className={cx(classes.root, className)}>{children}</div>;
});
