import { useRef } from "react";

export function useAnimation<T extends HTMLElement = any>(params: {
    animationType: "fade";
    animationDuration?: number;
    animationDelay?: number;
}) {
    const rootRef = useRef<T>(null);
    const { animationType, animationDelay, animationDuration } = params;

    function fade() {
        if (!rootRef.current) {
            return;
        }

        const style = rootRef.current.style;

        style.opacity = "0%";
        style.transition = `opacity ${animationDuration ?? 300}ms`;
        if (animationDelay !== undefined) {
            style.transitionDelay = `${animationDelay}ms`;
        }

        const observer = new IntersectionObserver(entries => {
            if (!rootRef.current) {
                return;
            }
            if (entries[0].isIntersecting) {
                style.opacity = "100%";
                return;
            }

            style.opacity = "0%";
        });

        observer.observe(rootRef.current);
    }

    const animate = (() => {
        switch (animationType) {
            case "fade":
                return fade;
        }
    })();

    return { rootRef, animate };
}
