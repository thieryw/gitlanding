import { useState } from "react";
import { breakpointsValues } from "../theme";
import { objectKeys } from "tsafe/objectKeys";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";

const sortedBreakpointNames = objectKeys(breakpointsValues).sort(
    (a, b) => breakpointsValues[b] - breakpointsValues[a],
);

function getCurrentBreakpointName() {
    for (const breakpointName of sortedBreakpointNames) {
        if (window.innerWidth >= breakpointsValues[breakpointName]) {
            return breakpointName;
        }
    }

    return "xs";
}

export function useCurrentBreakpointName() {
    const [currentBreakpointName, setCurrentBreakpointName] = useState<
        ReturnType<typeof getCurrentBreakpointName>
    >(getCurrentBreakpointName());

    useEvt(
        ctx =>
            Evt.from(ctx, window, "resize").attach(() => {
                setCurrentBreakpointName(getCurrentBreakpointName());
            }),
        [],
    );

    return { currentBreakpointName };
}
