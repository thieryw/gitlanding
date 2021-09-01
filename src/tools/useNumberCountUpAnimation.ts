import { useEffect, useState, useRef } from "react";
import type { RefObject } from "react";

export type Params = {
    number: number | undefined;
    intervalMs: number;
};

export function useNumberCountUpAnimation<T extends HTMLElement = any>(
    params: Params,
): {
    renderedNumber: number;
    ref: RefObject<T>;
} {
    const { number, intervalMs } = params;
    const [renderedNumber, setRenderedNumber] = useState(0);

    const ref = useRef<T>(null);

    function animate() {
        if (number === undefined) {
            return;
        }

        let count = 0;

        const interval = setInterval(() => {
            if (count === number) {
                clearInterval(interval);
                return;
            }

            count++;
            setRenderedNumber(count);
        }, intervalMs);
    }

    useEffect(() => {
        if (!ref.current) {
            animate();
            return;
        }

        const observer = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) {
                return;
            }

            animate();
            observer.unobserve(entries[0].target);
        });

        observer.observe(ref.current);
    }, [number]);

    return { renderedNumber, ref };
}
