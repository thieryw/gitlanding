import { memo, useState, useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Animation, Initial } from "./types";
import type { Transition } from "framer-motion";
import { useAnimationOnScroll } from "./useAnimationOnScroll";

export type GlAnimatedOnScrollProps = {
    className?: string;
    children?: ReactNode;
    animate?: Animation;
    initial?: Initial;
    rootMargin?: string;
    transition?: Transition;
    onClick?: () => void;
};

export const GlAnimatedOnScroll = memo((props: GlAnimatedOnScrollProps) => {
    const {
        children,
        animate,
        initial,
        transition,
        className,
        onClick,
        rootMargin,
    } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [animationProps, setAnimationProps] = useState<Animation>({});

    useAnimationOnScroll({
        animate,
        ref,
        setAnimationProps,
        rootMargin,
    });

    return (
        <motion.div
            animate={animationProps}
            initial={initial}
            transition={transition}
            ref={ref}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
});
