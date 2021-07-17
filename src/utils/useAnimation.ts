import { useRef } from "react";

export function useAnimation<T extends HTMLElement = any>(params: {
    animationDuration?: number;
    animationDelay?: number;
    direction?:
        | "left"
        | "right"
        | "top"
        | "bottom"
        | "topLeft"
        | "topRight"
        | "bottomLeft"
        | "bottomRight";
    rootMargin?: string;
}) {
    const rootRef = useRef<T>(null);
    const { direction, animationDelay, animationDuration, rootMargin } = params;

    function animate() {
        if (!rootRef.current) {
            return;
        }

        const ref = rootRef.current;
        const style = ref.style;

        style.opacity = "0%";

        style.transform = (() => {
            switch (direction) {
                case "left":
                    return "translateX(-150px)";
                case "top":
                    return "translateY(-150px)";
                case "right":
                    return "translateX(150px)";
                case "bottom":
                    return "translateY(150px)";
                case "topLeft":
                    return "translate(-150px, -150px)";
                case "topRight":
                    return "translate(150px, -150px)";
                case "bottomLeft":
                    return "translate(-150px, 150px)";
                case "bottomRight":
                    return "translate(150px, 150px)";
                case undefined:
                    return "none";
            }
        })();

        const observe = () => {
            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        style.transition = (() => {
                            if (direction === undefined) {
                                return `opacity ${animationDuration ?? 300}ms`;
                            }

                            return [
                                "opacity 300ms,",
                                `transform ${animationDuration ?? 300}ms`,
                            ].join(" ");
                        })();

                        style.transitionDelay = `${animationDelay ?? 0}ms`;
                        style.opacity = "100%";
                        if (direction !== undefined) {
                            style.transform = "none";
                        }
                        style.transitionTimingFunction = "ease-in-out";
                        observer.unobserve(entries[0].target);
                        window.removeEventListener("load", observe);
                        return;
                    }
                },
                { rootMargin },
            );
            observer.observe(ref);
        };
        window.addEventListener("load", observe);
    }

    return { rootRef, animate };
}
