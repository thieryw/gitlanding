import type { ReactNode } from "react";
import { memo } from "react";
import { makeStyles } from "../theme";
import { GlAnimatedOnScroll } from "../GlAnimatedOnScroll";
import type { GlAnimatedOnScrollProps } from "../GlAnimatedOnScroll";

const useStyles = makeStyles()(theme => ({
    "root": {
        "borderRadius": 16,
        "transition": "box-shadow 200ms",
        "margin": theme.spacing(1),
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
} & Pick<
    GlAnimatedOnScrollProps,
    "animate" | "initial" | "rootMargin" | "transition"
>;

export const GlCard = memo((props: GlCardProps) => {
    const {
        children,
        link,
        className,
        animate,
        initial,
        rootMargin,
        transition,
    } = props;

    const { classes, cx } = useStyles();

    return (
        <GlAnimatedOnScroll
            animate={animate}
            initial={initial}
            rootMargin={rootMargin}
            transition={transition}
            className={cx(classes.root, className)}
            onClick={
                link?.onClick ??
                (() => (window.location.href = link?.href ?? "#"))
            }
        >
            {children}
        </GlAnimatedOnScroll>
    );
});
