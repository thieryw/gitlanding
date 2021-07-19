import type { ReactNode } from "react";
import { memo } from "react";
import { makeStyles } from "../theme";

const useStyles = makeStyles()(theme => ({
    "root": {
        "borderRadius": 16,
        "transition": "box-shadow 200ms",
        "margin": theme.spacing(1.5),
        "boxShadow": theme.shadows[1],
        "backgroundColor": theme.colors.useCases.surfaces.surface1,
        ":hover": {
            "boxShadow": theme.shadows[2],
            "cursor": "pointer",
        },
    },
}));

export type GlCardProps = {
    className?: string;
    children?: ReactNode;
    link?: {
        href?: string;
        onClick?: () => void;
    };
};

export const GlCard = memo((props: GlCardProps) => {
    const { children, link, className } = props;

    const { classes, cx } = useStyles();

    return (
        <div
            onClick={
                link?.onClick ??
                (() => (window.location.href = link?.href ?? "#"))
            }
            className={cx(classes.root, className)}
        >
            {children}
        </div>
    );
});
