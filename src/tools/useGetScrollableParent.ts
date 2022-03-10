import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { getScrollableParent } from "powerhooks/getScrollableParent";

export function useGetScrollableParent<T extends HTMLElement = any>(): {
    ref: RefObject<T>;
    scrollableParent: HTMLElement | undefined;
};
export function useGetScrollableParent<T extends HTMLElement = any>(params: {
    ref: RefObject<T>;
}): { scrollableParent: HTMLElement | undefined };
export function useGetScrollableParent<T extends HTMLElement = any>(params?: {
    ref: RefObject<T>;
}): {
    ref: RefObject<T>;
    scrollableParent: HTMLElement | undefined;
} {
    const ref = params?.ref ?? useRef<T>(null);
    const [scrollableParent, setScrollableParent] = useState<
        HTMLElement | undefined
    >(undefined);

    useEffect(() => {
        if (!ref.current) return;
        setScrollableParent(getScrollableParent(ref.current));
    }, [ref.current]);

    return {
        scrollableParent,
        ref,
    };
}
