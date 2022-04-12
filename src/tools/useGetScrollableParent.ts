import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { assert } from "tsafe/assert";

export function useGetScrollableParent<T extends HTMLElement = any>(): {
    ref: RefObject<T>;
    scrollableParent: HTMLElement | (Window & typeof globalThis) | undefined;
};
export function useGetScrollableParent<T extends HTMLElement = any>(params: {
    ref: RefObject<T>;
}): {
    scrollableParent: HTMLElement | (Window & typeof globalThis) | undefined;
};
export function useGetScrollableParent<T extends HTMLElement = any>(params?: {
    ref: RefObject<T>;
}): {
    ref: RefObject<T>;
    scrollableParent: HTMLElement | (Window & typeof globalThis) | undefined;
} {
    const ref = params?.ref ?? useRef<T>(null);
    const [scrollableParent, setScrollableParent] = useState<
        HTMLElement | (Window & typeof globalThis) | undefined
    >(undefined);

    useEffect(() => {
        if (!ref.current) return;
        setScrollableParent(getScrollableParent({ "element": ref.current }));
    }, [ref.current]);

    return {
        scrollableParent,
        ref,
    };
}

function getScrollableParent(params: {
    element: HTMLElement;
}): HTMLElement | (Window & typeof globalThis) {
    const { element } = params;

    if (getIsElementScrollable(element)) {
        return element;
    }

    if (element === document.documentElement) {
        return window;
    }

    assert(element.parentElement !== null);

    return getScrollableParent({
        "element": element.parentElement,
    });
}

function getIsElementScrollable(element: HTMLElement): boolean {
    return ["auto", "scroll"].includes(getComputedStyle(element).overflow);
}
