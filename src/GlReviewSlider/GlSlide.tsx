import type { ReactNode } from "react";
import { memo } from "react";
import { makeStyles } from "../theme";

export type GlSlideProps = {
    className?: string;
    children?: ReactNode;
};

const useStyles = makeStyles()(theme => ({
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

export const GlSlide = memo((props: GlSlideProps) => {
    const { children, className } = props;

    const { classes, cx } = useStyles();

    return <div className={cx(classes.root, className)}>{children}</div>;
});
