import { useDomRect } from "powerhooks/useDomRect";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
import { useStateRef } from "powerhooks/useStateRef";

export function useMediaAspectRatio<
    T extends HTMLImageElement | HTMLVideoElement = any,
>(): { ref: RefObject<T>; aspectRatio: number };
export function useMediaAspectRatio<
    T extends HTMLImageElement | HTMLVideoElement = any,
>(params: { ref: RefObject<T> }): { aspectRatio: number };
export function useMediaAspectRatio<
    T extends HTMLImageElement | HTMLVideoElement = any,
>(params?: { ref: RefObject<T> }): { ref: RefObject<T>; aspectRatio: number } {
    const internallyCreateRef = useStateRef<T>(null);

    const ref = params?.ref ?? internallyCreateRef;

    const {
        domRect: { width, height },
    } = useDomRect({ ref });
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(
        undefined,
    );

    useEffect(() => {
        if (aspectRatio !== undefined && !isNaN(aspectRatio)) {
            return;
        }

        setAspectRatio(width / height);
    }, [width, height]);

    return {
        "aspectRatio": aspectRatio === undefined ? NaN : aspectRatio,
        ref,
    };
}
