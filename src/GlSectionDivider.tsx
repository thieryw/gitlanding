import { memo } from "react";
import { tss } from "tss";

export type GlSectionDividerProps = {
    className?: string;
};

export const GlSectionDivider = memo((props: GlSectionDividerProps) => {
    const { className } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            <div className={cx(classes.inner)}></div>
        </div>
    );
});

const useStyles = tss.withName({ GlSectionDivider }).create(({ theme }) => ({
    "root": {
        "display": "flex",
        "justifyContent": "center",
        ...theme.spacing.topBottom("padding", `${theme.spacing(7)}px`),
    },
    "inner": {
        "backgroundColor": theme.colors.useCases.typography.textTertiary,
        "height": 1,
        "width": "60%",
    },
}));
