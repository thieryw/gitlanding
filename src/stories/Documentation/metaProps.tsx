import { Parameters } from "@storybook/react";
import { useDarkMode } from "storybook-dark-mode";
import { Meta } from "@storybook/react";
import { StoryProvider } from "../getStory";

export const metaProps: {
    decorators: Meta["decorators"];
    parameters: Parameters;
} = {
    "parameters": {
        "viewMode": "docs",
        "previewTabs": {
            "canvas": { "hidden": true },
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
