import type { GlArticleProps } from "GlArticle";
import { css } from "@emotion/css";

export function getGlArticleStoryStyle(params: {
    illustrationPosition: "left" | "right";
}): GlArticleProps["classes"] {
    const { illustrationPosition } = params;

    const value = 70;

    const margin = {
        "@media (min-width: 960px)": {
            ...(() => {
                switch (illustrationPosition) {
                    case "left":
                        return {
                            "marginRight": value,
                        };
                    case "right":
                        return {
                            "marginLeft": value,
                        };
                }
            })(),
        },
    };

    return {
        "aside": css({
            "minWidth": "unset",
            ...margin,
        }),
        "article": css({
            ...margin,
        }),
    };
}
