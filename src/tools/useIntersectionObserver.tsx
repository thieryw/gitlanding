import { useEffect } from "react";
import type { RefObject } from "react";
import { useStateRef } from "powerhooks";
import { useConstCallback } from "powerhooks/useConstCallback";

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
    const { rootMargin, root, threshold } = params;
    const ref = useStateRef<T>(null);
    const callback = useConstCallback(params.callback);

    useEffect(() => {
        if (ref.current === null) {
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                callback({
                    "entry": entries[0],
                    observer,
                });
            },
            {
                rootMargin,
                root,
                threshold,
            },
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [rootMargin, root, threshold, ref.current]);

    return { ref };
}
