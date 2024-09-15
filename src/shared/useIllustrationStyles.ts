import { tss } from "../tss";
import type { IllustrationProps } from "../tools/IllustrationProps";
import { breakpointsValues } from "../theme";

export const useIllustrationStyles = tss
    .withParams<{
        aspectRatio: number;
        illustrationZoomFactor: number | undefined;
        type: IllustrationProps["type"] | undefined;
    }>()
    .create(({ theme, aspectRatio, illustrationZoomFactor, type }) => ({
        "root": {
            ...(() => {
                if (type === "custom component" || type === undefined) {
                    return undefined;
                }

                if (isNaN(aspectRatio)) {
                    return {
                        "opacity": 0,
                    };
                }

                const value =
                    (() => {
                        if (aspectRatio <= 1) {
                            return 600 * aspectRatio;
                        }

                        return 600;
                    })() * (illustrationZoomFactor ?? 1);
                return {
                    "maxWidth": value,
                    "minWidth":
                        theme.windowInnerWidth < breakpointsValues.md
                            ? undefined
                            : value,
                    "alignSelf":
                        theme.windowInnerWidth < breakpointsValues.md
                            ? "center"
                            : undefined,
                };
            })(),
        },
    }));
