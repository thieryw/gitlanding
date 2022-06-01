import { useEffect, useState } from "react";
import type { RefObject, Dispatch, SetStateAction } from "react";
import { useStateRef } from "powerhooks/useStateRef";

export type UseNumberCountUpAnimationParams = {
    number: number | undefined;
    intervalMs: number;
};

export function useNumberCountUpAnimation<T extends HTMLElement = any>(
    params: UseNumberCountUpAnimationParams,
): {
    renderedNumber: number;
    ref: RefObject<T>;
} {
    const { number, intervalMs } = params;
    const [renderedNumber, setRenderedNumber] = useState(0);
    const ref = useStateRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            animate({
                number,
                intervalMs,
                setRenderedNumber,
            });
            return;
        }

        const observer = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) {
                return;
            }

            animate({ number, intervalMs, setRenderedNumber });
            observer.unobserve(entries[0].target);
        });

        observer.observe(element);
    }, [number]);

    return { renderedNumber, ref };
}

const { animate } = (() => {
    type Params = UseNumberCountUpAnimationParams & {
        setRenderedNumber: Dispatch<SetStateAction<number>>;
    };

    const awaitDelay = (params: { delayMs: number }) =>
        new Promise<void>(resolve => setTimeout(resolve, params.delayMs));

    async function animate(params: Params) {
        const { intervalMs, number, setRenderedNumber } = params;

        if (number === undefined) {
            return;
        }

        let currentIntervalMs = intervalMs;

        for (let count = 0; count <= number; count++) {
            await awaitDelay({
                "delayMs": (() => {
                    if (
                        (number < 40 && count <= number - 7) ||
                        (number >= 40 && count <= number - 14)
                    ) {
                        return currentIntervalMs;
                    }

                    return (currentIntervalMs += 10);
                })(),
            });
            setRenderedNumber(count);
        }
    }

    return { animate };
})();
