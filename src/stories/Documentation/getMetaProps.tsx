import type { Parameters } from "@storybook/react";
import { useDarkMode } from "storybook-dark-mode";
import { Meta } from "@storybook/react";
import { StoryProvider } from "../theme";

export function getMetaProps(): {
    decorators: Meta["decorators"];
    parameters: Parameters;
} {
    return {
        "parameters": {
            "previewTabs": {
                "canvas": { "hidden": true },
                "storybook/docs/panel": { "hidden": true },
            },
        },
        "decorators": [
            Story => (
                <StoryProvider dark={useDarkMode()}>
                    <Story />
                </StoryProvider>
            ),
        ],
    };
}
