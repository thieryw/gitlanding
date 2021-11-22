import { useEffect, useRef, useMemo } from "react";
import type { RefObject } from "react";

export function useIntersectionObserver<T extends HTMLElement = any>(params: {
    callback: (params: {
        entry: IntersectionObserverEntry;
        observer: IntersectionObserver;
    }) => void;
    rootMargin?: string;
    root?: Element | Document;
    threshold?: number | number[];
}): {
    ref: RefObject<T>;
} {
    const { callback, ...rest } = params;

    const ref = useRef<T>(null);

    const observer = useMemo(() => {
        return new IntersectionObserver(
            entries => {
                callback({
                    "entry": entries[0],
                    observer,
                });
            },
            { ...rest },
        );
    }, []);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        observer.observe(ref.current);
    }, []);

    return { ref };
}
