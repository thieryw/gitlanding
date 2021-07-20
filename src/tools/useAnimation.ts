/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import type { RefObject } from "react";

export function useAnimation<
    T extends "fade" | "fadeFromDirection",
    U extends HTMLElement = any,
>(params: {
    animationDuration?: number;
    animationDelay?: number;
    rootMargin?: string;
    animationType: T;
    triggerOnPageLoad?: boolean;
}): T extends "fade"
    ? {
          rootRef: RefObject<U>;
          animate: () => void;
      }
    : T extends "fadeFromDirection"
    ? {
          rootRef: RefObject<U>;
          animate: (params: {
              direction:
                  | "left"
                  | "right"
                  | "top"
                  | "bottom"
                  | "topLeft"
                  | "topRight"
                  | "bottomLeft"
                  | "bottomRight";
          }) => void;
      }
    : never {
    const rootRef = useRef<U>(null);
    const {
        animationDelay,
        animationDuration,
        rootMargin,
        animationType,
        triggerOnPageLoad,
    } = params;

    useEffect(() => {
        if (!rootRef.current) {
            return;
        }
        rootRef.current.style.opacity = "0%";
        rootRef.current.style.transitionTimingFunction = "ease-in-out";
        rootRef.current.style.transitionDelay = `${animationDelay ?? 0}ms`;
        rootRef.current.style.transitionTimingFunction = "ease-in-out";
    }, []);

    function fade() {
        if (!rootRef.current) {
            return;
        }

        const ref = rootRef.current;
        const style = ref.style;

        const observe = () => {
            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting || triggerOnPageLoad) {
                        style.transition = `opacity ${
                            animationDuration ?? 300
                        }ms`;
                        style.opacity = "100%";
                        observer.unobserve(entries[0].target);
                        window.removeEventListener("load", observe);
                        return;
                    }
                },
                { rootMargin },
            );
            observer.observe(ref);
        };
        if (triggerOnPageLoad) {
            observe();
            return;
        }
        window.addEventListener("load", observe);
    }

    function fadeFromDirection(params: {
        direction:
            | "left"
            | "right"
            | "top"
            | "bottom"
            | "topLeft"
            | "topRight"
            | "bottomLeft"
            | "bottomRight";
    }) {
        const { direction } = params;
        if (!rootRef.current) {
            return;
        }

        const ref = rootRef.current;
        const style = ref.style;

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
                    if (entries[0].isIntersecting || triggerOnPageLoad) {
                        style.transition = [
                            "opacity 300ms,",
                            `transform ${animationDuration ?? 300}ms`,
                        ].join(" ");
                        style.opacity = "100%";
                        style.transform = "none";
                        observer.unobserve(entries[0].target);
                        window.removeEventListener("load", observe);
                        return;
                    }
                },
                { rootMargin },
            );
            observer.observe(ref);
        };

        if (triggerOnPageLoad) {
            observe();
            return;
        }
        window.addEventListener("load", observe);
    }

    const animate = (() => {
        switch (animationType) {
            case "fade":
                return fade;
            case "fadeFromDirection":
                return fadeFromDirection;
        }
    })();

    return { rootRef, animate } as any;
}
