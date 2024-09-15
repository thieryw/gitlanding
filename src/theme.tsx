/* eslint-disable no-irregular-whitespace */
import { breakpointsValues as defaultBreakpointsValues } from "onyxia-ui";
import { useTheme as useTheme_base } from "onyxia-ui";

export function useTheme() {
    const theme = useTheme_base();

    return {
        ...theme,
        "paddingRightLeft": theme.spacing(
            (() => {
                if (theme.windowInnerWidth >= breakpointsValues["lg"]) {
                    return 7;
                }

                if (theme.windowInnerWidth >= breakpointsValues["sm"]) {
                    return 6;
                }

                return 4;
            })(),
        ),
        "customShadow": "2px 3px 35px -1px rgba(0,0,0,0.45)",
        "borderRadius": theme.spacing(1),
    };
}

export const breakpointsValues = {
    ...defaultBreakpointsValues,
    "lg+": 1440 as const,
};
