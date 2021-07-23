import type { RefObject } from "react";
import type { GlAnimatedOnScrollProps } from "./GlAnimatedOnScroll";
import type { Animation } from "./types";

export function useAnimationOnScroll(
    params: Pick<GlAnimatedOnScrollProps, "animate" | "rootMargin"> & {
        ref: RefObject<HTMLDivElement>;
        setAnimationProps: React.Dispatch<React.SetStateAction<Animation>>;
    },
) {
    const { ref, animate, setAnimationProps, rootMargin } = params;

    const observe = () => {
        if (!ref.current) {
            return;
        }
        const observer = new IntersectionObserver(
            entries => {
                if (!entries[0].isIntersecting) {
                    return;
                }

                setAnimationProps(animate);
                observer.unobserve(entries[0].target);
                window.removeEventListener("load", observe);
            },
            { rootMargin },
        );

        observer.observe(ref.current);
    };

    window.addEventListener("load", observe);
}
