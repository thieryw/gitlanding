import { memo, useState, useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Animation, Initial } from "./types";
import type { Transition } from "framer-motion";
import { useAnimationOnScroll } from "./useAnimationOnScroll";

export type GlAnimatedOnScrollProps = {
    children?: ReactNode;
    animate?: Animation;
    initial?: Initial;
    rootMargin?: string;
    transition?: Transition;
};

export const GlAnimatedOnScroll = memo((props: GlAnimatedOnScrollProps) => {
    const { children, animate, initial, transition } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [animationProps, setAnimationProps] = useState<Animation>({});

    useAnimationOnScroll({
        animate,
        ref,
        setAnimationProps,
    });

    return (
        <motion.div
            animate={animationProps}
            initial={initial}
            transition={transition}
            ref={ref}
        >
            {children}
        </motion.div>
    );
});
